package com.example.demo.Meta.Dto;

import com.example.demo.Meta.Dtos.MetaDTO;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

public class MetaDTOTest {

    @Test
    public void testConstructorConParametros() {
        LocalDate fechaInicio = LocalDate.of(2025, 5, 25);
        LocalDate fechaFin = LocalDate.of(2025, 6, 8);
        MetaDTO metaDTO = new MetaDTO(1L, "Correr 10km en 2 semanas", fechaInicio, fechaFin, false, 123);
        assertEquals(1L, metaDTO.getId());
        assertEquals("Correr 10km en 2 semanas", metaDTO.getDescripcion());
        assertEquals(fechaInicio, metaDTO.getFechaInicio());
        assertEquals(fechaFin, metaDTO.getFechaFin());
        assertFalse(metaDTO.isCumplida());
        assertEquals(123, metaDTO.getUserId());
    }

    @Test
    public void testConstructorVacio() {
        MetaDTO metaDTO = new MetaDTO();
        assertNull(metaDTO.getId());
        assertNull(metaDTO.getDescripcion());
        assertNull(metaDTO.getFechaInicio());
        assertNull(metaDTO.getFechaFin());
        assertFalse(metaDTO.isCumplida());
        assertEquals(0, metaDTO.getUserId());
    }

    @Test
    public void testSettersYGetters() {
        MetaDTO metaDTO = new MetaDTO();
        metaDTO.setId(2L);
        metaDTO.setDescripcion("Beber agua 2L por día");
        metaDTO.setFechaInicio(LocalDate.of(2025, 5, 20));
        metaDTO.setFechaFin(LocalDate.of(2025, 6, 1));
        metaDTO.setCumplida(true);
        metaDTO.setUserId(456);

        assertEquals(2L, metaDTO.getId());
        assertEquals("Beber agua 2L por día", metaDTO.getDescripcion());
        assertEquals(LocalDate.of(2025, 5, 20), metaDTO.getFechaInicio());
        assertEquals(LocalDate.of(2025, 6, 1), metaDTO.getFechaFin());
        assertTrue(metaDTO.isCumplida());
        assertEquals(456, metaDTO.getUserId());
    }
}
