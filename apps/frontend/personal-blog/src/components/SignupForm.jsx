import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import x from "../assets/x-small.svg";
import { motion } from "framer-motion";
import { SquareLoader } from "react-spinners";

function SignupForm({ mode, setShow }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { logIn, signUp } = useAuth();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await logIn(username, password);
      setShow(false);
      setUsername("");
      setPassword("");
      setError(null);
      setShow((prev) => !prev);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  async function handleSignup(e) {
    e.preventDefault();
    try {
      await signUp(username, password);
      setShow(false);
      setUsername("");
      setPassword("");
      setError(null);
      setShow((prev) => !prev);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <motion.form
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.15 }}
        className="relative flex w-full flex-col rounded-xl bg-purple-50/65 p-6"
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
          onClick={mode === "signup" ? handleSignup : handleLogin}
          className="w-full bg-black px-2 py-1 text-white"
        >
          {!loading ? (
            mode === "signup" ? (
              "Sign up"
            ) : (
              "Log in"
            )
          ) : (
            <SquareLoader size={"12px"} color="#FFFFFF" />
          )}
        </button>
        <button
          className="absolute top-0.5 right-1 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            setShow((prev) => !prev);
          }}
        >
          <img src={x} alt="close form" />
        </button>
      </motion.form>
    </>
  );
}

export default SignupForm;
