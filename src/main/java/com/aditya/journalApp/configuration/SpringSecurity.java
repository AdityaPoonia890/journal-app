package com.aditya.journalApp.configuration;


import com.aditya.journalApp.filter.JwtFilter;
import com.aditya.journalApp.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.WebSecurityConfigurer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;


@Configuration
@EnableWebSecurity
public class SpringSecurity  {


    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    JwtFilter jwtFilter;



    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {



        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF for API calls
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Use custom CORS config
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/public/**").permitAll() // Public APIs (Signup/Login)
                        .requestMatchers("/journal/**", "/user/**").authenticated() // Protected APIs
                        .requestMatchers("/admin/**").hasRole("ADMIN") // Admin APIs
                        .anyRequest().authenticated() // Secure all other endpoints
                )
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Use stateless session
                .addFilterBefore(jwtFilter, org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true); // Required for JWT authentication

        // ✅ Use allowedOriginPatterns() instead of allowedOrigins()
        config.setAllowedOriginPatterns(List.of("http://localhost:5173"));

        // ✅ Allow common HTTP methods
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // ✅ Allow required headers
        config.setAllowedHeaders(List.of("Authorization", "Content-Type", "X-Requested-With"));

        // ✅ Expose Authorization header for JWT
        config.setExposedHeaders(List.of("Authorization"));

        // ✅ Register this configuration for all API endpoints
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }



    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean

    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception{
        return new ProviderManager(authenticationProvider());
    }

}
