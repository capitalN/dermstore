import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AllRoutes from "./routes/AllRoutes";
import { Box, Image } from "@chakra-ui/react";
import Status from "./components/Status";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, [pathname]);
  
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
