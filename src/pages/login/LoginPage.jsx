import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";

import BG from "../../assets/Dark Blue Background.png";

function LoginPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${BG})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          width: 300,
          height: 400,
          padding: 5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
          borderRadius: 1,
          boxShadow: 3,
          backgroundColor: "#fff",
        }}
      >
        <Avatar
          sx={{ width: "100px", height: "100px" }}
          src="/broken-image.jpg"
        />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField label="Email" variant="outlined" />
          <TextField label="Contraseña" variant="outlined" type="password" />
        </Box>

        <Button variant="contained" size="large" startIcon={<LoginIcon />}>
          {" "}
          Ingresar{" "}
        </Button>
      </Box>
    </Box>
  );
}

export default LoginPage;
