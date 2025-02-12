package com.example.intern.controller;

import com.example.intern.Dto.IncomeExpenseDTO;
import com.example.intern.service.IncomeExpenseService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/income-expense")
@CrossOrigin(origins = "*")
public class MainController {

    private final IncomeExpenseService incomeExpenseService;

    public MainController(IncomeExpenseService incomeExpenseService) {
        this.incomeExpenseService = incomeExpenseService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createPayment(@Valid @RequestBody IncomeExpenseDTO incomeExpenseDTO) {
        try {
            IncomeExpenseDTO createdPayment = incomeExpenseService.create(incomeExpenseDTO);
            return ResponseEntity.ok(createdPayment);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/getall")
    public ResponseEntity<?> getAll() {
        try {
            List<IncomeExpenseDTO> payments = incomeExpenseService.getAllPayments();
            return ResponseEntity.ok(payments);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        try {
            IncomeExpenseDTO payment = incomeExpenseService.getPaymentById(id);
            return ResponseEntity.ok(payment);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            incomeExpenseService.deletePayment(id);
            return ResponseEntity.ok(Map.of("message", "Payment record deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@Valid @RequestBody IncomeExpenseDTO incomeExpenseDTO) {
        try {
            IncomeExpenseDTO updatedPayment = incomeExpenseService.updatePayment(incomeExpenseDTO);
            return ResponseEntity.ok(updatedPayment);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }
}
