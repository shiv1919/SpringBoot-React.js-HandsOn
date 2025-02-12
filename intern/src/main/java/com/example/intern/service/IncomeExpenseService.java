package com.example.intern.service;

import com.example.intern.Dto.IncomeExpenseDTO;
import com.example.intern.Mapper.IncomeExpenseMapper;
import com.example.intern.entity.IncomeExpense;
import com.example.intern.repository.IncomeExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class IncomeExpenseService {
    private final IncomeExpenseRepository incomeExpenseRepository;
    private final IncomeExpenseMapper incomeExpenseMapper;

    public IncomeExpenseService(IncomeExpenseRepository incomeExpenseRepository,
                                IncomeExpenseMapper incomeExpenseMapper) {
        this.incomeExpenseRepository = incomeExpenseRepository;
        this.incomeExpenseMapper = incomeExpenseMapper;
    }

    public IncomeExpenseDTO create(IncomeExpenseDTO incomeExpenseDTO) {
        try {
            IncomeExpense incomeExpense = incomeExpenseMapper.incomeExpenseDTOToIncomeExpense(incomeExpenseDTO);
            incomeExpense.setPaymentDate(LocalDateTime.now());

            IncomeExpense savedEntity = incomeExpenseRepository.save(incomeExpense);
            return incomeExpenseMapper.incomeExpenseToIncomeExpenseDTO(savedEntity);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Validation Error: " + e.getMessage());
        } catch (DataAccessException e) {
            throw new RuntimeException("Database Error: Unable to create payment record.");
        } catch (Exception e) {
            throw new RuntimeException("An unexpected error occurred while creating the payment.");
        }
    }

    public List<IncomeExpenseDTO> getAllPayments() {
        try {
            List<IncomeExpense> payments = incomeExpenseRepository.findAll();
            if (payments.isEmpty()) {
                throw new RuntimeException("No payment records found.");
            }
            return payments.stream().map(incomeExpenseMapper::incomeExpenseToIncomeExpenseDTO).collect(Collectors.toList());
        } catch (DataAccessException e) {
            throw new RuntimeException("Database error occurred while fetching payment records.");
        } catch (Exception e) {
            throw new RuntimeException("An unexpected error occurred while retrieving payments.");
        }
    }

    public IncomeExpenseDTO getPaymentById(Long id) {
        IncomeExpense payment = incomeExpenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment record not found with ID: " + id));
        return incomeExpenseMapper.incomeExpenseToIncomeExpenseDTO(payment);
    }

    public void deletePayment(Long id) {
        if (!incomeExpenseRepository.existsById(id)) {
            throw new RuntimeException("Payment record not found with ID: " + id);
        }
        incomeExpenseRepository.deleteById(id);
    }

    public IncomeExpenseDTO updatePayment(IncomeExpenseDTO incomeExpenseDTO) {
        IncomeExpense incomeExpense = incomeExpenseRepository.findById(incomeExpenseDTO.getId())
                .orElseThrow(() -> new RuntimeException("Payment record not found with ID: " + incomeExpenseDTO.getId()));

        try {
            incomeExpense.setLedgerHeadId(incomeExpenseDTO.getLedgerHeadId());
            incomeExpense.setLoggedInUserId(incomeExpenseDTO.getLoggedInUserId());
            incomeExpense.setPaidBy(incomeExpenseDTO.getPaidBy());
            incomeExpense.setPaidTo(incomeExpenseDTO.getPaidTo());
            incomeExpense.setIncomeExpenseType(incomeExpenseDTO.getIncomeExpenseType());

            IncomeExpense updatedEntity = incomeExpenseRepository.save(incomeExpense);
            return incomeExpenseMapper.incomeExpenseToIncomeExpenseDTO(updatedEntity);
        } catch (Exception e) {
            throw new RuntimeException("Failed to update payment record: " + e.getMessage());
        }
    }


}
