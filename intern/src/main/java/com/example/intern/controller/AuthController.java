package com.example.intern.controller;

import com.example.intern.Dto.LoginRequestDTO;
import com.example.intern.Dto.RegisterRequestDto;
import com.example.intern.Security.JwtUtil;
import com.example.intern.entity.User;
import com.example.intern.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public AuthController(AuthenticationManager authenticationManager,  JwtUtil jwtUtil, PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }


    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@Valid @RequestBody LoginRequestDTO loginRequestDTO) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequestDTO.getEmail(), loginRequestDTO.getPassword())
            );

            String token = jwtUtil.generateToken(
                    loginRequestDTO.getEmail(),
                    userRepository.findByEmail(loginRequestDTO.getEmail()).getId(),
                    userRepository.findByEmail(loginRequestDTO.getEmail()).getName() + " " +
                            userRepository.findByEmail(loginRequestDTO.getEmail()).getLastName()
            );

            return ResponseEntity.ok(Map.of("token", token)); // ✅ Send JSON response
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid email or password"));
        }
    }



    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@Valid @RequestBody RegisterRequestDto registerRequestDto) {
        try {
            // Check if email already exists
            if (userRepository.findByEmail(registerRequestDto.getEmail()) != null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("error", "Email already exists"));
            }
            User user = new User();
            user.setEmail(registerRequestDto.getEmail());
            user.setName(registerRequestDto.getName());
            user.setLastName(registerRequestDto.getLastName());
            user.setPassword(passwordEncoder.encode(registerRequestDto.getPassword()));

            userRepository.save(user);
            String token = jwtUtil.generateToken(
                    user.getEmail(),
                    user.getId(),
                    user.getName() + " " + user.getLastName()
            );
            return ResponseEntity.ok(Map.of(
                    "message", "Registration successful",
                    "token", token
            ));

        } catch (Exception e) {
            e.printStackTrace(); // Print error to logs for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Registration failed"));
        }
    }

}
