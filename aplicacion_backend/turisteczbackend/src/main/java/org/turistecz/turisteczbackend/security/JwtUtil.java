package org.turistecz.turisteczbackend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    private static final String SECRET_KEY = "una_clave_secreta_larga_y_segura_para_firmar_los_tokens_12345";
    private static final long EXPIRATION_TIME = 86400000; // 1 día en ms

    private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    public String generateToken(String email, Integer userId) {
        return Jwts.builder()
                .setSubject(email)
                .claim("id", userId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public Claims extractClaims(String token) throws ExpiredJwtException {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean isTokenValid(String token) {
        try {
            extractClaims(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    public String getEmail(String token) {
        return extractClaims(token).getSubject();
    }

    public Integer getUserId(String token) {
        return extractClaims(token).get("id", Integer.class);
    }
}
