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
        className="m-auto flex w-120 flex-col gap-6 rounded-lg border border-gray-600 bg-gray-800 p-8 text-white"
      >
        <div className="flex flex-col gap-2 ">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="johnpork69"
            className="rounded-md border border-gray-600 bg-gray-700 p-2 text-white"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            className="rounded-md bg-gray-700 p-2 text-white"
          />
        </div>

        <button type="submit" className="rounded-md bg-blue-600 p-2">
          Sign up
        </button>
      </form>
    </>
  );
}

export default SignupForm;
