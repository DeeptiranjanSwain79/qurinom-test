import Layout from "../../components/wrappers/Layout";
import { useContext, useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Drawer,
  IconButton,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import { CgOptions } from "react-icons/cg";
import { RiShoppingBagLine } from "react-icons/ri";
import { Search as SearchIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import type { Product } from "../../utils/interfaces";
import BackendAPI from "../../api/axiosClient";
import { decryptResponse } from "../../utils/decryptResponse";
import { red, white1 } from "../../utils/themes";
import ProductCard from "../../components/cards/ProductCard";
import NavbarContext from "../../contexts/Navbar.context";
import { ProductCategoryArray, SubCategoryArray } from "../../utils/constants";

const StorePage = () => {
  const { setActiveText } = useContext(NavbarContext);

  useEffect(() => {
    setActiveText("store");
  }, [setActiveText]);
  return (
    <Layout>
      <StoreComponent title="Melkite Store" />
    </Layout>
  );
};

export const StoreComponent = ({ title }: { title: string }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [location, setLocation] = useState("");
  const [isAvailable, setIsAvailable] = useState("");
  const [isFeatured, setIsFeatured] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Temp filters for drawer
  const [tempCategory, setTempCategory] = useState("");
  const [tempMinPrice, setTempMinPrice] = useState("");
  const [tempMaxPrice, setTempMaxPrice] = useState("");
  const [tempSubCategory, setTempSubCategory] = useState("");
  const [templocation, settempLocation] = useState("");
  const [tempisAvailable, settempIsAvailable] = useState("");
  const [tempisFeatured, settempIsFeatured] = useState("");
  const [tempsortBy, settempSortBy] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        const { data: res } = await BackendAPI.get("/store", {
          params: {
            search,
            category,
            subcategory: subCategory,
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
        const result = decryptResponse(res.products);
        setProducts(result);
        setTotalPages(res.totalPages || 1);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [
    search,
    category,
    minPrice,
    maxPrice,
    page,
    pageSize,
    subCategory,
    location,
    isAvailable,
    isFeatured,
    sortBy,
  ]);

  return (
    <>
      {/* Header */}
      <Box sx={{ backgroundColor: red, p: 2 }}>
        <Box
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: white1,
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", fontFamily: "Philosopher" }}
          >
            {title}
          </Typography>
        </Box>
      </Box>

      {/* Search & Menu */}
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 3,
          px: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flex: 1,
            maxWidth: 500,
          }}
        >
          <IconButton onClick={() => setFilterOpen(true)}>
            <CgOptions fontWeight={800} />
          </IconButton>
          <TextField
            placeholder="Search products"
            size="small"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: <SearchIcon />,
              sx: { borderRadius: "50px" },
            }}
          />
        </Box>
        <IconButton>
          <RiShoppingBagLine />
        </IconButton>
      </Box>

      {/* Loading & Error */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" sx={{ textAlign: "center", py: 2 }}>
          {error}
        </Typography>
      ) : (
        <Box
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            px: 2,
            pb: 4,
            mb: 24,
          }}
        >
          <ProductCard products={products} isAdmin={false} />

          {/* Pagination Controls */}
          <Box sx={{ width: "100%", mt: 4 }}>
            <Box
              sx={{
                mx: "auto",
                px: 2,
                pb: 6,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body2">Rows per page:</Typography>
                <Select
                  size="small"
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setPage(1);
                  }}
                >
                  {[8, 12, 16, 24, 50, 100].map((size) => (
                    <MenuItem key={size} value={size}>
                      {size}
                    </MenuItem>
                  ))}
                </Select>
              </Box>

              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, newPage) => setPage(newPage)}
                color="primary"
              />
            </Box>
          </Box>
        </Box>
      )}

      {/* Filter Drawer */}
      <Drawer
        anchor="right"
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        PaperProps={{
          sx: { width: { xs: "80%", sm: 350 }, p: 2 },
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
          Filter Products
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
              disabled={!tempCategory}
            >
              <MenuItem value="">All</MenuItem>
              {SubCategoryArray.map((sub, i) => (
                <MenuItem key={i} value={sub}>
                  {sub}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Min Price (£)"
              type="number"
              size="small"
              value={tempMinPrice}
              onChange={(e) => setTempMinPrice(e.target.value)}
              fullWidth
            />
            <TextField
              label="Max Price (£)"
              type="number"
              size="small"
              value={tempMaxPrice}
              onChange={(e) => setTempMaxPrice(e.target.value)}
              fullWidth
            />
          </Box>

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

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 1 }}
        >
          <Button onClick={() => setFilterOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: red, px: 4 }}
            onClick={() => {
              setCategory(tempCategory);
              setMinPrice(tempMinPrice);
              setMaxPrice(tempMaxPrice);
              setPage(1);
              setFilterOpen(false);
              setSubCategory(tempSubCategory);
              setLocation(templocation);
              setIsAvailable(tempisAvailable);
              setIsFeatured(tempisFeatured);
              setSortBy(tempsortBy);
            }}
          >
            Apply
          </Button>
        </Box>

        <LoadingButton
          variant="contained"
          sx={{ backgroundColor: red, px: 4, mt: 4 }}
          onClick={() => {
            setCategory("");
            setMinPrice("");
            setMaxPrice("");
            setTempCategory("");
            setTempMinPrice("");
            setTempMaxPrice("");
            setFilterOpen(false);
            setTempSubCategory("");
            setLocation("");
            setIsAvailable("");
            setIsFeatured("");
            setSortBy("");
          }}
          startIcon={<CgOptions />}
        >
          Clear Filter
        </LoadingButton>
      </Drawer>
    </>
  );
};

export default StorePage;
