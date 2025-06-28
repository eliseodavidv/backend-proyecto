package com.example.demo.Publicacion.domain;

import com.example.demo.user.domain.User;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

public class PublicacionTest {

    @Test
    public void testPublicacionProperties() {
        Publicacion publicacion = new Publicacion();
        publicacion.setTitulo("Dieta para perder grasa");
        publicacion.setContenido("Plan de comidas bajo en carbohidratos para 4 semanas");
        publicacion.setFechaCreacion(LocalDateTime.now());
        publicacion.setVerificada(true);

        assertEquals("Dieta para perder grasa", publicacion.getTitulo());
        assertEquals("Plan de comidas bajo en carbohidratos para 4 semanas", publicacion.getContenido());
        assertNotNull(publicacion.getFechaCreacion());
        assertTrue(publicacion.isVerificada());
    }

    @Test
    public void testPublicacionRelacionConUsuario() {
        Publicacion publicacion = new Publicacion();

        User user = new User();
        user.setId(1);
        user.setName("Danna Mendez");

        publicacion.setUser(user);

        assertNotNull(publicacion.getUser());
        assertEquals(1, publicacion.getUser().getId());
        assertEquals("Danna Mendez", publicacion.getUser().getName());
    }
}
