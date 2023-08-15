import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import axios from "axios";

export default function BasicTable(props) {
  const rows = props.data;

  const handleDelete = (key) => {
    console.log(key);
    axios
      .delete("http://127.0.0.1:3000/delete", {
        data: {key},
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((res) => {
        props.setStatusCode(res.status);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>State</TableCell>
            <TableCell>City</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => {
            const key = row[0];
            const { fname, lname, age, email, state, city } = row[1];
            return (
              <TableRow
                key={key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{fname}</TableCell>
                <TableCell>{lname}</TableCell>
                <TableCell>{age}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{state}</TableCell>
                <TableCell>{city}</TableCell>
                <TableCell>
                  <Button variant="contained" onClick={() => handleDelete(key)}>
                    {" "}
                    Delete{" "}
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
