package com.example.demo.PublicacionRutina.infrastructure;

import com.example.demo.PublicacionRutina.domain.PublicacionRutina;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PublicacionRutinaRepository extends JpaRepository<PublicacionRutina, Long> {
}
