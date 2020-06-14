package com.github.srcmaxim.restblog;

import io.quarkus.test.common.QuarkusTestResourceLifecycleManager;
import org.testcontainers.containers.PostgreSQLContainer;

import java.util.Collections;
import java.util.Map;

public class DatabaseResource implements QuarkusTestResourceLifecycleManager {

    public static final PostgreSQLContainer DATABASE = new PostgreSQLContainer<>("postgres:12.2-alpine")
            .withDatabaseName("posts_database")
            .withUsername("posts_super")
            .withPassword("posts_super")
            .withExposedPorts(5432);

    @Override
    public Map<String, String> start() {
        DATABASE.start();
        return Collections.singletonMap("quarkus.datasource.url", DATABASE.getJdbcUrl());
    }

    @Override
    public void stop() {
        DATABASE.stop();
    }
}
