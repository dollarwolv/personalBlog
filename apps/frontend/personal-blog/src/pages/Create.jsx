import Navbar from "../components/Navbar";
import plus from "../assets/plus.svg";
import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Create() {
  const [mainBody, setmainBody] = useState("");
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [summary, setSummary] = useState("");
  const [id, setId] = useState(0);

  const [lastSaved, setLastSaved] = useState({});

  const { token } = useAuth();

  function anyNonEmptyString(obj) {
    return Object.values(obj).some(
      (v) => typeof v === "string" && v.trim().length > 0,
    );
  }

  function handlePost() {
    fetch("http://localhost:3001/posts/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        text: mainBody,
        topic: topic,
        summary: summary,
      }),
    }).then((res) => console.log(res));
    setmainBody("");
    setTitle("");
  }

  async function handleDraft(redirect) {
    const res = await fetch("http://localhost:3001/posts/new-draft", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        text: mainBody,
        topic: topic,
        summary: summary,
      }),
    });
    const data = await res.json();
    const post = data.post;
    setId(post.id);
  }

  // updates draft
  async function handleUpdateDraft() {
    try {
      const res = await fetch(`http://localhost:3001/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          text: mainBody,
          topic: topic,
          summary: summary,
        }),
      });

      if (!res.ok) {
        throw new Error("Something went wrong updating the draft.");
      }

      console.log("draft saved");
    } catch (error) {
      console.error(error);
    }
  }

  // checks for pressing cmd+s
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();

        const current = { title, text: mainBody, topic, summary };

        // if lastSaved is empty and there is something to save
        if (Object.keys(lastSaved).length === 0 && anyNonEmptyString(current)) {
          handleDraft(false);
          setLastSaved(current);
        } else if (
          // if lastSaved is not empty and there have been changes, update draft
          Object.keys(lastSaved).length !== 0 &&
          JSON.stringify(lastSaved) !== JSON.stringify(current)
        ) {
          handleUpdateDraft();
          setLastSaved(current);
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [title, mainBody, topic, summary, lastSaved]);

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
          className="mt-8 mb-2 h-12 w-full text-4xl text-black placeholder:text-4xl"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        {/* Summary */}
        <textarea
          type="text"
          placeholder="Write your summary"
          className="mt-0 mb-4 h-32 w-full text-2xl text-black placeholder:text-2xl"
          value={summary}
          onChange={(e) => {
            setSummary(e.target.value);
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

        {/* Topic  */}
        <input
          type="text"
          placeholder="topic"
          className="mt-8 mb-4 h-8 w-auto rounded border border-dotted p-1 text-xl leading-[84%] font-light tracking-tighter whitespace-nowrap text-black uppercase placeholder:text-xl"
          value={topic}
          onChange={(e) => {
            setTopic(e.target.value);
          }}
        />

        {/* Save/submit buttons  */}
        <div className="mt-4 flex flex-col gap-1">
          <Link
            to={"/drafts"}
            onClick={() => handleDraft(true)}
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
