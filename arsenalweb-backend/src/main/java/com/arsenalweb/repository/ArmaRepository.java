package com.arsenalweb.repository;

import com.arsenalweb.model.Arma;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArmaRepository extends JpaRepository<Arma, Long> {}
