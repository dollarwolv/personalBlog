import { useState } from "react";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3001/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex max-w-60 flex-col rounded-md bg-gray-800 text-white"
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="johnpork69"
          className="text-white"
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
        />
        <button type="submit" className="">
          Sign up
        </button>
      </form>
    </>
  );
}

export default SignupForm;
