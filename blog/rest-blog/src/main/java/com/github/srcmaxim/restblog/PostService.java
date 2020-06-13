package com.github.srcmaxim.restblog;

import io.quarkus.panache.common.Sort;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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
        return Post.findById(id);
    }

    public Post persistPost(@Valid Post post) {
        post.id = Arrays.stream(post.title.split("\\s"))
                .map(String::toLowerCase)
                .collect(Collectors.joining("-"));
        Post.persist(post);
        return post;
    }

    public Post updatePost(@Valid Post post) {
        Post entity = Post.findById(post.id);
        if (entity == null) {
            return null;
        }
        entity.title = post.title;
        entity.content = post.content;
        entity.readMinutes = post.readMinutes;
        entity.publishDate = post.publishDate;
        entity.tags = post.tags;
        return entity;
    }

    public void deletePost(String id) {
        Post post = Post.findById(id);
        if (post != null) {
            post.delete();
        }
    }
}
