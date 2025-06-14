package examen2.backend.controller;

import examen2.backend.data.UserRepository;
import examen2.backend.logic.User;
import examen2.backend.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        User user = userRepo.findByUsername(request.getUsername());
        if (user != null && encoder.matches(request.getPassword(), user.getPassword())) {
            String token = jwtService.generateToken(user.getUsername(), user.getRol());
            return new LoginResponse(token, user.getNombre());
        }
        throw new RuntimeException("Usuario o clave incorrectos");
    }

    // DTO para request de login
    public static class LoginRequest {
        private String username;
        private String password;

        public LoginRequest() {}

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }

        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    // DTO para response de login
    public static class LoginResponse {
        private String token;
        private String nombre;

        public LoginResponse() {}

        public LoginResponse(String token, String nombre) {
            this.token = token;
            this.nombre = nombre;
        }

        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }

        public String getNombre() { return nombre; }
        public void setNombre(String nombre) { this.nombre = nombre; }
    }
}
