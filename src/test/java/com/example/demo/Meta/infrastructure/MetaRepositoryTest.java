package com.example.demo.Meta.infrastructure;

import com.example.demo.Meta.domain.Meta;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@Testcontainers
public class MetaRepositoryTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16")
            .withDatabaseName("metatest")
            .withUsername("user")
            .withPassword("pass");

    @Autowired
    private MetaRepository metaRepository;

    @Test
    public void testGuardarMeta() {
        Meta meta = new Meta();
        meta.setDescripcion("Terminar proyecto");
        meta.setFechaInicio(LocalDate.now());
        meta.setFechaFin(LocalDate.now().plusDays(10));
        meta.setCumplida(false);

        Meta saved = metaRepository.save(meta);
        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getDescripcion()).isEqualTo("Terminar proyecto");
    }
}
