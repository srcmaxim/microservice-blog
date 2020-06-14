package com.github.srcmaxim.restblog;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.quarkus.jackson.ObjectMapperCustomizer;

import javax.inject.Singleton;
import java.text.SimpleDateFormat;

@Singleton
public class LocalDateJackson implements ObjectMapperCustomizer {

    public void customize(ObjectMapper mapper) {
        mapper.setDateFormat(new SimpleDateFormat("dd-MM-yyyy hh:mm:ss"));
    }
}
