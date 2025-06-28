package com.example.demo.Ejercicio.application;

import com.example.demo.Ejercicio.Dtos.CrearEjercicioDTO;
import com.example.demo.Ejercicio.Dtos.EjercicioDTO;
import com.example.demo.Ejercicio.domain.Ejercicio;
import com.example.demo.Ejercicio.domain.EjercicioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/ejercicios")
@CrossOrigin(origins = "*")
public class EjercicioController {

    private final EjercicioService service;

    public EjercicioController(EjercicioService service) {
        this.service = service;
    }

    @PostMapping
    public EjercicioDTO crearEjercicio(@RequestBody CrearEjercicioDTO dto) {
        Ejercicio ejercicio = service.crearEjercicio(dto);
        return new EjercicioDTO(ejercicio);
    }

    @GetMapping("/rutina/{rutinaId}")
    public List<EjercicioDTO> obtenerPorRutina(@PathVariable Long rutinaId) {
        return service.obtenerPorRutina(rutinaId).stream()
                .map(EjercicioDTO::new)
                .collect(Collectors.toList());
    }
}
