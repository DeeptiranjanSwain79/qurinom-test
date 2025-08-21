import { useContext, useEffect, useState } from "react";
import AuthLayout from "../../components/wrappers/AuthLayout";
import NavbarContext from "../../contexts/Navbar.context";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Box,
  TextField,
  Typography,
  CircularProgress,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { red, text, whiteBg } from "../../utils/themes";
import type { Product } from "../../utils/interfaces";
import { RiDeleteBin5Line } from "react-icons/ri";
import {
  deleteProduct,
  getProductDetails,
  updateProduct,
} from "../../api/store.api";
import { useDropzone } from "react-dropzone";
import { AddAPhoto, Delete } from "@mui/icons-material";

const UpdateProductPage = () => {
  const { setAuthSidebarActiveText } = useContext(NavbarContext);
  const { productId } = useParams();
  const navigate = useNavigate();

  // Product details
  const [productDetails, setProductDetails] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [beforeDiscount, setBeforeDiscount] = useState(0);
  const [material, setMaterial] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [stock, setStock] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    setAuthSidebarActiveText("store-management");
  }, [setAuthSidebarActiveText]);

  // Fetch product
  useEffect(() => {
    (async () => {
      if (!productId) {
        toast.error("Invalid product id");
        return;
      }
      try {
        setLoading(true);
        const response = await getProductDetails(productId);
        const p = response.product;
        setProductDetails(p);

        // Prefill form
        setTitle(p.title);
        setDescription(p.description);
        setCategory(p.category);
        setPrice(p.price);
        setBeforeDiscount(p.beforeDiscount);
        setMaterial(p.material);
        setDimensions(p.dimensions);
        setStock(p.stock);
        setIsAvailable(p.isAvailable);
        setIsFeatured(p.isFeatured);
        setExistingImages(p.images || []);
        setGalleryImages([]);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error?.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [productId]);

  const borderless = {
    backgroundColor: whiteBg,
    borderRadius: 2,
    "& .MuiOutlinedInput-root": {
      "& fieldset": { border: "none" },
      "&:hover fieldset": { border: "none" },
      "&.Mui-focused fieldset": { border: "none" },
    },
    "& input::placeholder, & textarea::placeholder": {
      color: text,
      opacity: 1,
    },
  };

  const labelStyle = {
    fontWeight: "bold",
    fontSize: 14,
    color: red,
    mb: 0.5,
  };

  const handleUpdate = async () => {
    if (!productId) return;

    try {
      setSubmitLoading(true);

      const formData = new FormData();
      const payload = {
        title,
        description,
        category,
        price,
        beforeDiscount,
        material,
        dimensions,
        stock,
        isAvailable,
        isFeatured,
        existingImages,
      };

      formData.append("data", JSON.stringify(payload));
      if (mainImage) formData.append("mainImage", mainImage);
      galleryImages.forEach((file) => formData.append("images", file));

      const response = await updateProduct(productId, formData);
      setProductDetails(response.product);
      const p = response.product;
      setTitle(p.title);
      setDescription(p.description);
      setCategory(p.category);
      setPrice(p.price);
      setBeforeDiscount(p.beforeDiscount);
      setMaterial(p.material);
      setDimensions(p.dimensions);
      setStock(p.stock);
      setIsAvailable(p.isAvailable);
      setIsFeatured(p.isFeatured);
      setExistingImages(p.images || []);
      setGalleryImages([]);
      toast.success(response?.message || "Product updated successfully");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!productId) return;
    try {
      setSubmitLoading(true);
      await deleteProduct(productId);
      toast.success("Product deleted successfully");
      setDeleteDialogOpen(false);
      navigate("/product-management");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setSubmitLoading(false);
    }
  };
  const { getRootProps: getMainRootProps, getInputProps: getMainInputProps } =
    useDropzone({
      accept: { "image/*": [] },
      multiple: false,
      onDrop: (acceptedFiles) => {
        setMainImage(acceptedFiles[0]);
      },
    });

  // Dropzone for gallery images
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    onDrop: (acceptedFiles) => {
      setGalleryImages([...galleryImages, ...acceptedFiles]);
    },
  });

  if (loading) {
    return (
      <AuthLayout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
        >
          <CircularProgress />
        </Box>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <Box sx={{ p: 4 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{ fontFamily: "Noto Sans", color: red }}
        >
          Update Product
        </Typography>

        <Box
          display="grid"
          gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
          gap={2}
          mt={2}
        >
          {/* Title */}
          <Box>
            <Typography sx={labelStyle}>Title</Typography>
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              sx={borderless}
            />
          </Box>

          {/* Category */}
          <Box>
            <Typography sx={labelStyle}>Category</Typography>
            <TextField
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              fullWidth
              sx={borderless}
            />
          </Box>

          {/* Price */}
          <Box>
            <Typography sx={labelStyle}>Price</Typography>
            <TextField
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              fullWidth
              sx={borderless}
            />
          </Box>

          {/* Before Discount */}
          <Box>
            <Typography sx={labelStyle}>Before Discount</Typography>
            <TextField
              type="number"
              value={beforeDiscount}
              onChange={(e) => setBeforeDiscount(Number(e.target.value))}
              fullWidth
              sx={borderless}
            />
          </Box>

          {/* Material */}
          <Box>
            <Typography sx={labelStyle}>Material</Typography>
            <TextField
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              fullWidth
              sx={borderless}
            />
          </Box>

          {/* Dimensions */}
          <Box>
            <Typography sx={labelStyle}>Dimensions</Typography>
            <TextField
              value={dimensions}
              onChange={(e) => setDimensions(e.target.value)}
              fullWidth
              sx={borderless}
            />
          </Box>

          {/* Stock */}
          <Box>
            <Typography sx={labelStyle}>Stock</Typography>
            <TextField
              type="number"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              fullWidth
              sx={borderless}
            />
          </Box>

          {/* Description */}
          <Box sx={{ gridColumn: { md: "1 / -1" } }}>
            <Typography sx={labelStyle}>Description</Typography>
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              minRows={3}
              sx={borderless}
            />
          </Box>

          {/* Main Image */}
          {/* <Box>
            <Typography sx={labelStyle}>Main Image</Typography>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setMainImage(e.target.files?.[0] || null)}
            />
            {productDetails?.mainImage && !mainImage && (
              <img
                src={productDetails.mainImage}
                alt="main"
                style={{ width: 120, marginTop: 8, borderRadius: 8 }}
              />
            )}
          </Box> */}

          {/* Gallery Images */}
          {/* <Box sx={{ gridColumn: { md: "1 / -1" } }}>
            <Typography sx={labelStyle}>Gallery Images</Typography>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) =>
                setGalleryImages(Array.from(e.target.files || []))
              }
            />
            <Box display="flex" gap={2} mt={1} flexWrap="wrap">
              {existingImages.map((img) => (
                <Box key={img} position="relative">
                  <img
                    src={img}
                    alt="gallery"
                    style={{ width: 100, borderRadius: 8 }}
                  />
                  <Button
                    size="small"
                    color="error"
                    onClick={() =>
                      setExistingImages(existingImages.filter((i) => i !== img))
                    }
                  >
                    Remove
                  </Button>
                </Box>
              ))}
            </Box>
          </Box> */}
          {/* Main image upload */}
          <Box>
            <Typography sx={labelStyle}>Thumbnail</Typography>
            <Box
              {...getMainRootProps()}
              sx={{
                border: "2px dashed gray",
                borderRadius: 2,
                p: 2,
                textAlign: "center",
                cursor: "pointer",
                mb: 2,
              }}
            >
              <input {...getMainInputProps()} />
              <AddAPhoto fontSize="large" />
              <Typography>Click or Drag thumbnail here</Typography>
            </Box>
          </Box>

          {/* Show existing main image if no new upload */}
          {productDetails?.mainImage && !mainImage && (
            <Stack gap={0.5} mt={1}>
              <Typography variant="caption" sx={{ color: "gray" }}>
                Current Thumbnail
              </Typography>
              <img
                src={productDetails.mainImage}
                alt="main"
                style={{ width: "150px", borderRadius: 8 }}
              />
            </Stack>
          )}

          {/* Show preview of new main image */}
          {mainImage && (
            <Stack gap={0.5} mt={1}>
              <Typography variant="caption" sx={{ color: "gray" }}>
                New Thumbnail Preview
              </Typography>
              <img
                src={URL.createObjectURL(mainImage)}
                alt="Main Preview"
                style={{ width: "150px", borderRadius: 8 }}
              />
            </Stack>
          )}

          {/* Gallery images upload */}
          <Box sx={{ gridColumn: { md: "1 / -1" } }}>
            <Typography sx={labelStyle} mt={3}>
              Other Featured Images
            </Typography>
            <Box
              {...getRootProps()}
              sx={{
                border: "2px dashed gray",
                borderRadius: 2,
                p: 2,
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <input {...getInputProps()} />
              <AddAPhoto fontSize="large" />
              <Typography>Click or Drag product images here</Typography>
            </Box>

            {/* Existing gallery images from DB */}
            <Stack direction="row" spacing={2} flexWrap="wrap" mt={3}>
              {existingImages.map((img) => (
                <Box key={img} position="relative">
                  <img
                    src={img}
                    alt="gallery"
                    style={{ width: 100, borderRadius: 8 }}
                  />
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() =>
                      setExistingImages(existingImages.filter((i) => i !== img))
                    }
                    sx={{ position: "absolute", top: 0, right: 0 }}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              ))}
            </Stack>

            <Divider />

            {/* New images previews */}
            <Typography variant="body2" mt={3}>
              Newly Uploaded Images
            </Typography>
            <br />
            <Stack direction="row" spacing={2} flexWrap="wrap" mt={3}>
              {galleryImages.map((img, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(img)}
                  alt={`Product ${idx}`}
                  style={{ width: "100px", borderRadius: 8 }}
                />
              ))}
            </Stack>
          </Box>
        </Box>

        <Box mt={4} display="flex" justifyContent="flex-end">
          <LoadingButton
            variant="contained"
            loading={submitLoading}
            onClick={handleUpdate}
            sx={{ px: 4, mb: 4 }}
          >
            Update
          </LoadingButton>
        </Box>

        <Divider />

        <LoadingButton
          variant="contained"
          onClick={() => setDeleteDialogOpen(true)}
          sx={{
            my: 4,
            backgroundColor: red,
            px: 5,
            ":hover": { backgroundColor: red },
          }}
          startIcon={<RiDeleteBin5Line size={18} />}
        >
          Delete
        </LoadingButton>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle sx={{ fontWeight: "bold", mt: 4 }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently delete this product?
            <br />
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mb: 4 }}>
          <Button onClick={() => setDeleteDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <LoadingButton
            onClick={handleDelete}
            loading={submitLoading}
            variant="contained"
            color="error"
          >
            Yes, Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </AuthLayout>
  );
};

export default UpdateProductPage;
