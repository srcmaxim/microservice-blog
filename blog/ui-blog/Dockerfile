####
# This Dockerfile is used in order to build a container that runs the React application in dev mode
#
# Before building the docker image run:
#
# export CI=true
# npm test
# export REACT_APP_BLOG_API="http://rest-blog-jvm/api/blog"
# npm run-script build
#
# Then, build the image with:
#
# docker build -f Dockerfile -t ui-blog-serve .
#
# Then run the container using:
#
# docker run -i --rm -p 3000:3000 ui-blog-serve
#
###
FROM node:14.4-alpine as build

WORKDIR /app

RUN npm install -g serve

COPY build/ build/

ENTRYPOINT [ "serve", "-s", "/app/build/", "-l", "3000" ]