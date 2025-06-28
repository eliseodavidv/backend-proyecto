package com.example.demo.Grupo.application;

import com.example.demo.Grupo.domain.Grupo;
import com.example.demo.Grupo.domain.TipoGrupo;
import com.example.demo.user.domain.User;
import com.example.demo.Grupo.infrastructure.GrupoRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import jakarta.transaction.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class GrupoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private GrupoRepository grupoRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testCrearGrupoConflict() throws Exception {
        Grupo grupo = new Grupo();
        grupo.setNombre("Grupo Test");
        grupo.setDescripcion("Descripción");
        grupo.setTipo(TipoGrupo.PUBLICO);
        grupoRepository.save(grupo); // Simula que ya existe

        Grupo nuevo = new Grupo();
        nuevo.setNombre("Grupo Test"); // mismo nombre para generar conflicto
        nuevo.setDescripcion("Otro grupo");
        nuevo.setTipo(TipoGrupo.PUBLICO);

        mockMvc.perform(post("/grupos/crear?adminId=1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(nuevo)))
                .andExpect(status().isConflict());
    }

    @Test
    public void testGetGrupos() throws Exception {
        mockMvc.perform(get("/grupos"))
                .andExpect(status().isOk());
    }

    @Test
    public void testGetGruposPublicos() throws Exception {
        mockMvc.perform(get("/grupos/publicos"))
                .andExpect(status().isOk());
    }
}
