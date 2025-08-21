import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../api/store.api";
import Layout from "../../components/wrappers/Layout";
import type { Product } from "../../utils/interfaces";
import NavbarContext from "../../contexts/Navbar.context";

const ProductDetailsPage = () => {
  const { setActiveText } = useContext(NavbarContext);

  useEffect(() => {
    setActiveText("store");
  }, [setActiveText]);
  const { productId } = useParams();
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState<Product | null>(null);

  useEffect(() => {
    (async () => {
      if (!productId) {
        toast.error("Invalid product");
        return;
      }
      try {
        setLoading(true);
        const response = await getProductDetails(productId);
        setProductDetails(response.product);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error?.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [productId]);

  if (loading || !productDetails) {
    return (
      <Layout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
        >
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
        gap={4}
        mt={4}
      >
        {/* Product Images */}
        <Box>
          <Box
            component="img"
            src={productDetails.mainImage}
            alt={productDetails.title}
            sx={{
              width: "100%",
              borderRadius: 2,
              boxShadow: 2,
              objectFit: "cover",
              mb: 2,
            }}
          />
          <Box
            sx={{ display: { xs: "flex", md: "none" } }}
            gap={2}
            flexWrap="wrap"
          >
            {productDetails.images?.map((img, idx) => (
              <Box
                key={idx}
                component="img"
                src={img}
                alt={`${productDetails.title}-${idx}`}
                sx={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: 1,
                  border: "1px solid #ddd",
                  cursor: "pointer",
                  "&:hover": { borderColor: "primary.main" },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Product Info */}
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {productDetails.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {productDetails.description}
          </Typography>

          <Box display="flex" alignItems="center" gap={2} mt={2}>
            <Typography variant="h5" color="primary">
              ₹{productDetails.price}
            </Typography>
            {productDetails.beforeDiscount && (
              <Typography
                variant="body1"
                sx={{ textDecoration: "line-through", color: "gray" }}
              >
                ₹{productDetails.beforeDiscount}
              </Typography>
            )}
          </Box>

          <Box mt={2}>
            <Chip
              label={productDetails.isAvailable ? "In Stock" : "Out of Stock"}
              color={productDetails.isAvailable ? "success" : "error"}
              sx={{ mr: 1 }}
            />
            {productDetails.isFeatured && (
              <Chip label="Featured" color="secondary" />
            )}
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" gutterBottom>
            <strong>Category:</strong> {productDetails.category}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Subcategory:</strong> {productDetails.subCategory}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Material:</strong> {productDetails.material}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Dimensions:</strong> {productDetails.dimensions}
          </Typography>
          <Typography variant="body2" gutterBottom>
            <strong>Location:</strong> {productDetails.location}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              size="large"
              disabled={!productDetails.isAvailable}
            >
              Add to Cart
            </Button>
            <Button variant="outlined" size="large">
              Buy Now
            </Button>
          </Box>

          <Box
            sx={{
              display: { md: "flex", xs: "none" },
              flexWrap: "wrap",
              mt: 4,
            }}
            gap={2}
          >
            {productDetails.images?.map((img, idx) => (
              <Box
                key={idx}
                component="img"
                src={img}
                alt={""}
                sx={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: 1,
                  border: "1px solid #ddd",
                  cursor: "pointer",
                  "&:hover": { borderColor: "primary.main" },
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default ProductDetailsPage;
