import Navbar from "../components/Navbar";
import plus from "../assets/plus.svg";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  const [mainBody, setmainBody] = useState("");
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [summary, setSummary] = useState("");
  const [published, setPublished] = useState(false);
  const [lastSaved, setLastSaved] = useState({});

  // check if any string in an object is not empty
  function anyNonEmptyString(obj) {
    return Object.values(obj).some(
      (v) => typeof v === "string" && v.trim().length > 0,
    );
  }

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
    setPublished(data.post.published);
    setTopic(data.post.topic);
    setSummary(data.post.summary);
  }

  // on launch and anytime id changes, get the post
  useEffect(() => {
    getPost();
  }, [id]);

  // checks for pressing cmd+s and saves post
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();

        const current = { title, text: mainBody, topic, summary };
        handleDraft(false);
        setLastSaved(current);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [title, mainBody, topic, summary, lastSaved]);

  // updates draft
  async function handleDraft(redirect) {
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
          ...(published && { publish: false }),
        }),
      });
      if (!res.ok) {
        throw new Error("Something went wrong updating the draft.");
      }
    } catch (error) {
      console.error(error);
    }

    if (redirect) {
      setmainBody("");
      setTitle("");
      navigate("/drafts");
    }
  }

  // posts directly
  async function handlePost() {
    try {
      await fetch(`http://localhost:3001/posts/${id}/`, {
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
          publish: true,
        }),
      });
      setmainBody("");
      setTitle("");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="p-3">
      <Navbar />
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
        {!published && (
          <>
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
          </>
        )}
        {published && (
          <>
            <button
              onClick={handleDraft}
              className="w-full rounded-md bg-black/10 p-2"
            >
              Unpublish and save changes
            </button>
            <button
              onClick={handlePost}
              className="w-full rounded-md bg-black/90 p-2 text-white"
              type="button"
            >
              Edit published version
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Edit;
