package com.example.demo.Meta.domain;

import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

public class MetaTest {

    @Test
    public void testMetaCreation() {
        Meta meta = new Meta();
        meta.setDescripcion("Correr 5k");
        meta.setFechaInicio(LocalDate.now());
        meta.setFechaFin(LocalDate.now().plusWeeks(1));
        meta.setCumplida(false);

        assertEquals("Correr 5k", meta.getDescripcion());
        assertFalse(meta.isCumplida());
        assertNotNull(meta.getFechaInicio());
    }
}
