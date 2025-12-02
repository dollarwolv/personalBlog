import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { user, logIn, logOut } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await logIn(username, password);
      setShowLogin(false);
      setUsername("");
      setPassword("");
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="fixed top-0 flex w-full gap-0.5 p-3">
      <a className="bg-black/10 px-2 py-[5px] text-xs tracking-tighter">
        [B] BLOG
      </a>
      <a className="bg-black/10 px-2 py-[5px] text-xs tracking-tighter">
        [P] PERSONAL
      </a>
      <a className="bg-black/10 px-2 py-[5px] text-xs tracking-tighter">
        [M] MEDIUM
      </a>

      {user?.role === "ADMIN" && (
        <Link
          to={"/create"}
          className="bg-black/10 px-2 py-[5px] text-xs tracking-tighter"
        >
          [C] CREATE
        </Link>
      )}

      {!user && (
        <button
          className="ml-auto bg-black/10 px-2 py-[5px] text-xs tracking-tighter"
          onClick={() => setShowLogin(!showLogin)}
        >
          [L] LOGIN
        </button>
      )}

      {user && (
        <button
          className="ml-auto bg-black/10 px-2 py-[5px] text-xs tracking-tighter"
          onClick={() => logOut()}
        >
          [L] LOG OUT
        </button>
      )}

      {/* login form  */}
      <AnimatePresence>
        {showLogin && (
          <motion.form
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-12 right-3 flex flex-col bg-[#f2f6f7]"
          >
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mb-2 block border p-1"
            />
            <input
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="mb-2 block border p-1"
            />
            {error && <p className="text-xs text-red-600">{error}</p>}
            <button
              onClick={handleLogin}
              className="w-full bg-black px-2 py-1 text-white"
            >
              Log in
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;
