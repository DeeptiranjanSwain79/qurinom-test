import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { PrivateAPI } from "../../../api/axiosClient";
import {
  ProductCategoryArray,
  SubCategoryArray,
} from "../../../utils/constants";
import { decryptResponse } from "../../../utils/decryptResponse";
import type { Product } from "../../../utils/interfaces";
import { red } from "../../../utils/themes";
import ProductCard from "../../cards/ProductCard";
import { LoadingButton } from "@mui/lab";
import { CgOptions } from "react-icons/cg";

const AdminProductsTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [location, setLocation] = useState("");
  const [isAvailable, setIsAvailable] = useState("");
  const [isFeatured, setIsFeatured] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(1);

  // Temp filters
  const [tempsearch, setTempsearch] = useState("");
  const [tempCategory, setTempCategory] = useState("");
  const [tempMinPrice, setTempMinPrice] = useState("");
  const [tempMaxPrice, setTempMaxPrice] = useState("");
  const [tempSubCategory, setTempSubCategory] = useState("");
  const [templocation, settempLocation] = useState("");
  const [tempisAvailable, settempIsAvailable] = useState("");
  const [tempisFeatured, settempIsFeatured] = useState("");
  const [tempsortBy, settempSortBy] = useState("");

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data, status } = await PrivateAPI.get("/store/admin", {
        params: {
          search,
          category,
          subcategory,
          minPrice,
          maxPrice,
          location,
          isAvailable,
          isFeatured,
          sortBy,
          page,
          limit: pageSize,
        },
      });

      if (status === 200) {
        const result = decryptResponse(data.products);
        setProducts(result);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [
    search,
    category,
    subcategory,
    minPrice,
    maxPrice,
    location,
    isAvailable,
    isFeatured,
    sortBy,
    page,
    pageSize,
  ]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Box sx={{ p: { md: 3, xs: 1 } }}>
      <Divider />
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        sx={{ color: red, fontFamily: "Noto Sans", mt: 2 }}
      >
        All Products
      </Typography>

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
        {/* Search */}
        <TextField
          label="Search Title"
          variant="outlined"
          size="small"
          value={tempsearch}
          onChange={(e) => setTempsearch(e.target.value)}
        />

        {/* Category */}
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={tempCategory}
            onChange={(e) => {
              setTempCategory(e.target.value);
            }}
          >
            <MenuItem value="">All</MenuItem>
            {ProductCategoryArray.map((cat, i) => (
              <MenuItem value={cat} key={i}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Subcategory */}
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Subcategory</InputLabel>
          <Select
            value={tempSubCategory}
            onChange={(e) => setTempSubCategory(e.target.value)}
            disabled={!category}
          >
            <MenuItem value="">All</MenuItem>
            {category &&
              SubCategoryArray.map((sub, i) => (
                <MenuItem key={i} value={sub}>
                  {sub}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        {/* Price Range */}
        <TextField
          label="Min Price"
          type="number"
          size="small"
          value={tempMinPrice}
          onChange={(e) => setTempMinPrice(e.target.value)}
        />
        <TextField
          label="Max Price"
          type="number"
          size="small"
          value={tempMaxPrice}
          onChange={(e) => setTempMaxPrice(e.target.value)}
        />

        {/* Location */}
        <TextField
          label="Location"
          size="small"
          value={templocation}
          onChange={(e) => settempLocation(e.target.value)}
        />

        {/* Availability */}
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Availability</InputLabel>
          <Select
            value={tempisAvailable}
            onChange={(e) => settempIsAvailable(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="true">Available</MenuItem>
            <MenuItem value="false">Unavailable</MenuItem>
          </Select>
        </FormControl>

        {/* Featured */}
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Featured</InputLabel>
          <Select
            value={tempisFeatured}
            onChange={(e) => settempIsFeatured(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="true">Featured</MenuItem>
            <MenuItem value="false">Not Featured</MenuItem>
          </Select>
        </FormControl>

        {/* Sorting */}
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={tempsortBy}
            onChange={(e) => settempSortBy(e.target.value)}
          >
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="priceLowHigh">Price: Low to High</MenuItem>
            <MenuItem value="priceHighLow">Price: High to Low</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Stack direction="row" gap={5} mb={3}>
        <Button
          variant="contained"
          sx={{ backgroundColor: red, px: 4 }}
          onClick={() => {
            setCategory(tempCategory);
            setMinPrice(tempMinPrice);
            setMaxPrice(tempMaxPrice);
            setPage(1);
            setSubcategory(tempSubCategory);
            setLocation(templocation);
            setIsAvailable(tempisAvailable);
            setIsFeatured(tempisFeatured);
            setSortBy(tempsortBy);
            setSearch(tempsearch);
          }}
        >
          Apply
        </Button>

        <LoadingButton
          variant="contained"
          sx={{ backgroundColor: red, px: 4 }}
          onClick={() => {
            setCategory("");
            setMinPrice("");
            setMaxPrice("");
            setTempCategory("");
            setTempMinPrice("");
            setTempMaxPrice("");
            setTempSubCategory("");
            setLocation("");
            setIsAvailable("");
            setIsFeatured("");
            setSortBy("");
            setSearch("");
            setTempsearch("");
            setTempCategory("");
            setTempMinPrice("");
            setTempMaxPrice("");
          }}
          startIcon={<CgOptions />}
        >
          Clear Filter
        </LoadingButton>
      </Stack>

      {/* Products */}
      {loading ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", minHeight: "40vh" }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Grid */}
          <ProductCard products={products} isAdmin />

          {/* Pagination Controls */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 3,
              mb: 3,
              width: "100%",
              flexDirection: { md: "row", xs: "column" },
              gap: 3,
            }}
          >
            <FormControl size="small" sx={{ width: { md: "20%", xs: "50%" } }}>
              <InputLabel>Page Size</InputLabel>
              <Select
                value={pageSize}
                label="Page Size"
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
              >
                {[4, 8, 12, 20].map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, value) => setPage(value)}
              color="primary"
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default AdminProductsTable;
