package com.example.demo.Publicacion.application;

import com.example.demo.Publicacion.Dtos.PublicacionRequestDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import jakarta.transaction.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class PublicacionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private String token;

    @BeforeEach
    public void setup() throws Exception {
        // 1. Registrar usuario
        String registroJson = """
            {
                "name":"Danna Mendez",
                "email": "danna.mendez@utec.edu.pe",
                "password":"123abc"
            }
            """;

        mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(registroJson))
                .andExpect(status().isOk());

        // 2. Login y obtener token
        String loginJson = """
            {
                "email": "danna.mendez@utec.edu.pe",
                "password":"123abc"
            }
            """;

        MvcResult result = mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginJson))
                .andExpect(status().isOk())
                .andReturn();

        String responseJson = result.getResponse().getContentAsString();
        this.token = objectMapper.readTree(responseJson).get("token").asText();
    }

    @Test
    public void testCrearPublicacion() throws Exception {
        PublicacionRequestDTO request = new PublicacionRequestDTO();
        request.setTitulo("Dieta para perder grasa");
        request.setContenido("Plan de comidas bajo en carbohidratos para 4 semanas");

        mockMvc.perform(post("/api/publicaciones")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.titulo").value("Dieta para perder grasa"))
                .andExpect(jsonPath("$.contenido").value("Plan de comidas bajo en carbohidratos para 4 semanas"))
                .andExpect(jsonPath("$.autor").value("Danna Mendez"));
    }

    @Test
    public void testObtenerPublicacionPorId() throws Exception {
        // Primero crear la publicación
        PublicacionRequestDTO request = new PublicacionRequestDTO();
        request.setTitulo("Publicacion 1");
        request.setContenido("Contenido de prueba");

        MvcResult result = mockMvc.perform(post("/api/publicaciones")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andReturn();

        Long publicacionId = objectMapper.readTree(result.getResponse().getContentAsString()).get("id").asLong();

        // Obtener por ID
        mockMvc.perform(get("/api/publicaciones/" + publicacionId)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.titulo").value("Publicacion 1"));
    }

    @Test
    public void testListarPublicacionesPorAutor() throws Exception {
        // Crear una publicación
        PublicacionRequestDTO request = new PublicacionRequestDTO();
        request.setTitulo("Titulo autor");
        request.setContenido("Contenido autor");

        mockMvc.perform(post("/api/publicaciones")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());

        // Consultar publicaciones del autor
        mockMvc.perform(get("/api/publicaciones/autor")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].titulo").value("Titulo autor"));
    }
}
