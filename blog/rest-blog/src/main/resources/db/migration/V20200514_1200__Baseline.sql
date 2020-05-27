CREATE TABLE post
(
    id VARCHAR(30) PRIMARY KEY NOT NULL,
    title VARCHAR(30) UNIQUE NOT NULL,
    description TEXT,
    content TEXT NOT NULL,
    read_minutes INT NOT NULL CHECK (read_minutes>=1),
    publish_date DATE NOT NULL
);

CREATE TABLE tag
(
    post_id VARCHAR(30) NOT NULL,
    tag_name VARCHAR(30) NOT NULL
);