import React from "react";
import { TextField, Button, Grid2, Typography, Box } from "@mui/material";

interface ProductFormProps {
  newProduct: { name: string; available: boolean };
  handleInputChange: (e: any) => void;
  handleAddProduct: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  newProduct,
  handleInputChange,
  handleAddProduct,
}) => {
  return (
    <Box mb={4}>
      <Typography variant="h5" gutterBottom>
        Add New Product
      </Typography>
      <Grid2 container alignItems="center" spacing={2}>
        <Grid2>
          <TextField
            label="Name"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid2>
        <Grid2>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddProduct}
            fullWidth
            disabled={!newProduct.name}
          >
            Add Product
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default ProductForm;
