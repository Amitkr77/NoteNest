import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WorkPage from "./pages/workPage";
import Login from "./components/Login";
import SignUp from "./components/SingUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/SignUp" element={<SignUp/>} />
        <Route path="/WorkPage" element={<WorkPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
