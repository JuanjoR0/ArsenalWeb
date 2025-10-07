package com.arsenalweb.repository;

import com.arsenalweb.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    long countByUsuarioId(Long usuarioId);
}
