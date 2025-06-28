package com.example.demo.Progreso.domain;

import com.example.demo.user.domain.User;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

public class ProgresoTest {

    @Test
    public void testProgresoProperties() {
        Progreso progreso = new Progreso();
        progreso.setId(1L);
        progreso.setPeso(68.5);
        Date fecha = new Date();
        progreso.setFecha(fecha);

        assertEquals(1L, progreso.getId());
        assertEquals(68.5, progreso.getPeso());
        assertEquals(fecha, progreso.getFecha());
    }

    @Test
    public void testProgresoUsuario() {
        Progreso progreso = new Progreso();
        User user = new User();
        user.setId(1);
        user.setName("Danna");

        progreso.setUser(user);

        assertNotNull(progreso.getUser());
        assertEquals(1, progreso.getUser().getId());
        assertEquals("Danna", progreso.getUser().getName());
    }
}
