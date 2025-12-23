import HomePage from "./pages/HomePage";
import Drafts from "./pages/Drafts";
import Create from "./pages/Create";
import Article from "./pages/Article";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Edit from "./pages/Edit";
import Admin from "./pages/Admin";
import PageTransitionOverlay from "./components/PageTransitionOverlay";

import { AnimatePresence, motion } from "framer-motion";

function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} style={{ position: "relative" }}>
        <PageTransitionOverlay />
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/create" element={<Create />}></Route>
          <Route path="/drafts" element={<Drafts />}></Route>
          <Route path="/edit/:id" element={<Edit />}></Route>
          <Route path="/article/:id" element={<Article />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
