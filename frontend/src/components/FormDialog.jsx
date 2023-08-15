import * as React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [age, setAge] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState("");
  const [city, setCity] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const cancel = () => {
    clearForm();
    setOpen(false);
  };

  const addToDatabase = () => {
    const data = {
      fname,
      lname,
      age,
      email,
      state,
      city,
    };
    if (
      fname === "" ||
      lname === "" ||
      age === "" ||
      email === "" ||
      state === "" ||
      city === ""
    ) {
      alert("Please fill all the fields");
      return;
    }

    axios
      .post("http://127.0.0.1:3000/add", data, {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((res) => {
        props.setStatusCode(res.status);
      })
      .catch(function (error) {
        console.log(error);
      });
    clearForm();
    setOpen(false);
  };

  const clearForm = () => {
    setFname("");
    setLname("");
    setAge("");
    setEmail("");
    setState("");
    setCity("");
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        {props.text}
      </Button>
      <Dialog open={open} onClose={cancel}>
        <DialogTitle>Add new customer entry</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="fname"
            label="First Name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            fullWidth
            variant="standard"
            
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Last Name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            fullWidth
            variant="standard"
            
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            fullWidth
            variant="standard"
            
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            variant="standard"
            
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            fullWidth
            variant="standard"
            
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            fullWidth
            variant="standard"
            
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={cancel}>Cancel</Button>
          <Button onClick={addToDatabase}>Add to database</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
