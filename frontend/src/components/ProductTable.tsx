import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableSortLabel,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import AlertDialog from "../components/AlertDialog";
import { Filters } from "../hooks/useProducts";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditProductDialog from "./EditProductDialog";
import Switch from "@mui/material/Switch";

interface Product {
  id: number;
  name: string;
  available: boolean;
}

interface ProductTableProps {
  products: Product[];
  handleDeleteProduct: (id: number) => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  handleUpdateProduct: ({
    id,
    name,
    available,
  }: {
    id: number;
    name?: string;
    available?: boolean;
  }) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  handleDeleteProduct,
  filters,
  setFilters,
  handleUpdateProduct,
}) => {
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);

  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
    null
  );
  const [sortBy, setSortBy] = React.useState<keyof Product>("name");
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc");

  const onConfirmDelete = () =>
    selectedProduct && handleDeleteProduct(selectedProduct.id);

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setOpenDeleteDialog(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setOpenEditDialog(true);
  };

  const handleRequestSort = (property: keyof Product) => {
    setSortDir(sortDir === "asc" ? "desc" : "asc");
    setSortBy(property);
    setFilters({ ...filters, sortBy, sortDir });
  };

  const updateProduct = ({
    id,
    name,
    available,
  }: {
    id?: number;
    name?: string;
    available?: boolean;
  }) => {
    handleUpdateProduct({ id: id ?? selectedProduct.id, name, available });
  };

  return (
    <TableContainer component={Paper} elevation={3}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "100px" }}></TableCell>
            <TableCell>
              {/* to click on the column headers to sort the products  */}
              <TableSortLabel
                active={sortBy === "name"}
                direction={sortBy === "name" ? sortDir : "asc"}
                onClick={() => handleRequestSort("name")}
              >
                Name
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ width: "100px" }}>
              <TableSortLabel
                active={sortBy === "available"}
                direction={sortBy === "available" ? sortDir : "asc"}
                onClick={() => handleRequestSort("available")}
              >
                Available
              </TableSortLabel>
            </TableCell>
            <TableCell sx={{ width: "100px" }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Button
                  size="small"
                  variant="contained"
                  color="info"
                  onClick={() => handleEdit(product)}
                >
                  <EditIcon fontSize="small" />
                </Button>
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                <Switch
                  inputProps={{ "aria-label": "available-switch" }}
                  checked={!!product.available}
                  onChange={() =>
                    updateProduct({
                      id: product.id,
                      available: !!product.available ? false : true,
                    })
                  }
                />
              </TableCell>
              <TableCell>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(product)}
                  disabled={product.available}
                  data-testid="delete-button"
                >
                  <DeleteIcon fontSize="small" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog
        onConfirm={onConfirmDelete}
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        message={`This will permanently delete ${
          selectedProduct?.name ?? "this product"
        }.`}
      />
      <EditProductDialog
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        onConfirm={updateProduct}
        name={selectedProduct?.name ?? ""}
      />
    </TableContainer>
  );
};

export default ProductTable;
