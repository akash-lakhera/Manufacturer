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
import ModalM from "./ModalM";
import { useEffect, useState } from "react";

function Manudash(props) {
  const [transporters, setTransporters] = useState("");
  const [msgs, setMsgs] = useState("");
  const [random, setRandom] = useState("");
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
  let trans = "";
  let b = ["orderID", "price"];
  if (transporters) {
    trans = transporters.map((elem) => {
      return (
        <MenuItem key={elem.username} value={elem.username}>
          {elem.username}
        </MenuItem>
      );
    });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const formval = {
      orderID: data.get("orderID"),
      transporter: data.get("transporter"),
      quantity: data.get("quantity"),
      manufacturer: props.user.username,
    };
    fetch("/api/toTrans", {
      body: JSON.stringify(formval),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        return fetch("/api/random");
      })
      .then((res) => {
        return res.json();
      })
      .then((str) => setRandom(str));
  };
  let mess = "";
  if (msgs) {
    mess = msgs.map((elem) => {
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
    });
  }
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
  const filter = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    fetch("/api/transporters")
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        } else return "";
      })
      .then((js) => {
        setTransporters(js);
      });
    fetch("/api/random")
      .then((response) => response.json())
      .then((js) => setRandom(js));

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
              <Grid item xs={12}>
                <TextField
                  name="orderID"
                  required
                  fullWidth
                  id="orderID"
                  label="Order ID"
                  value={random}
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  disabled
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  value={props.user.address}
                  name="address"
                  autoComplete="address"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="quantity">Quantity</InputLabel>

                  <Select
                    required
                    label="quantity"
                    defaultValue={""}
                    name="quantity"
                    labelId="quantity"
                  >
                    <MenuItem value={"1 Ton"}>1 Ton</MenuItem>
                    <MenuItem value={"2 Ton"}>2 Ton</MenuItem>
                    <MenuItem value={"3 Ton"}>3 Ton</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="transporter">Transporters</InputLabel>

                  <Select
                    required
                    label="transporter"
                    defaultValue={""}
                    name="transporter"
                    labelId="transporter"
                  >
                    {trans}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item></Grid>
            </Grid>
          </Box>
        </Container>
        <Container component="main" maxWidth="xs" sx={{ marginTop: "20px" }}>
          <Box
            border={"solid 1px"}
            maxHeight={"400px"}
            minHeight={"400px"}
            sx={{
              backgroundColor: "rgb(250, 250, 254)",
              borderRadius: "5px",
              paddingTop: "10px",
            }}
          >
            <ModalM show={show} current={current} setShow={setShow}></ModalM>
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
export default Manudash;
