package com.example.demo.Progreso.application;

import com.example.demo.Progreso.domain.Progreso;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Date;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class ProgresoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private String token;

    @BeforeEach
    public void setUp() throws Exception {
        // Registro
        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                    {
                        "name": "Danna Mendez",
                        "email": "danna.mendez@utec.edu.pe",
                        "password": "123abc"
                    }
                """)).andExpect(status().isOk());

        // Login
        MvcResult loginResult = mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                    {
                        "email": "danna.mendez@utec.edu.pe",
                        "password": "123abc"
                    }
                """)).andExpect(status().isOk())
                .andReturn();

        String responseBody = loginResult.getResponse().getContentAsString();
        Map<String, String> jsonResponse = objectMapper.readValue(responseBody, Map.class);
        token = jsonResponse.get("token");
    }

    @Test
    public void testCrearProgreso() throws Exception {
        Progreso nuevoProgreso = new Progreso();
        nuevoProgreso.setPeso(70.5);
        nuevoProgreso.setFecha(new Date());

        mockMvc.perform(post("/api/progresos")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(nuevoProgreso)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.peso").value(70.5));
    }

    @Test
    public void testObtenerProgresos() throws Exception {
        // Crear uno primero para asegurar que haya un progreso
        Progreso nuevoProgreso = new Progreso();
        nuevoProgreso.setPeso(70.5);
        nuevoProgreso.setFecha(new Date());

        mockMvc.perform(post("/api/progresos")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(nuevoProgreso)))
                .andExpect(status().isOk());

        // Obtener progresos
        mockMvc.perform(get("/api/progresos")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].peso").value(70.5));
    }

    @Test
    public void testEliminarProgreso() throws Exception {
        // Crear primero para obtener su ID
        Progreso nuevoProgreso = new Progreso();
        nuevoProgreso.setPeso(70.5);
        nuevoProgreso.setFecha(new Date());

        MvcResult result = mockMvc.perform(post("/api/progresos")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(nuevoProgreso)))
                .andExpect(status().isOk())
                .andReturn();

        String response = result.getResponse().getContentAsString();
        Map<String, Object> progresoCreado = objectMapper.readValue(response, Map.class);
        Long id = ((Number) progresoCreado.get("id")).longValue();

        // Eliminar
        mockMvc.perform(delete("/api/progresos/" + id)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
    }
}
