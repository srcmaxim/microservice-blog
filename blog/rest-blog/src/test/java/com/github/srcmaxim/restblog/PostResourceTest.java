package com.github.srcmaxim.restblog;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.common.mapper.TypeRef;
import io.restassured.filter.log.RequestLoggingFilter;
import io.restassured.filter.log.ResponseLoggingFilter;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import org.hamcrest.core.Is;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

import static io.restassured.RestAssured.*;
import static javax.ws.rs.core.HttpHeaders.ACCEPT;
import static javax.ws.rs.core.HttpHeaders.CONTENT_TYPE;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;
import static javax.ws.rs.core.Response.Status.*;
import static org.hamcrest.CoreMatchers.*;
import static org.junit.jupiter.api.Assertions.assertEquals;

@QuarkusTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class PostResourceTest {

    private static final String DEFAULT_ID = "post-name-default";
    private static final String DEFAULT_TITLE = "Post Name Default";
    private static final String DEFAULT_CONTENT = "## Post Content\nContent content content content content";
    private static final int DEFAULT_READ_MINUTES = 1;
    private static final LocalDate DEFAULT_PUBLISH_DATE = LocalDate.now();
    private static final List<String> DEFAULT_TAGS = Arrays.asList("tag1", "tag2", "tag3");

    private static final String UPDATED_TITLE = "Post Name Default (UPDATED)";
    private static final String UPDATED_CONTENT = "## Post Content\nContent content content content content (UPDATED)";
    private static final int UPDATED_READ_MINUTES = 2;
    private static final LocalDate UPDATED_PUBLISH_DATE = LocalDate.now().plusDays(1);
    private static final List<String> UPDATED_TAGS = Arrays.asList("tag2", "tag3", "tag4");

    private static final int NB_POSTS = 10;
    private static String postId;

    @Test
    public void testHelloEndpoint() {
        given()
                .when().get("/api/blog/posts/hello")
                .then()
                .statusCode(200)
                .body(is("hello"));
    }

    @Test
    void shouldNotGetUnknownPost() {
        Long randomId = new Random().nextLong();
        given()
                .pathParam("id", randomId)
                .when().get("/api/blog/posts/{id}")
                .then()
                .statusCode(NOT_FOUND.getStatusCode());
    }

    @Test
    @Order(1)
    void shouldGetInitialItems() {
        List<Post> posts = get("/api/blog/posts").then()
                .statusCode(OK.getStatusCode())
                .header(CONTENT_TYPE, APPLICATION_JSON)
                .extract().body().as(getPostTypeRef());
        assertEquals(NB_POSTS, posts.size());
    }

    @Test
    @Order(2)
    void shouldAddAnItem() {
        JsonObject post = new JsonObject()
                .put("title", DEFAULT_TITLE)
                .put("content", DEFAULT_CONTENT)
                .put("readMinutes", DEFAULT_READ_MINUTES)
                .put("publishDate", DEFAULT_PUBLISH_DATE.toString())
                .put("tags", new JsonArray(DEFAULT_TAGS));

        List<Post> posts = get("/api/blog/posts").then()
                .statusCode(OK.getStatusCode())
                .header(CONTENT_TYPE, APPLICATION_JSON)
                .extract().body().as(getPostTypeRef());
        assertEquals(NB_POSTS, posts.size());

        postId = given()
                .body(post.encodePrettily())
                .header(CONTENT_TYPE, APPLICATION_JSON)
                .header(ACCEPT, APPLICATION_JSON)
                .filter(new RequestLoggingFilter())
                .filter(new ResponseLoggingFilter())
                .when()
                .post("/api/blog/posts")
                .then()
                .header("Location", both(containsString("http://")).and(containsString("/api/blog/posts/" + DEFAULT_ID)))
                .body("title", Is.is(DEFAULT_TITLE))
                .body("content", Is.is(DEFAULT_CONTENT))
                .body("readMinutes", Is.is(DEFAULT_READ_MINUTES))
                .body("publishDate", Is.is(DEFAULT_PUBLISH_DATE.toString()))
                .body("tags", Is.is(DEFAULT_TAGS))
                .extract().body().jsonPath().getString("id");

        assertEquals(DEFAULT_ID, postId);

        given()
                .pathParam("id", postId)
                .when().get("/api/blog/posts/{id}")
                .then()
                .statusCode(OK.getStatusCode())
                .header(CONTENT_TYPE, APPLICATION_JSON)
                .body("title", Is.is(DEFAULT_TITLE))
                .body("content", Is.is(DEFAULT_CONTENT))
                .body("readMinutes", Is.is(DEFAULT_READ_MINUTES))
                .body("publishDate", Is.is(DEFAULT_PUBLISH_DATE.toString()))
                .body("tags", Is.is(DEFAULT_TAGS));

        posts = get("/api/blog/posts").then()
                .statusCode(OK.getStatusCode())
                .header(CONTENT_TYPE, APPLICATION_JSON)
                .extract().body().as(getPostTypeRef());
        assertEquals(NB_POSTS + 1, posts.size());

    }

    @Test
    @Order(3)
    void shouldUpdateAnItem() {
        JsonObject post = new JsonObject()
                .put("id", DEFAULT_ID)
                .put("title", UPDATED_TITLE)
                .put("content", UPDATED_CONTENT)
                .put("readMinutes", UPDATED_READ_MINUTES)
                .put("publishDate", UPDATED_PUBLISH_DATE.toString())
                .put("tags", new JsonArray(UPDATED_TAGS));

        given()
                .body(post.encodePrettily())
                .header(CONTENT_TYPE, APPLICATION_JSON)
                .header(ACCEPT, APPLICATION_JSON)
                .filter(new RequestLoggingFilter())
                .filter(new ResponseLoggingFilter())
                .expect()
                .when()
                .put("/api/blog/posts")
                .then()
                .body("title", containsString(UPDATED_TITLE))
                .body("content", containsString(UPDATED_CONTENT))
                .body("readMinutes", equalTo(UPDATED_READ_MINUTES))
                .body("publishDate", equalTo(UPDATED_PUBLISH_DATE.toString()))
                .body("tags", equalTo(UPDATED_TAGS));

        List<Post> posts = get("/api/blog/posts").then()
                .statusCode(OK.getStatusCode())
                .header(CONTENT_TYPE, APPLICATION_JSON)
                .extract().body().as(getPostTypeRef());
        assertEquals(NB_POSTS + 1, posts.size());

    }

    @Test
    @Order(4)
    void shouldRemoveAnItem() {
        delete("/api/blog/posts/" + postId).then()
                .statusCode(NO_CONTENT.getStatusCode());

        List<Post> posts = get("/api/blog/posts").then()
                .statusCode(OK.getStatusCode())
                .header(CONTENT_TYPE, APPLICATION_JSON)
                .extract().body().as(getPostTypeRef());
        assertEquals(NB_POSTS, posts.size());
    }

    private TypeRef<List<Post>> getPostTypeRef() {
        return new TypeRef<List<Post>>() {
            // Kept empty on purpose
        };
    }
}
