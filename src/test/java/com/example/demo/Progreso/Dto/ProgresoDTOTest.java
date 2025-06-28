package com.example.demo.Progreso.Dto;

import com.example.demo.Progreso.Dtos.ProgresoDTO;
import com.example.demo.Progreso.domain.Progreso;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

public class ProgresoDTOTest {

    @Test
    public void testConstructorFromProgreso() {
        Progreso progreso = new Progreso();
        progreso.setId(10L);
        progreso.setPeso(72.3);
        Date fecha = new Date();
        progreso.setFecha(fecha);

        ProgresoDTO dto = new ProgresoDTO(progreso);

        assertEquals(10L, dto.getId());
        assertEquals(72.3, dto.getPeso());
        assertEquals(fecha, dto.getFecha());
    }
}
