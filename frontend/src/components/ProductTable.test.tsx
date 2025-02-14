import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductTable from './ProductTable';
import '@testing-library/jest-dom';

describe('ProductTable (Basic Tests)', () => {
  const mockProducts = [
    { id: 1, name: 'Product 1', available: true },
    { id: 2, name: 'Product 2', available: false }
  ];

  const mockHandleDeleteProduct = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders table headers', () => {
    render(<ProductTable products={mockProducts} handleDeleteProduct={mockHandleDeleteProduct} />);
    
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Available')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  test('renders product names', () => {
    render(<ProductTable products={mockProducts} handleDeleteProduct={mockHandleDeleteProduct} />);
    
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  test('disables delete button for available products', () => {
    render(<ProductTable products={mockProducts} handleDeleteProduct={mockHandleDeleteProduct} />);
    
    const deleteButtons = screen.getAllByText('Delete');
    
    expect(deleteButtons[0]).toBeDisabled();
    expect(deleteButtons[1]).toBeEnabled();
  });

  test('calls handleDeleteProduct when delete is confirmed', () => {
    render(<ProductTable products={mockProducts} handleDeleteProduct={mockHandleDeleteProduct} />);
    
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[1]);
    
    const confirmButton = screen.getByText('Confirm');
    fireEvent.click(confirmButton);

    expect(mockHandleDeleteProduct).toHaveBeenCalledTimes(1);
    expect(mockHandleDeleteProduct).toHaveBeenCalledWith(2);
  });
});
