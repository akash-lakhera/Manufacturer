import {
  Box,
  Container,
  Grid,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Modal from "./Modal";
function Transportdash() {
  const [msgs, setMsgs] = useState("");
  const [current, setCurrent] = useState("");
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const messageHandler = (e) => {
    msgs.forEach((element) => {
      if (e.target.id == element.orderID) {
        setCurrent(element);
      }
      setShow(true);
    });
  };
  let b = ["orderID", "quantity", "manufacturer"];
  let mess = "";
  let orders = "";
  if (msgs) {
    orders = msgs.map((elem) => {
      return (
        <MenuItem key={elem.orderID} value={elem.orderID + elem.manufacturer}>
          {elem.orderID}
        </MenuItem>
      );
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const formval = {
      orderID: data.get("orderID").substring(0, 6),
      manufacturer: data.get("orderID").substring(6),
      price: data.get("price"),
    };

    fetch("/api/toManu", {
      body: JSON.stringify(formval),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {});
  };
  const filter = (e) => {
    setSearch(e.target.value);
  };
  const logoutHandler = () => {
    fetch("logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }).then(window.location.replace("/login"));
  };
  useEffect(() => {
    fetch("/api/messages")
      .then((res) => (res.status == 200 ? res.json() : ""))
      .then((js) => setMsgs(js.messages));

    return () => {};
  }, []);

  return (
    <>
    <Box display={"flex"} justifyContent={"right"} padding={"10px"}>
            <Button onClick={logoutHandler}>Logout</Button>
      </Box>
    <Box
      maxWidth={"1200px"}
      sx={{margin:"auto", display: "flex", alignItems: "center", flexWrap: "wrap",gap:"20px",justifyContent:"center" }}
      minHeight={"90vh"}
      >
      <Container component="main" maxWidth="xs">
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="orderID">Order ID</InputLabel>
                <Select
                  label="orderID"
                  defaultValue={""}
                  name="orderID"
                  labelId="orderID"
                  required
                  >
                  {orders}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <TextField required fullWidth label="Price" name="price" />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            >
            Reply
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item></Grid>
          </Grid>
        </Box>
      </Container>
      <Container component="main" maxWidth="xs" sx={{ marginTop: "20px" }}>
        <Box
          maxHeight={"400px"}
          minHeight={"400px"}
          sx={{
            backgroundColor: "rgb(250, 250, 254)",
            borderRadius: "5px",
            paddingTop: "10px",
          }}
          >
          <Modal show={show} current={current} setShow={setShow}></Modal>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              paddingInline: "5px",
              justifyContent: "space-between",
            }}
            >
            <Typography component="h1" variant="h5">
              Messages
            </Typography>
            <TextField
              name="search"
              onChange={filter}
              value={search}
              id="search"
              label="Search"
              placeholder="Search"
              autoFocus
              />
          </Box>
          <ul>
            {msgs.length
              ? msgs
              .filter((elem) => {
                if (!search) return true;
                else {
                  let filt = false;
                  b.forEach((el) => {
                    if (new String(elem[el]).indexOf(search) != -1)
                    filt = true;
                  });
                      return filt;
                    }
                  })
                  .map((elem) => {
                    return (
                      <li
                      onClick={messageHandler}
                      key={elem.orderID}
                      id={elem.orderID}
                      className="msgs-list"
                      style={{
                        lineHeight: "40px",
                        paddingInline: "10px",
                        textAlign: "left",
                        marginBottom: "10px",
                        height: "40px",
                      }}
                      >
                        {elem.orderID}
                      </li>
                    );
                  })
                  : ""}
          </ul>
        </Box>
      </Container>
    </Box>
                  </>
  );
}
export default Transportdash;
