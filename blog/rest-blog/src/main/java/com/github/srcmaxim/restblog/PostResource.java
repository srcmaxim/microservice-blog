package com.github.srcmaxim.restblog;

import org.jboss.logging.Logger;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.util.Collection;
import java.util.List;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;
import static javax.ws.rs.core.MediaType.TEXT_PLAIN;

import org.jboss.logging.Logger;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.net.URI;
import java.util.List;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;
import static javax.ws.rs.core.MediaType.TEXT_PLAIN;

@Path("/api/blog/posts")
@Produces(APPLICATION_JSON)
public class PostResource {

    private static final Logger LOGGER = Logger.getLogger(PostResource.class);

    @Inject
    PostService service;

    @GET
    public Response getAllPosts() {
        List<Post> posts = service.findAllPosts();
        LOGGER.debug("Total number of posts " + posts);
        return Response.ok(posts).build();
    }

    @GET
    @Path("/{id}")
    public Response getPost(@PathParam("id") String id) {
        Post post = service.findPostById(id);
        if (post != null) {
            LOGGER.debug("Found post " + post);
            return Response.ok(post).build();
        } else {
            LOGGER.debug("No post found with id " + id);
            return Response.noContent().build();
        }
    }

    @POST
    public Response createPost(@Valid Post post, @Context UriInfo uriInfo) {
        post = service.persistPost(post);
        UriBuilder builder = uriInfo.getAbsolutePathBuilder().path(post.id);
        LOGGER.debug("New post created with URI " + builder.build().toString());
        return Response.created(builder.build()).build();
    }

    @PUT
    public Response updatePost(@Valid Post post) {
        post = service.updatePost(post);
        LOGGER.debug("Post updated with new valued " + post);
        return Response.ok(post).build();
    }

    @DELETE
    @Path("/{id}")
    public Response deletePost(
            @PathParam("id") String id) {
        service.deletePost(id);
        LOGGER.debug("Post deleted with " + id);
        return Response.noContent().build();
    }

    @GET
    @Produces(TEXT_PLAIN)
    @Path("/hello")
    public String hello() {
        return "hello";
    }
}