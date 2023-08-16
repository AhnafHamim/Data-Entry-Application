import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/Header";
import Subheader from "./components/Subheader";
import Table from "./components/Table";
import FormDialog from "./components/FormDialog";
import Container from "@mui/material/Container";

function App() {
  const [database, setDatabase] = useState([]);
  const [statusCode, setStatusCode] = useState("");
  useEffect(() => {
    axios
      .get("https://ahnafhamim.pythonanywhere.com/database")
      .then((response) => {
        console.log(Object.entries(response.data));
        setDatabase(Object.entries(response.data));
      })
      .catch((error) => {
        console.log(console.error(error));
      });
    setStatusCode("");
  }, [statusCode]);
  return (
    <div>
      <Header />
      <Subheader />
      <Container>
        <Table data={database} setStatusCode={setStatusCode} />
        <FormDialog text="Add Entry" setStatusCode={setStatusCode} />
      </Container>
    </div>
  );
}
export default App;
