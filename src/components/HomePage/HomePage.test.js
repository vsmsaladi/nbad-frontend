// import { render, screen } from '@testing-library/react'
// import HomePage from './HomePage'

// test('check heading and button', async () => {
//     render(<HomePage/>)
//     expect(screen.getByText(/Functionalities/i)).toBeInTheDocument;
//     // expect(screen.getByRole('button')).toBeDisabled()
// })

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from './HomePage';

describe('HomePage Component', () => {
  test('renders sections with descriptions', () => {
    render(<HomePage />);
    
    // Replace 'Functionality 1' with the actual title from your data
    const functionality1Description = screen.getByText('Users can add, edit, and delete the budgets.');
    
    expect(functionality1Description).toBeInTheDocument();
    
    // Add similar assertions for other sections if needed
  });

  test('check functionalities', async () => {
    render(<HomePage/>)
    expect(screen.getByText(/Functionalities/i)).toBeInTheDocument;
    // expect(screen.getByRole('button')).toBeDisabled()
})

//   test('redirects to the correct link when button is clicked', () => {
//     render(<HomePage />);

//     const mockLocalStorage = {
//       getItem: jest.fn().mockReturnValue(null), // Simulate an unauthenticated user
//     };

//     // Mock localStorage
//     jest.spyOn(window, 'localStorage', 'get').mockImplementation(() => mockLocalStorage);

//     const viewBudgetsButton = screen.getByText('View Budgets');
    
//     fireEvent.click(viewBudgetsButton);

//     expect(window.location.href).toBe('/signup');

//     // Add similar assertions for other buttons if needed
//   });
});
