import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AllRoutes from "./routes/AllRoutes";
import { Box } from "@chakra-ui/react";
import Status from "./components/Status";

function App() {
  return (
    <Box className="App">
      <Status />
      <Navbar />
      <AllRoutes />
      <Footer />
    </Box>
  );
}

export default App;
