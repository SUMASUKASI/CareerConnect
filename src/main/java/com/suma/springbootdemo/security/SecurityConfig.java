package com.suma.springbootdemo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .formLogin(form -> form.disable())
            .httpBasic(basic -> basic.disable())

            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            .authorizeHttpRequests(auth -> auth

                // Public APIs
                .requestMatchers(
                    "/api/users/register",
                    "/api/users/login",
                    "/error",
                    "/hello"
                ).permitAll()

                // Swagger endpoints
                .requestMatchers(
                    "/swagger-ui/**",
                    "/swagger-ui.html",
                    "/v3/api-docs/**"
                ).permitAll()

                // Anyone can view jobs
                .requestMatchers(HttpMethod.GET, "/api/jobs/**")
                .permitAll()

                // Recruiter permissions for jobs
                .requestMatchers(
                    HttpMethod.POST, "/api/jobs/**"
                ).hasRole("RECRUITER")

                .requestMatchers(
                    HttpMethod.PUT, "/api/jobs/**"
                ).hasRole("RECRUITER")

                .requestMatchers(
                    HttpMethod.DELETE, "/api/jobs/**"
                ).hasRole("RECRUITER")

                // Recruiter views received applications
                .requestMatchers(
                    HttpMethod.GET, "/api/applications/recruiter"
                ).hasRole("RECRUITER")

                // Recruiter accepts or rejects applications
                .requestMatchers(
                    HttpMethod.PUT, "/api/applications/*/status"
                ).hasRole("RECRUITER")

                // Job seeker applies for jobs
                .requestMatchers(
                    HttpMethod.POST, "/api/applications/**"
                ).hasRole("JOB_SEEKER")

                // Job seeker views their applications
                .requestMatchers(
                    HttpMethod.GET, "/api/applications/my"
                ).hasRole("JOB_SEEKER")

                .anyRequest().authenticated()
            )

            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}