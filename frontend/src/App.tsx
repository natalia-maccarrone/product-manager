import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";
import ListProductsPage from "./ListProductsPage";
import ManageProductsPage from "./ManageProductsPage";
import useProducts, { Filters, NewProduct } from "./hooks/useProducts";

const App: React.FC = () => {
  // Centralizes the state management here and pass data as props to both pages
  const {
    products,
    filters,
    setFilters,
    deleteProduct,
    addProduct,
    updateProduct,
  } = useProducts({
    sortBy: "",
    search: "",
    sortDir: "asc",
  });

  return (
    <Router>
      <Container>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Typography variant="h2" gutterBottom>
            Products
          </Typography>
          <Box>
            <Button
              component={Link}
              to="/"
              variant="contained"
              color="primary"
              style={{ marginRight: "10px" }}
            >
              Product List
            </Button>
            <Button
              component={Link}
              to="/manage"
              variant="contained"
              color="secondary"
            >
              Manage Products
            </Button>
          </Box>
        </Box>
        <Routes>
          <Route
            path="/"
            element={
              <ListProductsPage
                filters={filters}
                setFilters={setFilters}
                products={products}
                deleteProduct={deleteProduct}
                updateProduct={updateProduct}
              />
            }
          />
          <Route
            path="/manage"
            element={
              <ManageProductsPage
                filters={undefined}
                setFilters={setFilters}
                products={products}
                deleteProduct={deleteProduct}
                addProduct={addProduct}
                updateProduct={updateProduct}
              />
            }
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
