import React from "react";
import { Container } from "@mui/material";
import FilterSortForm from "./components/FilterSortForm";
import ProductTable from "./components/ProductTable";
import useProducts, { Filters, Product } from "./hooks/useProducts";

interface ListProductsPageProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  products: Product[];
  deleteProduct(id: number): void;
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

const ListProductsPage: React.FC<ListProductsPageProps> = ({
  filters,
  setFilters,
  products,
  deleteProduct,
  updateProduct,
}) => {
  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <Container disableGutters>
      <FilterSortForm
        filters={filters}
        handleFilterChange={handleFilterChange}
      />
      <ProductTable
        products={products}
        handleDeleteProduct={deleteProduct}
        filters={filters}
        setFilters={setFilters}
        handleUpdateProduct={updateProduct}
      />
    </Container>
  );
};

export default ListProductsPage;
