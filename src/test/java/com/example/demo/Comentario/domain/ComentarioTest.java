package com.example.demo.Comentario.domain;

import com.example.demo.Publicacion.domain.Publicacion;
import com.example.demo.user.domain.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

public class ComentarioTest {

    private Comentario comentario;
    private Publicacion publicacion;
    private User autor;

    @BeforeEach
    void setUp() {
        comentario = new Comentario();
        publicacion = new Publicacion();
        autor = new User();

        // Simulamos datos
        publicacion.setId_publicacion(1L);
        autor.setId(1);
        autor.setName("Juan Pérez");

        comentario.setContenido("Este es un comentario de prueba");
        comentario.setPublicacion(publicacion);
        comentario.setAutor(autor);
    }

    @Test
    void testComentarioFields() {
        assertEquals("Este es un comentario de prueba", comentario.getContenido());
        assertEquals(publicacion, comentario.getPublicacion());
        assertEquals(autor, comentario.getAutor());
        assertEquals("Juan Pérez", comentario.getAutor().getName());
    }

    @Test
    void testPrePersistSetsFechaCreacion() {
        assertNull(comentario.getFechaCreacion()); // Aún no se ha llamado a prePersist
        comentario.prePersist();
        assertNotNull(comentario.getFechaCreacion());

        // Se asegura que la fecha de creación sea "ahora" o al menos muy cercana
        LocalDateTime ahora = LocalDateTime.now();
        assertTrue(comentario.getFechaCreacion().isBefore(ahora.plusSeconds(1)));
    }
}
