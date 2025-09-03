import {
  Box,
  //   Button,
  //   Container,
  //   MenuItem,
  //   TextField,
  //   Typography,
} from "@mui/material";

import Background from "../../assets/LP Background.png";
import FormularioReservas from "../../components/FormularioReservas/FormularioReservas";
import InfoMedico from "../../components/InfoMedico/InfoMedico";

function LandingPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 10,
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${Background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <InfoMedico />
      {/* <FormularioReservas /> */}
    </Box>
  );
}

export default LandingPage;
