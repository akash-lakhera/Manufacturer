import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignUp() {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const formval = {
      username: data.get("username"),
      password: data.get("password"),
      type: data.get("type"),
      address: data.get("address"),
    };
    fetch("/api/register", {
      body: JSON.stringify(formval),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      navigate("/login");
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,

          alignItems: "center",
        }}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box minWidth={120}>
              <FormControl fullWidth>
                <InputLabel id="user-type">User Type</InputLabel>

                <Select
                  label="User Type"
                  defaultValue={""}
                  required
                  name="type"
                  labelId="User Type"
                >
                  <MenuItem value={"Manufacturer"}>Manufacturer</MenuItem>
                  <MenuItem value={"Transporter"}>Transporter</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="username"
                required
                fullWidth
                id="name"
                label="Username"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <RouterLink to="/login" variant="body2">
                Already have an account? Sign in
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
