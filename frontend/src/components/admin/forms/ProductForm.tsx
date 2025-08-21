import { LoadingButton } from "@mui/lab";
import {
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Stack,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";
import { AddAPhoto } from "@mui/icons-material";
import { createProduct } from "../../../api/store.api";
import {
  ProductCategoryArray,
  SubCategoryArray,
} from "../../../utils/constants";
import { red, text, whiteBg } from "../../../utils/themes";

interface ProductFormProps {
  onSuccess?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSuccess }) => {
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(ProductCategoryArray[0]);
  const [subCategory, setSubCategory] = useState(SubCategoryArray[0]);
  const [tags, setTags] = useState("");
  const [price, setPrice] = useState(0);
  const [beforeDiscount, setBeforeDiscount] = useState<number | undefined>();
  const [material, setMaterial] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [stock, setStock] = useState(0);
  const [location, setLocation] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

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
    mt: 1,
  };

  // Dropzone for multiple product images
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    maxSize: 10 * 1024 * 1024,
    onDrop: (acceptedFiles) => {
      setImages((prev) => [...prev, ...acceptedFiles]);
    },
  });

  // Dropzone for thumbnail Image
  const { getRootProps: getMainRootProps, getInputProps: getMainInputProps } =
    useDropzone({
      accept: { "image/*": [] },
      multiple: false,
      maxSize: 10 * 1024 * 1024,
      onDrop: (acceptedFiles) => {
        if (acceptedFiles[0]) setMainImage(acceptedFiles[0]);
      },
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mainImage) {
      toast.error("Please upload a main product image");
      return;
    }
    if (images.length === 0) {
      toast.error("Please upload at least one product image");
      return;
    }

    try {
      setSubmitLoading(true);

      const formData = new FormData();
      formData.append("mainImage", mainImage);
      images.forEach((img) => formData.append("images", img));

      const data = {
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        subcategory: subCategory.trim(), // ✅ added
        tags: tags.trim(),
        price,
        beforeDiscount: beforeDiscount || null,
        material: material.trim(),
        dimensions: dimensions.trim(),
        stock,
        location: location.trim(),
        isFeatured, // ✅ boolean
        isAvailable, // ✅ boolean
      };
      formData.append("data", JSON.stringify(data));

      const response = await createProduct(formData);

      toast.success(response.message);

      // Reset form
      setMainImage(null);
      setImages([]);
      setTitle("");
      setDescription("");
      setCategory(ProductCategoryArray[0]);
      setSubCategory(SubCategoryArray[0]);
      setTags("");
      setPrice(0);
      setBeforeDiscount(undefined);
      setMaterial("");
      setDimensions("");
      setStock(0);
      setLocation("");
      setIsFeatured(false);
      setIsAvailable(true);

      if (onSuccess) onSuccess();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Error creating product");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", p: 1 }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        sx={{ fontFamily: "Noto Sans", color: red }}
      >
        Create New Product
      </Typography>

      {/* Title */}
      <Typography sx={labelStyle}>Title</Typography>
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        sx={borderless}
      />

      {/* Description */}
      <Typography sx={labelStyle}>Description</Typography>
      <TextField
        multiline
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        sx={borderless}
      />

      {/* Category */}
      <Typography sx={labelStyle}>Category</Typography>
      <FormControl fullWidth sx={borderless}>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          {ProductCategoryArray.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Sub-Category */}
      <Typography sx={labelStyle}>Sub-Category</Typography>
      <FormControl fullWidth sx={borderless}>
        <Select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
        >
          {SubCategoryArray.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Tags */}
      <Typography sx={labelStyle}>Tags (comma separated)</Typography>
      <TextField
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        sx={borderless}
      />

      {/* Price & Before Discount */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { md: "1fr 1fr", xs: "1fr" },
          gap: 2,
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Typography sx={labelStyle}>Price</Typography>
          <TextField
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            fullWidth
            sx={borderless}
          />
        </Box>

        <Box>
          <Typography sx={labelStyle}>Before Discount (Optional)</Typography>
          <TextField
            type="number"
            value={beforeDiscount || ""}
            onChange={(e) =>
              setBeforeDiscount(
                e.target.value ? Number(e.target.value) : undefined
              )
            }
            fullWidth
            sx={borderless}
          />
        </Box>
      </Box>

      {/* Material */}
      <Typography sx={labelStyle}>Material</Typography>
      <TextField
        value={material}
        onChange={(e) => setMaterial(e.target.value)}
        fullWidth
        sx={borderless}
      />

      {/* Dimensions */}
      <Typography sx={labelStyle}>Dimensions</Typography>
      <TextField
        value={dimensions}
        onChange={(e) => setDimensions(e.target.value)}
        fullWidth
        sx={borderless}
      />

      {/* Stock */}
      <Typography sx={labelStyle}>Stock</Typography>
      <TextField
        type="number"
        value={stock}
        onChange={(e) => setStock(Number(e.target.value))}
        fullWidth
        sx={borderless}
      />

      {/* Location */}
      <Typography sx={labelStyle}>Location</Typography>
      <TextField
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
        sx={borderless}
      />

      {/* Switches */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { md: "1fr 1fr", xs: "1fr" },
          my: 2,
        }}
      >
        <FormControlLabel
          control={
            <Switch
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
            />
          }
          label="Featured"
        />

        <FormControlLabel
          control={
            <Switch
              checked={isAvailable}
              onChange={(e) => setIsAvailable(e.target.checked)}
            />
          }
          label="Available"
        />
      </Box>

      {/* Main image upload */}
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

      {mainImage && (
        <Stack gap={0.5} mt={1}>
          <Typography variant="caption" sx={{ color: red }}>
            Thumbnail Preview
          </Typography>
          <img
            src={URL.createObjectURL(mainImage)}
            alt="Main Preview"
            style={{ width: "150px", borderRadius: 8 }}
          />
        </Stack>
      )}

      {/* Multiple product images */}
      <Typography sx={labelStyle}>Other Featured Images</Typography>
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
      <Stack direction="row" spacing={2} flexWrap="wrap" mt={3}>
        {images.map((img, idx) => (
          <img
            key={idx}
            src={URL.createObjectURL(img)}
            alt={`Product ${idx}`}
            style={{ width: "100px", borderRadius: 8 }}
          />
        ))}
      </Stack>

      <Box height={16} />
      <LoadingButton type="submit" variant="contained" loading={submitLoading}>
        Create Product
      </LoadingButton>
    </Box>
  );
};

export default ProductForm;
