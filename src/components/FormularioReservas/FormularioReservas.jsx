import {
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";

function FormularioReservas() {
  return (
    <>
      <Container
        disableGutters
        maxWidth="sm"
        sx={{
          borderRadius: 2,
          backgroundColor: "#ffffffc2",
          color: "black",
          padding: 4,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Reservar cita
        </Typography>

        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Nombre completo"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            label="Teléfono"
            type="tel"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            label="Fecha"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
          />
          <TextField label="Obra social" select fullWidth defaultValue="">
            <MenuItem value="control">Osecac</MenuItem>
            <MenuItem value="consulta">Prevencion Salud</MenuItem>
            <MenuItem value="estudios">Avalian</MenuItem>
          </TextField>

          <Button variant="contained" color="primary" type="submit">
            Reservar turno
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default FormularioReservas;
