package com.example.intern.repository;

import com.example.intern.entity.IncomeExpense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IncomeExpenseRepository extends JpaRepository<IncomeExpense,Long> {
}
