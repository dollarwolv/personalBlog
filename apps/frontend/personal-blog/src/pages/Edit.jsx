import Navbar from "../components/Navbar";
import plus from "../assets/plus.svg";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  const [mainBody, setmainBody] = useState("");
  const [title, setTitle] = useState("");

  // allows me to navigate to homepage after submitting draft
  const navigate = useNavigate();

  // get id from params
  const { id } = useParams();

  // uses my custom useAuth hook to get the token
  const { token } = useAuth();

  // retrieves the post with the id and sets mainBody and title
  async function getPost() {
    const res = await fetch(`http://localhost:3001/posts/${id}`, {
      method: "GET",
    });
    const data = await res.json();
    console.log(data);
    setTitle(data.post.title);
    setmainBody(data.post.text);
  }

  // on launch and anytime id changes, get the post
  useEffect(() => {
    getPost();
  }, [id]);

  // saves to draft
  function handleDraft() {
    fetch(`http://localhost:3001/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: title, text: mainBody }),
    }).then((res) => console.log(res));
    setmainBody("");
    setTitle("");
    navigate("/drafts");
  }

  // posts directly
  function handlePost() {
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
    navigate("/");
  }

  return (
    <div className="p-3">
      <Navbar></Navbar>
      <div className="mt-16 grid grid-cols-9">
        <img src={plus} alt="plus" className="col-start-1 col-end-2 h-2.5" />
        <img src={plus} alt="plus" className="col-start-7 col-end-8 h-2.5" />
        <img src={plus} alt="plus" className="col-start-9 col-end-10 h-2.5" />
        <img src={plus} alt="plus" className="col-start-10 col-end-11 h-2.5" />
      </div>
      <section className="font-main relative pl-1.5 text-[calc(100px+((170-100)*(100vw-960px)/(1728-960)))] leading-[84%] tracking-tighter">
        Edit your post
      </section>
      <section className="font-main px-2.5 pt-8 text-[calc(13.296px+1.71898vw)] leading-[84%] tracking-tighter">
        Finish it up.
      </section>
      <div className="mt-2 grid grid-cols-9">
        <img src={plus} alt="plus" className="col-start-1 col-end-2 h-2.5" />
        <img src={plus} alt="plus" className="col-start-7 col-end-8 h-2.5" />
        <img src={plus} alt="plus" className="col-start-9 col-end-10 h-2.5" />
        <img src={plus} alt="plus" className="col-start-10 col-end-11 h-2.5" />
      </div>

      {/* Title */}
      <input
        type="text"
        placeholder="Choose a Title"
        className="mt-8 mb-4 h-12 w-full text-4xl text-black placeholder:text-4xl"
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
        <button
          onClick={handleDraft}
          className="w-full rounded-md bg-black/10 p-2"
        >
          Save as a draft
        </button>
        <button
          onClick={handlePost}
          className="w-full rounded-md bg-black/90 p-2 text-white"
          type="button"
        >
          Publish directly
        </button>
      </div>
    </div>
  );
}

export default Edit;
