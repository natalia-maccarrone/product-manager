import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import { Filters, NewProduct, Product } from "./hooks/useProducts";

interface ManageProductsPageProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  products: Product[];
  deleteProduct(id: number): void;
  addProduct(newProduct: NewProduct): void;
  updateProduct({
    id,
    name,
    available,
  }: {
    id: number;
    name?: string;
    available?: boolean;
  }): void;
}

const ManageProductsPage: React.FC<ManageProductsPageProps> = ({
  filters,
  setFilters,
  products,
  deleteProduct,
  addProduct,
  updateProduct,
}) => {
  // This ensures that the product list isn’t filtered by an old search term when navigating to the page
  useEffect(() => {
    setFilters({ ...filters, search: "" });
  }, []);

  const [newProduct, setNewProduct] = useState({ name: "", available: true });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = () => {
    if (newProduct.name) {
      addProduct(newProduct);
      setNewProduct({ name: "", available: true });
    }
  };

  const handleDeleteProduct = (id: number) => {
    deleteProduct(id);
  };

  return (
    <Container disableGutters>
      <ProductForm
        newProduct={newProduct}
        handleInputChange={handleInputChange}
        handleAddProduct={handleAddProduct}
      />
      <ProductTable
        products={products}
        handleDeleteProduct={handleDeleteProduct}
        filters={filters}
        setFilters={setFilters}
        handleUpdateProduct={updateProduct}
      />
    </Container>
  );
};

export default ManageProductsPage;
