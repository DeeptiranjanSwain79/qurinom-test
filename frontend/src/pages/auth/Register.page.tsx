import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth.api";
import Layout from "../../components/wrappers/Layout";
import NavbarContext from "../../contexts/Navbar.context";
import AuthContext, { type AuthContextType } from "../../contexts/Auth.context";
import { red, text, whiteBg, yellow1, yellow2 } from "../../utils/themes";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { setActiveText } = useContext(NavbarContext);
  const { user } = useContext(AuthContext) as AuthContextType;
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setActiveText("register");
  }, [setActiveText]);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // const handlePhotoUpload = (e: any) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     console.log("Selected photo:", file.name);
  //     // handle upload logic here
  //   }
  // };

  const handleRegister = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);

      const result = await registerUser({
        firstName,
        lastName,
        email,
        phone: phoneNumber,
        password,
      });
      if (result) {
        toast.success("Successfully registered! Welcome to our community!");
        navigate("/dashboard");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data?.error || error.message);
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Box
        sx={{
          backgroundColor: "#F5F5F5",
        }}
      >
        <Box
          sx={{
            maxWidth: "md",
            width: "100%",
            mx: "auto",
            textAlign: "center",
            py: 4,
            px: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: red,
              fontFamily: "Philosopher",
              mb: 1,
            }}
          >
            Register
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Kindly fill the form below to join our community
          </Typography>

          <Box
            component="form"
            noValidate
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            }}
          >
            <TextField
              placeholder="First name"
              variant="outlined"
              sx={borderless}
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              placeholder="Last name"
              variant="outlined"
              sx={borderless}
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              placeholder="Email"
              variant="outlined"
              sx={{ ...borderless, gridColumn: { sm: "1 / -1" } }}
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* <TextField
              placeholder="Address"
              variant="outlined"
              sx={borderless}
              fullWidth
            />
            <TextField
              placeholder="Country"
              variant="outlined"
              sx={borderless}
              fullWidth
            /> */}
            <TextField
              placeholder="Phone number"
              variant="outlined"
              fullWidth
              sx={{ ...borderless, gridColumn: { sm: "1 / -1" } }}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {/* <TextField
              placeholder="Jobs"
              variant="outlined"
              sx={borderless}
              fullWidth
            />
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{
                borderColor: "#ccc",
                color: "black",
                backgroundColor: "white",
                borderRadius: 2,
                height: 56,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              Upload photo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handlePhotoUpload}
              />
            </Button> */}

            <TextField
              placeholder="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              sx={{ ...borderless, gridColumn: { sm: "1 / -1" } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      sx={{ mr: 2 }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <LoadingButton
            fullWidth
            variant="contained"
            loading={loading}
            onClick={handleRegister}
            sx={{
              mt: 3,
              backgroundColor: yellow1,
              "&:hover": { backgroundColor: yellow2 },
              textTransform: "none",
              fontWeight: "bold",
              height: 56,
              borderRadius: 2,
            }}
          >
            Submit
          </LoadingButton>

          <Typography variant="body2" sx={{ textAlign: "center", mt: 4 }}>
            Already have an account?{" "}
            <Link href="/login" underline="hover">
              Log in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Layout>
  );
};

export default RegisterPage;
