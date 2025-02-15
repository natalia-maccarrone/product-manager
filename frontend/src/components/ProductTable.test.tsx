import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductTable from "./ProductTable";
import "@testing-library/jest-dom";

describe("ProductTable", () => {
  const mockProducts = [
    { id: 1, name: "Product 1", available: true },
    { id: 2, name: "Product 2", available: false },
  ];

  const mockHandleDeleteProduct = jest.fn();
  const mockHandleUpdateProduct = jest.fn();
  const filters = { search: "", sortBy: "", sortDir: "" };
  const setFilters = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders table headers", () => {
    render(
      <ProductTable
        products={mockProducts}
        handleDeleteProduct={mockHandleDeleteProduct}
        filters={filters}
        setFilters={setFilters}
        handleUpdateProduct={mockHandleUpdateProduct}
      />
    );

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Available")).toBeInTheDocument();
  });

  test("renders product names", () => {
    render(
      <ProductTable
        products={mockProducts}
        handleDeleteProduct={mockHandleDeleteProduct}
        filters={filters}
        setFilters={setFilters}
        handleUpdateProduct={mockHandleUpdateProduct}
      />
    );

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  test("disables delete button for available products", () => {
    render(
      <ProductTable
        products={mockProducts}
        handleDeleteProduct={mockHandleDeleteProduct}
        filters={filters}
        setFilters={setFilters}
        handleUpdateProduct={mockHandleUpdateProduct}
      />
    );

    const deleteButtons = screen.getAllByTestId("delete-button");
    expect(deleteButtons[0]).toBeDisabled();
    expect(deleteButtons[1]).toBeEnabled();
  });

  test("calls handleDeleteProduct when delete is confirmed", () => {
    render(
      <ProductTable
        products={mockProducts}
        handleDeleteProduct={mockHandleDeleteProduct}
        filters={filters}
        setFilters={setFilters}
        handleUpdateProduct={mockHandleUpdateProduct}
      />
    );

    const deleteButtons = screen.getAllByTestId("delete-button");
    fireEvent.click(deleteButtons[1]);

    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);

    expect(mockHandleDeleteProduct).toHaveBeenCalledTimes(1);
    expect(mockHandleDeleteProduct).toHaveBeenCalledWith(2);
  });
});
