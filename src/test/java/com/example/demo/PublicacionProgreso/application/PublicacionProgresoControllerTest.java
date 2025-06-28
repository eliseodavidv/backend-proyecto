package com.example.demo.PublicacionProgreso.application;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.HashMap;
import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class PublicacionProgresoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private String token;

    @BeforeEach
    public void setup() throws Exception {
        // 1. Registro
        Map<String, String> registerRequest = new HashMap<>();
        registerRequest.put("name", "Danna Mendez");
        registerRequest.put("email", "danna.mendez@utec.edu.pe");
        registerRequest.put("password", "123abc");

        mockMvc.perform(post("http://localhost:8090/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest)))
                .andExpect(status().isOk());

        // 2. Login
        Map<String, String> loginRequest = new HashMap<>();
        loginRequest.put("email", "danna.mendez@utec.edu.pe");
        loginRequest.put("password", "123abc");

        MvcResult loginResult = mockMvc.perform(post("http://localhost:8090/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andReturn();

        String response = loginResult.getResponse().getContentAsString();
        Map<String, String> responseMap = objectMapper.readValue(response, Map.class);
        token = responseMap.get("token");

        // 3. Crear progreso dentro del rango
        Map<String, Object> progresoRequest = new HashMap<>();
        progresoRequest.put("peso", 70.5);
        progresoRequest.put("fecha", "2025-05-10");

        mockMvc.perform(post("/api/progresos")
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(progresoRequest)))
                .andExpect(status().isOk());
    }

    @Test
    public void testCrearPublicacionProgreso() throws Exception {
        // 4. Crear publicación
        mockMvc.perform(post("/api/publicaciones/progreso")
                        .header("Authorization", "Bearer " + token)
                        .param("inicio", "2025-05-01")
                        .param("fin", "2025-05-29"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.promedioPeso").value(70.5))
                .andExpect(jsonPath("$.progresos[0].peso").value(70.5));
    }
}
