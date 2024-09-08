package com.sm.api.studymateapi.service.Jwt;

import com.sm.api.studymateapi.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    private static final String SECRET_KEY = "";


    public String generateToken(Map<String, Object> extraClaims,
                                UserDetails userDetails){
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours validity
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();


    }

    //TODO: add generate token code
    public boolean isTokenValid(String token, UserDetails userDetails){
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));

    }

    public boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    //TODO: use extractClaims n get subject
    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);

    }

    //TODO: use extractClaims n get id
    public Long extractId(String token){
        return extractClaim(token, claims -> claims.get("id", Long.class));
       }

    //TODO: use extractClaims n get expiration
    private Date extractExpiration(String token){
        return extractClaim(token, Claims::getExpiration);


    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(User userDetails){
        HashMap<String,Object> claims = new HashMap<>();
        claims.put("id",userDetails.getId());
        return generateToken(claims, userDetails);
    }

    private Claims extractAllClaims(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey(){
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
