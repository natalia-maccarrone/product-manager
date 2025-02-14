import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductForm from '../components/ProductForm';
import '@testing-library/jest-dom';


describe('ProductForm', () => {
  let handleInputChange: jest.Mock;
  let handleAddProduct: jest.Mock;
  let newProduct: { name: string; available: boolean };

  beforeEach(() => {
    handleInputChange = jest.fn();
    handleAddProduct = jest.fn();
    newProduct = { name: '', available: true };
  });

  test('renders the form correctly', () => {
    render(
      <ProductForm 
        newProduct={newProduct} 
        handleInputChange={handleInputChange} 
        handleAddProduct={handleAddProduct} 
      />
    );

    expect(screen.getByText(/Add New Product/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Product/i })).toBeInTheDocument();
  });

  test('disables the add button when input is empty', () => {
    render(
      <ProductForm 
        newProduct={newProduct} 
        handleInputChange={handleInputChange} 
        handleAddProduct={handleAddProduct} 
      />
    );

    const button = screen.getByRole('button', { name: /Add Product/i });
    expect(button).toBeDisabled();
  });

  test('enables the add button when input has text', () => {
    newProduct.name = 'Test Product';
    
    render(
      <ProductForm 
        newProduct={newProduct} 
        handleInputChange={handleInputChange} 
        handleAddProduct={handleAddProduct} 
      />
    );

    const button = screen.getByRole('button', { name: /Add Product/i });
    expect(button).not.toBeDisabled();
  });

  test('calls handleInputChange when typing in input', () => {
    render(
      <ProductForm 
        newProduct={newProduct} 
        handleInputChange={handleInputChange} 
        handleAddProduct={handleAddProduct} 
      />
    );

    const input = screen.getByLabelText(/Name/i);
    fireEvent.change(input, { target: { value: 'New Product' } });

    expect(handleInputChange).toHaveBeenCalledTimes(1);
  });

  test('calls handleAddProduct when button is clicked', () => {
    newProduct.name = 'Test Product';
    
    render(
      <ProductForm 
        newProduct={newProduct} 
        handleInputChange={handleInputChange} 
        handleAddProduct={handleAddProduct} 
      />
    );

    const button = screen.getByRole('button', { name: /Add Product/i });
    fireEvent.click(button);

    expect(handleAddProduct).toHaveBeenCalledTimes(1);
  });
});
