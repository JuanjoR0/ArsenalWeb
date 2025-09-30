package com.arsenalweb.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "armas")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Arma {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String nombre;

    @Column(length = 1000)
    private String descripcion;

    // Precio real en euros
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;

    @Column(nullable = false)
    private Integer stock;

    private String imagenUrl;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

    // ---- estadísticas 0-100 ----
    @Min(0) @Max(100)
    private Integer alcance;

    @Min(0) @Max(100)
    private Integer danio;

    @Min(0) @Max(100)
    private Integer precision;

}
