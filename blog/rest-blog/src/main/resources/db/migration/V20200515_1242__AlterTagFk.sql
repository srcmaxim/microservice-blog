ALTER TABLE tag ADD CONSTRAINT tag_post_id_to_post_id FOREIGN KEY (post_id) REFERENCES post(id);
