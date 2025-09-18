package org.turistecz.turisteczbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.turistecz.turisteczbackend.model.VerificationToken;


import java.util.Optional;

@Repository
public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Integer> {

    Optional<VerificationToken> findByToken(String token);
    Optional<VerificationToken> findByTokenAndTipo(String token, String tipo);

    
}
