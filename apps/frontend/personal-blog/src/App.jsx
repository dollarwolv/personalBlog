import HomePage from "./pages/HomePage";
import Create from "./pages/Create";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/create" element={<Create />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
