package com.example.intern.Mapper;

import com.example.intern.Dto.IncomeExpenseDTO;
import com.example.intern.entity.IncomeExpense;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
@Mapper(componentModel = "spring")
public interface IncomeExpenseMapper {

    IncomeExpenseDTO incomeExpenseToIncomeExpenseDTO(IncomeExpense incomeExpense);
    IncomeExpense incomeExpenseDTOToIncomeExpense(IncomeExpenseDTO incomeExpenseDTO);
}
