import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { token } = useAuth();

  async function makeAdmin() {
    try {
      const res = await fetch("http://localhost:3001/admin", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password: password }),
      });
      if (!res.ok) {
        const message = await res.text();
        throw new Error(message || "Failed to become admin");
      }
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <>
      <form
        action="submit"
        className="flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          makeAdmin();
        }}
      >
        <p>type in ur fuckin password mate</p>
        <input
          type="text"
          placeholder="admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-black/50"
        />
        <button className="rounded bg-red-400">become admin</button>
      </form>

      <div>{error}</div>
    </>
  );
}

export default Admin;
