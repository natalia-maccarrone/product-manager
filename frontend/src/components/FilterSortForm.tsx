import React from "react";
import { Grid2, Typography, Box, TextField } from "@mui/material";

interface FilterSortFormProps {
  filters: { sortBy: string; search: string };
  handleFilterChange: (e: any) => void;
}
const FilterForm: React.FC<FilterSortFormProps> = ({
  filters,
  handleFilterChange,
}) => {
  return (
    <Box mb={4}>
      <Typography variant="h5" gutterBottom>
        Filter and Sort Products
      </Typography>
      <Grid2>
        <TextField
          label="Search"
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          fullWidth
        />
      </Grid2>
    </Box>
  );
};

export default FilterForm;
