import { Avatar, Box, Container, Typography } from "@mui/material";
import FotoMedico from "../../assets/Medico.jpg";

function InfoMedico() {
  return (
    <>
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          display: "flex",
          width: "80%",
          borderRadius: 2,
          padding: 2,
          justifyContent: "center",
          alignItems: "center",
          //   height: "100vh",
          //   width: "auto",
          backgroundColor: "#ffffffc2",
          color: "black",
          boxShadow: 8,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Avatar
            sizes=""
            sx={{ width: "100px", height: "100px" }}
            src={FotoMedico}
          />
          <Typography variant="body1" component="h1">
            Nombre Apellido
          </Typography>
          <Typography variant="body2" component="h1">
            Especializacion
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export default InfoMedico;
