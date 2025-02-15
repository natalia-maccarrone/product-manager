import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

interface EditProductDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: ({
    name,
    available,
  }: {
    name?: string;
    available?: boolean;
  }) => void;
  name: string;
}

export default function EditProductDialog({
  open,
  setOpen,
  onConfirm,
  name,
}: EditProductDialogProps) {
  const [newName, setNewName] = React.useState<string>();
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
          },
        }}
      >
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            autoComplete="false"
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            defaultValue={name}
            variant="standard"
            onChange={(e) => setNewName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              onConfirm({ name: newName });
              handleClose();
            }}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
