package com.melodymix.servicio;

import com.melodymix.entidad.Usuario;
import com.melodymix.repo.IUsuarioRepositorio;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.function.Function;

@Service
@Qualifier("authServicio")
public class AuthServicio implements IAuthServicio, UserDetailsService {

    private final IUsuarioRepositorio usuarioRepositorio;
    private final PasswordEncoder passwordEncoder;
    private SecretKey secretKey;


    @Value("${jwt.secret.key}")
    private String secretKeyString;

    @Autowired
    public AuthServicio(IUsuarioRepositorio usuarioRepositorio, @Lazy PasswordEncoder passwordEncoder) {
        this.usuarioRepositorio = usuarioRepositorio;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    private void init() {
        if (secretKeyString == null || secretKeyString.isEmpty()) {
            throw new IllegalStateException("La clave secreta JWT no está configurada.");
        }
        System.out.println("Clave secreta JWT cargada: " + secretKeyString);
        try {
            byte[] decodedKey = Base64.getDecoder().decode(secretKeyString);
            this.secretKey = new SecretKeySpec(decodedKey, 0, decodedKey.length, "HmacSHA512");
        } catch (IllegalArgumentException e) {
            throw new IllegalStateException("La clave secreta JWT no es válida.", e);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepositorio.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + username));
        return new org.springframework.security.core.userdetails.User(usuario.getEmail(), usuario.getContrasena(), new ArrayList<>());
    }

    @Override
    public String authenticate(String email, String password) {
        Usuario usuario = usuarioRepositorio.findByEmail(email).orElse(null);
        if (usuario != null && passwordEncoder.matches(password, usuario.getContrasena())) {
            UserDetails userDetails = loadUserByUsername(email);
            return generateToken(userDetails);
        }
        return null;
    }

    @Override
    public String generateToken(UserDetails userDetails) {
        long expirationTimeInMillis = 86400000;
        Date expirationDate = new Date(System.currentTimeMillis() + expirationTimeInMillis);

        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(expirationDate)
                .signWith(secretKey)
                .compact();
    }

    @Override
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }


    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepositorio.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado: " + email));
        return new org.springframework.security.core.userdetails.User(usuario.getEmail(), usuario.getContrasena(), new ArrayList<>());
    }


}

