package com.example.demo.Ejercicio.application;

import com.example.demo.Ejercicio.Dtos.CrearEjercicioDTO;
import com.example.demo.Ejercicio.domain.EjercicioService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
public class EjercicioControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private EjercicioService ejercicioService;

    private CrearEjercicioDTO ejercicioDTO;

    @BeforeEach
    public void setUp() {
        // Inicializamos el DTO de prueba
        ejercicioDTO = new CrearEjercicioDTO();
        ejercicioDTO.setNombre("Plancha");
        ejercicioDTO.setDescripcion("Fortalecimiento de core");
        ejercicioDTO.setSeries(3);
        ejercicioDTO.setRepeticiones(1);
        ejercicioDTO.setDescansoSegundos(90);
        ejercicioDTO.setPesoKg(0);
    }

    @Test
    public void testCrearEjercicio() throws Exception {
        mockMvc.perform(post("/api/ejercicios")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"nombre\": \"Plancha\", \"descripcion\": \"Fortalecimiento de core\", \"series\": 3, \"repeticiones\": 1, \"descansoSegundos\": 90, \"pesoKg\": 0}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nombre").value("Plancha"))
                .andExpect(jsonPath("$.descripcion").value("Fortalecimiento de core"))
                .andExpect(jsonPath("$.series").value(3))
                .andExpect(jsonPath("$.repeticiones").value(1))
                .andExpect(jsonPath("$.descansoSegundos").value(90))
                .andExpect(jsonPath("$.pesoKg").value(0));
    }
}
