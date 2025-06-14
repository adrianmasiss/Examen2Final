package examen2.backend.config;

import examen2.backend.config.JwtAuthFilter;
import examen2.backend.data.UserRepository;
import examen2.backend.logic.User;
import examen2.backend.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UserRepository userRepository;



    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            User user = userRepository.findByUsername(username);
            if (user == null) throw new RuntimeException("Usuario no encontrado");
            return org.springframework.security.core.userdetails.User
                    .withUsername(user.getUsername())
                    .password(user.getPassword())
                    .roles(user.getRol())
                    .build();
        };
    }

    @Bean
    public JwtAuthFilter jwtAuthFilter(JwtService jwtService, UserDetailsService userDetailsService) {
        return new JwtAuthFilter(jwtService, userDetailsService);
    }


    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthFilter jwtAuthFilter) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/login").permitAll()
                        .requestMatchers(
                                "/api/preguntas/**", "/api/responder", "/api/estadisticas"
                        ).authenticated()
                        .anyRequest().permitAll()
                );

        return http.build();
    }
}
