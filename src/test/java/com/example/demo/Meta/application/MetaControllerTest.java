package com.example.demo.Meta.application;

import com.example.demo.Meta.domain.Meta;
import com.example.demo.Meta.domain.MetaService;
import com.example.demo.auth.domain.AuthService;
import com.example.demo.auth.dto.JwtAuthResponse;
import com.example.demo.auth.dto.LoginReq;
import com.example.demo.auth.dto.RegisterReq;
import com.example.demo.config.JwtService;
import com.example.demo.user.domain.User;
import com.example.demo.user.infrastructure.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class MetaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthService authService;

    @Autowired
    private MetaService metaService;

    @Autowired
    private UserRepository<User> userRepository;

    private String token;
    private Long userId;

    @BeforeEach
    public void setUp() {
        String email = "danna.mendez@utec.edu.pe";

        // Verifica si ya existe
        User existingUser = userRepository.findByEmail(email).orElse(null);

        if (existingUser == null) {
            RegisterReq registerReq = new RegisterReq();
            registerReq.setEmail(email);
            registerReq.setPassword("123abc");
            registerReq.setName("Danna Mendez");

            JwtAuthResponse response = authService.register(registerReq);
            token = response.getToken();
            userId = (long) userRepository.findByEmail(email).get().getId();
        } else {
            LoginReq loginReq = new LoginReq();
            loginReq.setEmail(email);
            loginReq.setPassword("123abc");

            JwtAuthResponse response = authService.login(loginReq);
            token = response.getToken();
            userId = (long) existingUser.getId();
        }
    }

    @Test
    public void testCrearMetaConToken() throws Exception {
        mockMvc.perform(post("/api/metas/crear?userId=" + userId)
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"descripcion\": \"Correr 10km en 2 semanas\", \"fechaInicio\": \"2025-05-25\", \"fechaFin\": \"2025-06-08\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.descripcion").value("Correr 10km en 2 semanas"))
                .andExpect(jsonPath("$.fechaInicio").value("2025-05-25"))
                .andExpect(jsonPath("$.fechaFin").value("2025-06-08"));
    }

    @Test
    public void testObtenerMetasDeUsuario() throws Exception {
        mockMvc.perform(get("/api/metas/usuario/" + userId)
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$").isArray());
    }

    @Test
    public void testMarcarMetaComoCumplida() throws Exception {
        String jsonMeta = "{\"descripcion\": \"Beber agua 2L por día\", \"fechaInicio\": \"2025-05-25\", \"fechaFin\": \"2025-06-01\"}";

        String response = mockMvc.perform(post("/api/metas/crear?userId=" + userId)
                        .header("Authorization", "Bearer " + token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonMeta))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        String id = response.replaceAll(".*\"id\":(\\d+).*", "$1");

        mockMvc.perform(put("/api/metas/" + id + "/cumplida")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk())
                .andExpect(content().string("Meta marcada como cumplida"));
    }
}
