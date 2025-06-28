package com.example.demo.PublicacionGrupo.infrastructure;


import com.example.demo.PublicacionGrupo.domain.PublicacionGrupo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PublicacionGrupoRepository extends JpaRepository<PublicacionGrupo, Long> {
}
