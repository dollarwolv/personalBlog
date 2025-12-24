import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { SquareLoader } from "react-spinners";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import homeIcon from "../assets/homeicon.svg";

function Navbar() {
  const { user, logIn, logOut, token, signUp } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await logIn(username, password);
      setShowLogin(false);
      setUsername("");
      setPassword("");
      setError(null);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  async function handleSignup(e) {
    e.preventDefault();
    try {
      await signUp(username, password);
      setShowLogin(false);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <nav className="fixed top-0 z-50 flex w-full gap-0.5 bg-transparent p-1.5">
      <Link
        to={"/"}
        className="flex items-center gap-1 bg-black/10 px-2 py-[5px] text-xs tracking-tighter backdrop-blur-md"
      >
        <img src={homeIcon} alt="" className="h-2.5" /> HOME
      </Link>
      <a className="bg-black/10 px-2 py-[5px] text-xs tracking-tighter backdrop-blur-md">
        [P] PERSONAL
      </a>
      <a className="bg-black/10 px-2 py-[5px] text-xs tracking-tighter backdrop-blur-md">
        [M] MEDIUM
      </a>

      {user?.role === "ADMIN" && (
        <Link
          to={"/create"}
          className="bg-black/10 px-2 py-[5px] text-xs tracking-tighter backdrop-blur-md"
        >
          [C] CREATE
        </Link>
      )}

      {user?.role === "ADMIN" && (
        <Link
          to={"/drafts"}
          className="bg-black/10 px-2 py-[5px] text-xs tracking-tighter backdrop-blur-md"
        >
          [D] DRAFTS
        </Link>
      )}

      {!user && (
        <button
          className="ml-auto bg-black/10 px-2 py-[5px] text-xs tracking-tighter backdrop-blur-md"
          onClick={() => setShowLogin(!showLogin)}
        >
          [L] LOGIN / SIGN UP
        </button>
      )}

      {user && (
        <button
          className="ml-auto bg-black/10 px-2 py-[5px] text-xs tracking-tighter backdrop-blur-md"
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
            {loading && <SquareLoader size={"12px"} className="mx-auto mb-2" />}
            {error && <p className="text-xs text-red-600">{error}</p>}
            <div className="flex flex-row gap-0.5">
              <button
                type="button"
                onClick={handleSignup}
                className="w-full bg-black/60 px-2 py-1 text-white"
              >
                Sign up
              </button>
              <button
                onClick={handleLogin}
                className="w-full bg-black px-2 py-1 text-white"
              >
                Log in
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
