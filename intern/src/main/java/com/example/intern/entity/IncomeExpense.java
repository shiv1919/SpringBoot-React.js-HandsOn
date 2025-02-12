package com.example.intern.entity;

import com.example.intern.Enum.IncomeExpenseType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "income_expense")
@Getter
@Setter
public class IncomeExpense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String incomeExpenseId;


    @Column(nullable = false)
    private String ledgerHeadId;

    @Column(nullable = false)
    private LocalDateTime paymentDate;

    @Column(nullable = false)
    private String loggedInUserId;

    @Column(nullable = false)
    private String paidBy;

    @Column(nullable = false)
    private String paidTo;

    @Enumerated(EnumType.STRING)
    private IncomeExpenseType incomeExpenseType;

    @PrePersist
    protected void onCreate() {
        this.incomeExpenseId = UUID.randomUUID().toString();
    }

}

