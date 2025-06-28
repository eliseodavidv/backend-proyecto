package com.example.demo.Grupo.domain;

import com.example.demo.user.domain.User;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

public class GrupoTest {

    @Test
    public void testGrupoProperties() {
        Grupo grupo = new Grupo();
        grupo.setNombre("Mi Grupo");
        grupo.setDescripcion("Descripción de prueba");
        grupo.setTipo(TipoGrupo.PUBLICO);
        grupo.setFechaCreacion(LocalDateTime.now());

        assertEquals("Mi Grupo", grupo.getNombre());
        assertEquals("Descripción de prueba", grupo.getDescripcion());
        assertEquals(TipoGrupo.PUBLICO, grupo.getTipo());
        assertNotNull(grupo.getFechaCreacion());
    }

    @Test
    public void testMiembrosAndAdministrador() {
        Grupo grupo = new Grupo();

        User admin = new User();
        admin.setId(1);
        admin.setName("Admin");

        grupo.setAdministrador(admin);
        grupo.getMiembros().add(admin);

        assertEquals(admin, grupo.getAdministrador());
        assertTrue(grupo.getMiembros().contains(admin));
    }
}
