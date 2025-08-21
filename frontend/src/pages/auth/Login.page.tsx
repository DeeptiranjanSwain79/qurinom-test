import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import loginImage from "../../assets/auth/logini.jpeg";
import Layout from "../../components/wrappers/Layout";
import NavbarContext from "../../contexts/Navbar.context";
import { red, white1 } from "../../utils/themes";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import toast from "react-hot-toast";
import { loginUser } from "../../api/auth.api";
import AuthContext, { type AuthContextType } from "../../contexts/Auth.context";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const { setActiveText } = useContext(NavbarContext);

  useEffect(() => {
    setActiveText("login");
  }, [setActiveText]);

  return (
    <Layout>
      <LoginComponent />
    </Layout>
  );
};

export const LoginComponent = () => {
  const { setUser, user } = useContext(AuthContext) as AuthContextType;
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async () => {
    try {
      const response = await loginUser({ email, password });

      setUser(response.user);
      toast.success("Login successful");
      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <Box
      sx={{
        display: "grid",
        minHeight: "90vh",
        maxHeight: "96vh",
        gridTemplateColumns: { xs: "1fr", md: "0.6fr 1fr" },
      }}
    >
      {/* Left side image */}
      <Box sx={{ flex: 1, display: { xs: "none", md: "block" } }}>
        <img
          src={loginImage}
          alt="Login visual"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top",
          }}
        />
      </Box>

      {/* Right side form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "100%", px: 4 }}>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              textAlign: "center",
              fontWeight: 600,
              fontFamily: "Noto Sans",
              color: red,
            }}
          >
            Log In
          </Typography>

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 1 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                    sx={{ mr: 2 }}
                  >
                    {showPassword ? (
                      <VisibilityOff sx={{ color: red }} />
                    ) : (
                      <Visibility sx={{ color: red }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Forgot password link */}
          <Box sx={{ textAlign: "right", mb: 2 }}>
            <Link
              href="/forgot-password"
              underline="hover"
              sx={{ fontSize: 14 }}
            >
              Forgot password?
            </Link>
          </Box>

          <FormControlLabel
            control={<Checkbox />}
            label="Remember me"
            sx={{ mb: 2 }}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: red,
              color: white1,
              "&:hover": { backgroundColor: red },
              mb: 2,
              py: 1.5,
            }}
            onClick={handleLogin}
          >
            Log in
          </Button>

          <Typography variant="body2" sx={{ textAlign: "center" }}>
            Don't have an account?{" "}
            <Link href="/register" underline="hover">
              Register
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
