import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/Header";
import Subheader from "./components/Subheader";
import Table from "./components/Table";
import Button from "./components/Button";
import Container from "@mui/material/Container";
function App() {
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/patients")
      .then((response) => {
        setPatients(response.data.members);
      })
      .catch((error) => {
        console.log(console.error(error));
      });
  }, []);
  return (
    <div>
      {/* <Header />
      <Subheader />
      <Container>
        <Table />
        <Button text="Add Entry" />
        <Button text="Delete Entry" />
      </Container> */}

      <ul>
        {patients.map(patient => (
          <li key={patient.email}>
            <p>Name: {patient.fname} {patient.lname}</p>
            <p>Age: {patient.age}</p>
            <p>Email: {patient.email}</p>
            <p>Location: {patient.city}, {patient.state}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
