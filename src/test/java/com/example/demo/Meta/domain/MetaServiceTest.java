package com.example.demo.Meta.domain;

import com.example.demo.Meta.infrastructure.MetaRepository;
import com.example.demo.user.domain.Role;
import com.example.demo.user.domain.User;
import com.example.demo.user.infrastructure.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class MetaServiceTest {

    @Autowired
    private MetaService metaService;

    @Autowired
    private MetaRepository metaRepository;

    @Autowired
    private UserRepository userRepository;

    private User user;

    private Meta meta = new Meta();

    @BeforeEach
    void setUp() {
        LocalDate fechaInicio = LocalDate.now();

        user = new User();
        user.setName("Juan Perez");
        user.setEmail("juan.perez@example.com");
        user.setPassword("12345");
        user.setRole(Role.USER);
        user.setFechaDeRegistro(fechaInicio);
        userRepository.save(user);

        meta.setFechaInicio(fechaInicio);
    }

    @Test
    void testCrearMeta() {
        Meta meta = new Meta();
        meta.setDescripcion("Correr 5km");
        meta.setFechaInicio(LocalDate.now());
        meta.setFechaFin(LocalDate.now().plusDays(10));
        meta.setCumplida(false);
        meta.setUser(user);

        Meta savedMeta = metaService.crearMeta(meta, user.getId());

        assertNotNull(savedMeta.getId());
        assertEquals("Correr 5km", savedMeta.getDescripcion());
        assertEquals(user.getId(), savedMeta.getUser().getId());
    }

    @Test
    void testMarcarMetaCumplida() {
        Meta meta = new Meta();
        meta.setDescripcion("Correr 10km");
        meta.setFechaInicio(LocalDate.now());
        meta.setFechaFin(LocalDate.now().plusDays(14));
        meta.setCumplida(false);
        meta.setUser(user);
        metaRepository.save(meta);

        metaService.marcarComoCumplida(meta.getId());

        Meta updatedMeta = metaRepository.findById(meta.getId()).orElseThrow();
        assertTrue(updatedMeta.isCumplida());
    }
}
