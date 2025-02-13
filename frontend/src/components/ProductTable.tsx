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
  const [selectedProductId, setSelectedProductId] = React.useState<number | null>(null);

  const onConfirmDelete = () => selectedProductId && handleDeleteProduct(selectedProductId);

  const handleClickOpen = () => setOpen(true);

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
                <AlertDialog onConfirm={onConfirmDelete} open={open} setOpen={setOpen} message="This will permanently delete this product">
                  <Button variant="contained" color="error" onClick={() => {
                      setSelectedProductId(product.id); 
                      handleClickOpen();
                    }}
                    disabled={product.available}>
                    Delete
                  </Button>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;