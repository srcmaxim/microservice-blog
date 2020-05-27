package com.github.srcmaxim.restblog;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;


@Entity
@Table(name = "post")
public class Post extends PanacheEntityBase {

    @NotNull
    @Size(min = 5, max = 30)
    @Id
    public String id;

    @NotNull
    @Size(min = 5, max = 30)
    public String title;

    @Column(columnDefinition = "TEXT")
    public String description;

    @NotNull
    @NotBlank
    @Column(columnDefinition = "TEXT")
    public String content;

    @Min(1)
    @Column(name = "read_minutes")
    public int readMinutes;

    @NotNull
    @Column(name = "publish_date")
    public LocalDate publishDate;

    @ElementCollection(fetch = FetchType.EAGER)
    @Fetch(FetchMode.SUBSELECT)
    @CollectionTable(name = "tag", joinColumns = @JoinColumn(name = "post_id"))
    @Column(name = "tag_name")
    public List<String> tags;

    public Post() {
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Post post = (Post) o;
        return id.equals(post.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Post{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", readMinutes=" + readMinutes +
                ", tags='" + tags + '\'' +
                ", publishDate='" + publishDate + '\'' +
                '}';
    }
}
