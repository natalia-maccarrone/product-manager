import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import AlertDialog from '../components/AlertDialog'

interface Product {
  id: number;
  name: string;
  available: boolean;
}

interface ProductTableProps {
  products: Product[];
  handleDeleteProduct: (id: number) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, handleDeleteProduct }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

  const onConfirmDelete = () => selectedProduct && handleDeleteProduct(selectedProduct.id);

  const handleClickOpen = (product: Product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Available</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(product => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.available ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                <Button 
                  variant="contained" 
                  color="error" 
                  onClick={() => handleClickOpen(product)}
                  disabled={product.available}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AlertDialog 
        onConfirm={onConfirmDelete} 
        open={open} 
        setOpen={setOpen} 
        message={`This will permanently delete ${selectedProduct?.name ?? 'this product'}.`}
      />
    </TableContainer>
  );
};

export default ProductTable;