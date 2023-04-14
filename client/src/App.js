import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";

import Home from "./Pages/Home";
import View from "./Pages/View";
import Post from "./Pages/Post";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Debug from "./Pages/Debug";

import Navbar from "./Widgets/Navbar.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/view/:photoid" element={<View/>} />
          <Route path="/post" element={<Post/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/debug" element={<Debug/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
