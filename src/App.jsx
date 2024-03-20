
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
const App = () => {
  return (
    <>
    
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
    </>
  );
};

export default App;


/*
<Navbar/>
    <Home/>
    <Informacion></Informacion>
*/