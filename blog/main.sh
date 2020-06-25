#!/usr/bin/env bash

install() {
    npm install --prefix ui-blog
    npm install --save-dev serve
    npm install --save-dev cypress
    npm install --save-dev react-scripts
}

i-up() {
    docker-compose -f infrastructure/docker-compose.yaml down
    docker-compose -f infrastructure/docker-compose.yaml up
}

i-down() {
    docker-compose -f infrastructure/docker-compose.yaml down
}

rest-blog() {
    mvn -f rest-blog/pom.xml quarkus:dev
}

ui-blog() {
    export REACT_APP_BLOG_API="http://localhost:8080/api/blog"
    npm start --prefix ui-blog
}

test() {
    # test and build for test ui-blog
    export CI=true
    npm test --prefix ui-blog
    export REACT_APP_BLOG_API="http://localhost:8080/api/blog"
    npm run-script build --prefix ui-blog
    docker build -f ui-blog/Dockerfile -t ui-blog-serve ui-blog

    # test and build for test rest-blog
    mvn -f rest-blog/pom.xml package -Dquarkus.profile=test
    docker build -f rest-blog/src/main/docker/Dockerfile.jvm -t rest-blog-jvm rest-blog

    # test start
    docker-compose -f ./infrastructure/docker-compose.yaml -f ./infrastructure/docker-compose-services.yaml down --remove-orphans
    docker-compose -f ./infrastructure/docker-compose.yaml up -d 
    docker-compose -f ./infrastructure/docker-compose-services.yaml up -d 

    # test
    export CYPRESS_WEB_APP="http://localhost:3000"
    ui-blog/node_modules/.bin/cypress run -P ui-blog

    # test end
    docker-compose -f ./infrastructure/docker-compose.yaml -f ./infrastructure/docker-compose-services.yaml down --remove-orphans
}

build() {
    # build for prod ui-blog
    export REACT_APP_BLOG_API="https://api.srcmaxim.io/api/blog"
    npm run-script build --prefix ./ui-blog
    
    docker-compose -f ./infrastructure/docker-compose.yaml down --remove-orphans
    docker-compose -f ./infrastructure/docker-compose.yaml up -d     
    
    mvn -f ./rest-blog/pom.xml verify -Pnative \
        -Dquarkus.native.container-build=true

    docker-compose -f ./infrastructure/docker-compose.yaml down --remove-orphans
}

deploy() {
    aws s3 sync ui-blog/build/ s3://srcmaxim.io --delete
    aws s3 sync rest-blog/target/rest-blog-*-runner s3://api.srcmaxim.io/rest-blog --delete
    cat pkcs.p12 | base64 > pkcs.p12.base64
    aws s3 sync /home/max/certs/pkcs.p12.base64 s3://api.srcmaxim.io/pkcs.p12.base64 --delete
    rm pkcs.p12.base64

cat << EOF > bootstrap.sh
!#/usr/bin/bash
sudo ./rest-blog \
-Dquarkus.datasource.url=$AWS_PROD_DATABASE \
-Dquarkus.datasource.username=$AWS_PROD_USERNAME \
-Dquarkus.datasource.password=$AWS_PROD_PASSWORD \
-Dquarkus.host=https://api.srcmaxim.io \
-Dquarkus.http.cors.origins=https://srcmaxim.io \
-Dquarkus.http.port=80 \
-Dquarkus.http.ssl-port=443 \
-Dquarkus.http.port-enabled=false \
-Dquarkus.http.insecure-requests=redirect \
-Dquarkus.http.ssl.certificate.key-store-file=pkcs.p12 \
-Dquarkus.http.ssl.certificate.key-store-file-type=pkcs12 \
-Dquarkus.http.ssl.certificate.key-store-password=$SSL_PASSWORD 
EOF
    aws s3 sync bootstrap.sh s3://api.srcmaxim.io/bootstrap.sh --delete
    rm bootstrap.sh

    ## AFTER in EC2 ##
    aws s3 cp s3://api.srcmaxim.io/bootstrap.sh ./
    aws s3 cp s3://api.srcmaxim.io/rest-blog ./
    aws s3 cp s3://api.srcmaxim.io/pkcs.p12.base64 ./
    chmod 001 bootstrap.sh
    chmod 001 rest-blog
    cat pkcs.p12.base64 | base64 -d > pkcs.p12
    export AWS_PROD_ENDPOINT="posts-rds.cnievrcmlifu.us-east-1.rds.amazonaws.com"
    export AWS_PROD_DATABASE="jdbc:postgresql://$AWS_PROD_ENDPOINT:5432/posts_database"
    export AWS_PROD_USERNAME="posts_super"
    export AWS_PROD_PASSWORD="posts_super"
    export SSL_PASSWORD="L_quarkus_pksc12"
    screen sudo bash ./bootstrap.sh
}

inTestProd() {
    export CYPRESS_WEB_APP="https://srcmaxim.io"
    ui-blog/node_modules/.bin/cypress open -P ui-blog
}

# Check if the function exists (bash specific)
if declare -f "$1" > /dev/null
then
  # call arguments verbatim
  "$@"
else


test
build
deploy
inTestProd

  # Show a helpful error
  echo "'$1' is not a known function name" >&2
  echo "Try: "
  echo "  install: installs dependencies"
  echo "  i-up: starts integration services in dev mode"
  echo "  i-down: stops integration services "
  echo "  rest-blog: starts rest-blog app in dev mode"
  echo "  ui-blog: starts ui-blog app in dev mode"
  echo "  test: tests apps + integration tests"
  echo "  build: builds apps for deployment"
  echo "  deploy: deploys apps into prod"
  echo "  inTestProd: executes integration tests in prod mode"
  exit 1
fi
