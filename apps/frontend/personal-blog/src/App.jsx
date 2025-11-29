//import { useState } from "react";
import "./App.css";
import SignupForm from "./components/SignupForm";
import HomePage from "./HomePage";

function App() {
  //const [count, setCount] = useState(0);

  return (
    <div className="flex h-screen">
      <HomePage></HomePage>
      {/* <SignupForm></SignupForm> */}
    </div>
  );
}

export default App;
