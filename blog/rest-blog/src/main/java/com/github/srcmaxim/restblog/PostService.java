package com.github.srcmaxim.restblog;

import io.quarkus.panache.common.Sort;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;

import static javax.transaction.Transactional.TxType.REQUIRED;
import static javax.transaction.Transactional.TxType.SUPPORTS;

@ApplicationScoped
@Transactional(REQUIRED)
public class PostService {


    @Transactional(SUPPORTS)
    public List<Post> findAllPosts() {
        return Post.listAll(Sort.by("publishDate").descending());
    }

    @Transactional(SUPPORTS)
    public Post findPostById(String id) {
        return Post.find("select p from Post p join fetch p.tags where p.id = ?1", id).firstResult();
    }

    public Post persistPost(@Valid Post post) {
        Post.persist(post);
        return post;
    }

    public Post updatePost(@Valid Post post) {
        Post entity = Post.findById(post.id);
        entity.title = post.title;
        entity.description = post.description;
        entity.content = post.content;
        entity.contentUrl = post.contentUrl;
        entity.readMinutes = post.readMinutes;
        entity.publishDate = post.publishDate;
        entity.tags = post.tags;
        return entity;
    }

    public void deletePost(String id) {
        Post post = Post.findById(id);
        post.delete();
    }
}