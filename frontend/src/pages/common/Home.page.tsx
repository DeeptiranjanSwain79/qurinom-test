import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Layout from "../../components/wrappers/Layout";
import { ProductCategoryArray } from "../../utils/constants";
import { useContext, useEffect } from "react";
import NavbarContext from "../../contexts/Navbar.context";

const HomePage = () => {
  const { setActiveText } = useContext(NavbarContext);

  useEffect(() => {
    setActiveText("home");
  }, [setActiveText]);
  return (
    <Layout>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #9d0b0e, #d62828)",
          color: "white",
          py: { xs: 6, md: 10 },
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", mb: 2, fontFamily: "Philosopher" }}
        >
          Welcome to E CommerceStore
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Discover authentic products, curated just for you.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: "white",
            color: "#9d0b0e",
            px: 4,
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#f1f1f1" },
          }}
          component={Link}
          to={`/store`}
        >
          Shop Now
        </Button>
      </Box>

      {/* Categories Section */}
      <Box sx={{ maxWidth: "1200px", mx: "auto", py: 6, px: 2 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}
        >
          Shop by Category
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              md: "repeat(5, 1fr)",
            },
            gap: 3,
          }}
        >
          {ProductCategoryArray.map((cat) => (
            <Card
              component={Link}
              to={`/store`}
              key={cat}
              sx={{
                textAlign: "center",
                py: 4,
                cursor: "pointer",
                borderRadius: "16px",
                textDecoration: "none",
                "&:hover": {
                  boxShadow: 6,
                  transform: "scale(1.05)",
                  transition: "0.3s",
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#9d0b0e" }}
                >
                  {cat}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Layout>
  );
};

export default HomePage;
