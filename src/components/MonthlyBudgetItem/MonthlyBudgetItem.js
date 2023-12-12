// src/components/BudgetItem.js
import React from 'react';
import { Select as BaseSelect, selectClasses } from '@mui/base/Select';
import { Option as BaseOption, optionClasses } from '@mui/base/Option';
import { Popper as BasePopper } from '@mui/base/Popper';
import { styled } from '@mui/system';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';

const MonthlyBudgetItem = ({ budget, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{budget.item}</td>
      <td>{budget.budget}</td>
      <td>
        <button onClick={() => onEdit(budget.budget_id)}>Edit</button>
        <button onClick={() => onDelete(budget.budget_id)}>Delete</button>
      </td>
    </tr>
  );
};

export default MonthlyBudgetItem;
