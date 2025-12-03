import Navbar from "../components/Navbar";
import plus from "../assets/plus.svg";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Create() {
  const [mainBody, setmainBody] = useState("");
  const [title, setTitle] = useState("");

  const { token } = useAuth();

  function handlePost() {
    fetch("http://localhost:3001/posts/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: title, text: mainBody }),
    }).then((res) => console.log(res));
    setmainBody("");
    setTitle("");
  }

  function handleDraft() {
    fetch("http://localhost:3001/posts/new-draft", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: title, text: mainBody }),
    }).then((res) => console.log(res));
    setmainBody("");
    setTitle("");
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="p-3">
        <div className="mt-16 grid grid-cols-9">
          <img src={plus} alt="plus" className="col-start-1 col-end-2 h-2.5" />
          <img src={plus} alt="plus" className="col-start-7 col-end-8 h-2.5" />
          <img src={plus} alt="plus" className="col-start-9 col-end-10 h-2.5" />
          <img
            src={plus}
            alt="plus"
            className="col-start-10 col-end-11 h-2.5"
          />
        </div>
        <section className="font-main relative pl-1.5 text-[calc(100px+((170-100)*(100vw-960px)/(1728-960)))] leading-[84%] tracking-tighter">
          Create a new post
        </section>
        <section className="font-main px-2.5 pt-8 text-[calc(13.296px+1.71898vw)] leading-[84%] tracking-tighter">
          Write about something cool.
        </section>
        <div className="mt-2 grid grid-cols-9">
          <img src={plus} alt="plus" className="col-start-1 col-end-2 h-2.5" />
          <img src={plus} alt="plus" className="col-start-7 col-end-8 h-2.5" />
          <img src={plus} alt="plus" className="col-start-9 col-end-10 h-2.5" />
          <img
            src={plus}
            alt="plus"
            className="col-start-10 col-end-11 h-2.5"
          />
        </div>

        {/* Title */}
        <input
          type="text"
          placeholder="Choose a Title"
          className="mt-8 mb-4 h-12 text-4xl text-black placeholder:text-4xl"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        {/* Text editor  */}
        <section>
          <MDEditor value={mainBody} onChange={setmainBody} />
          <MDEditor.Markdown
            source={mainBody}
            style={{ whiteSpace: "pre-wrap" }}
          />
        </section>

        {/* Save/submit buttons  */}
        <div className="mt-4 flex flex-col gap-1">
          <Link
            to={"/drafts"}
            onClick={handleDraft}
            className="w-full rounded-md bg-black/10 p-2 text-center"
            type="button"
          >
            Save as a draft
          </Link>
          <Link
            to={"/"}
            onClick={handlePost}
            className="w-full rounded-md bg-black/90 p-2 text-center text-white"
            type="button"
          >
            Publish directly
          </Link>
        </div>
      </div>
    </>
  );
}

export default Create;
