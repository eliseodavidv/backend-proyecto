package com.example.demo.Grupo.Dto;

import com.example.demo.Grupo.Dtos.GrupoDTO;
import com.example.demo.Grupo.domain.TipoGrupo;
import com.example.demo.PublicacionGrupo.domain.PublicacionGrupo;
import com.example.demo.user.Dtos.UserDTO;
import com.example.demo.user.domain.Role;
import com.example.demo.user.domain.User;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;

class GrupoDTOTest {

    @Test
    void testGrupoDTOConstructorAndGetters() {
        User adminUser = new User();
        adminUser.setId(1);
        adminUser.setName("Admin");
        adminUser.setEmail("admin@example.com");
        adminUser.setRole(Role.ADMIN);
        UserDTO admin = new UserDTO(adminUser);
        User miembroUser = new User();
        miembroUser.setId(2);
        miembroUser.setName("Miembro");
        miembroUser.setEmail("miembro@example.com");
        miembroUser.setRole(Role.USER);
        UserDTO miembro = new UserDTO(miembroUser);
        PublicacionGrupo publicacionGrupo = new PublicacionGrupo();
        publicacionGrupo.setId_publicacion(1L);

        GrupoDTO grupoDTO = new GrupoDTO(
                1,
                "Grupo de Prueba",
                "Descripción del grupo",
                TipoGrupo.PUBLICO,
                Collections.singletonList(miembro),
                admin,
                Collections.singletonList(publicacionGrupo),
                LocalDateTime.now()
        );

        // Verificar que los valores se asignen correctamente
        assertEquals(1, grupoDTO.getId());
        assertEquals("Grupo de Prueba", grupoDTO.getNombre());
        assertEquals("Descripción del grupo", grupoDTO.getDescripcion());
        assertEquals(TipoGrupo.PUBLICO, grupoDTO.getTipo());
        assertNotNull(grupoDTO.getMiembros());
        assertEquals(1, grupoDTO.getMiembros().size());
        assertEquals("Miembro", grupoDTO.getMiembros().get(0).getName());
        assertEquals("admin@example.com", grupoDTO.getAdministrador().getEmail());
        assertEquals(1, grupoDTO.getPublicaciones().size());
        assertEquals(1, grupoDTO.getPublicaciones().get(0).getId_publicacion());
        assertNotNull(grupoDTO.getFechaCreacion());
    }

    @Test
    void testSettersAndGetters() {
        // Crear una instancia de GrupoDTO
        GrupoDTO grupoDTO = new GrupoDTO();

        User adminUser = new User();
        adminUser.setId(1);
        adminUser.setName("Admin");
        adminUser.setEmail("admin@example.com");
        UserDTO admin = new UserDTO(adminUser);
        grupoDTO.setId(1);
        grupoDTO.setNombre("Grupo de Prueba");
        grupoDTO.setDescripcion("Descripción del grupo");
        grupoDTO.setTipo(TipoGrupo.PUBLICO);
        User testUser = new User();
        testUser.setId(2);
        testUser.setName("Miembro");
        testUser.setEmail("miembro@example.com");
        testUser.setRole(Role.USER);
        grupoDTO.setMiembros(Collections.singletonList(new UserDTO(testUser)));
        grupoDTO.setAdministrador(admin);
        grupoDTO.setPublicaciones(Collections.singletonList(new PublicacionGrupo()));
        grupoDTO.setFechaCreacion(LocalDateTime.now());

        assertEquals(1, grupoDTO.getId());
        assertEquals("Grupo de Prueba", grupoDTO.getNombre());
        assertEquals("Descripción del grupo", grupoDTO.getDescripcion());
        assertEquals(TipoGrupo.PUBLICO, grupoDTO.getTipo());
        assertEquals(1, grupoDTO.getMiembros().size());
        assertEquals("Miembro", grupoDTO.getMiembros().get(0).getName());
        assertEquals("admin@example.com", grupoDTO.getAdministrador().getEmail());
        assertEquals(1, grupoDTO.getPublicaciones().size());
        assertNotNull(grupoDTO.getFechaCreacion());
    }
}
