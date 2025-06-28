package com.example.demo.Comentario.application;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class ComentarioControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private String token;

    @BeforeEach
    public void setup() throws Exception {
        mockMvc.perform(post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                            {
                                "name": "Danna Mendez",
                                "email": "danna.mendez@utec.edu.pe",
                                "password": "123abc"
                            }
                        """));

        String response = mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                            {
                                "email": "danna.mendez@utec.edu.pe",
                                "password": "123abc"
                            }
                        """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists())
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode jsonNode = objectMapper.readTree(response);
        token = jsonNode.get("token").asText();
    }

    @Test
    public void crearComentarioTest() throws Exception {
        String publicacionJson = """
            {
              "titulo": "Dieta para perder grasa",
              "contenido": "Plan de comidas bajo en carbohidratos para 4 semanas",
              "tipoDieta": "Baja en carbohidratos",
              "calorias": 1800,
              "objetivos": "Pérdida de grasa corporal",
              "restricciones": "Sin gluten"
            }
        """;

        String publicacionResponse = mockMvc.perform(post("/api/publicaciones/planes")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(publicacionJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.titulo").value("Dieta para perder grasa"))
                .andReturn()
                .getResponse()
                .getContentAsString();

        JsonNode publicacionNode = objectMapper.readTree(publicacionResponse);
        long publicacionId = publicacionNode.get("id_publicacion").asLong();

        String comentarioJson = """
            {
              "contenido": "¡Qué buena publicación!",
              "publicacionId": %d
            }
        """.formatted(publicacionId);

        mockMvc.perform(post("/api/comentarios")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(comentarioJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.contenido").value("¡Qué buena publicación!"))
                .andExpect(jsonPath("$.autorUsername").value("Danna Mendez")); // cambia a autorNombre si aplica
    }
}
