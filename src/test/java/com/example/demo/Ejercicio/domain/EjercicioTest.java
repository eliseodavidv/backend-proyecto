package com.example.demo.Ejercicio.domain;

import com.example.demo.Ejercicio.Dtos.CrearEjercicioDTO;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class EjercicioTest {

    @Test
    public void testCrearEjercicio() {
        CrearEjercicioDTO dto = new CrearEjercicioDTO();
        dto.setNombre("Plancha");
        dto.setDescripcion("Fortalecimiento de core");
        dto.setSeries(3);
        dto.setRepeticiones(1);
        dto.setDescansoSegundos(90);
        dto.setPesoKg(0);

        Ejercicio ejercicio = new Ejercicio();
        ejercicio.setNombre(dto.getNombre());
        ejercicio.setDescripcion(dto.getDescripcion());
        ejercicio.setSeries(dto.getSeries());
        ejercicio.setRepeticiones(dto.getRepeticiones());
        ejercicio.setDescansoSegundos(dto.getDescansoSegundos());
        ejercicio.setPesoKg(dto.getPesoKg());

        assertEquals("Plancha", ejercicio.getNombre());
        assertEquals("Fortalecimiento de core", ejercicio.getDescripcion());
        assertEquals(3, ejercicio.getSeries());
        assertEquals(1, ejercicio.getRepeticiones());
        assertEquals(90, ejercicio.getDescansoSegundos());
        assertEquals(0, ejercicio.getPesoKg());
    }
}
