import HomePage from "./pages/HomePage";
import Drafts from "./pages/Drafts";
import Create from "./pages/Create";
import Article from "./pages/Article";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Edit from "./pages/Edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/create" element={<Create />}></Route>
        <Route path="/drafts" element={<Drafts />}></Route>
        <Route path="/edit/:id" element={<Edit />}></Route>
        <Route path="/article/:id" element={<Article />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
