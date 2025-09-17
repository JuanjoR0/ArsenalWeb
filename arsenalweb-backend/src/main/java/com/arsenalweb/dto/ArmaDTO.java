package com.arsenalweb.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public record ArmaDTO(
        Long id,
        @NotBlank String nombre,
        String descripcion,
        @NotNull @Positive BigDecimal precio,       // euros
        @NotNull @PositiveOrZero Integer stock,
        String imagenUrl,
        @NotNull Long categoriaId,

        @Min(0) @Max(100) Integer alcance,
        @Min(0) @Max(100) Integer danio,
        @Min(0) @Max(100) Integer precision,
        @Min(0) @Max(100) Integer precioIndice
) {}
