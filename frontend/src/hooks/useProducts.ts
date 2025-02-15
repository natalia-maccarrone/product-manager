import { useState, useEffect } from "react";
import axios from "axios";

export interface Product {
  id: number;
  name: string;
  available: boolean;
}

export interface NewProduct {
  name: string;
  available: boolean;
}

export interface Filters {
  sortBy: string;
  sortDir: string;
  search: string;
}

const useProducts = (initialFilters: Filters) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<Filters>(initialFilters);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = () => {
    let url = `http://localhost:3000/products`;

    axios
      .get(url, { params: filters })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  };

  const addProduct = (newProduct: NewProduct) => {
    axios
      .post("http://localhost:3000/products", newProduct)
      .then((response) => {
        setProducts([...products, response.data]);
      })
      .catch((error) => {
        console.error("There was an error adding the product!", error);
      });
  };

  const deleteProduct = (id: number) => {
    axios
      .delete(`http://localhost:3000/products/${id}`)
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the product!", error);
      });
  };

  // added this to allow modifying product properties like name and availability
  const updateProduct = ({
    id,
    name,
    available,
  }: {
    id: number;
    name?: string;
    available?: boolean;
  }) => {
    axios
      .put(`http://localhost:3000/products/${id}`, { name, available })
      .then((response) => {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === id ? response.data : product
          )
        );
      })
      .catch((error) => {
        console.error("There was an error deleting the product!", error);
      });
  };

  return {
    products,
    filters,
    setFilters,
    addProduct,
    deleteProduct,
    updateProduct,
  };
};

export default useProducts;
