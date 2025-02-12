package com.example.intern.Dto;

import com.example.intern.Enum.IncomeExpenseType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class IncomeExpenseDTO {
    private Long id;

    private String incomeExpenseId;

    @NotBlank(message = "Ledger Head ID is required")
    private String ledgerHeadId;

    private LocalDateTime paymentDate;

    @NotBlank(message = "Logged-in User ID is required")
    private String loggedInUserId;

    @NotBlank(message = "PaidBy field cannot be empty")
    private String paidBy;

    @NotBlank(message = "PaidTo field cannot be empty")
    private String paidTo;

    @NotNull(message = "Income/Expense type is required")
    private IncomeExpenseType incomeExpenseType;

}
