import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import userIcon from "../assets/userIcon.svg";

function CommentSection({ postid }) {
  const [writeClicked, setWriteClicked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const { token, user } = useAuth();

  function parseDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${year}.${month + 1}.${day}`;
  }

  async function getComments() {
    const res = await fetch(`http://localhost:3001/posts/${postid}/comments`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Could not get comments.");
    }
    const data = await res.json();
    const com = data.comments;
    setComments(com);
  }

  async function postComment() {
    const res = await fetch(`http://localhost:3001/posts/${postid}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text: comment,
      }),
    });
    if (!res.ok) {
      throw new Error("Could not post comment.");
    }

    setComment("");
    setWriteClicked(false);
  }

  useEffect(() => {
    getComments();
  }, []);

  return (
    <section className="col-start-8 col-end-25 mt-24 pr-4">
      <span className="flex w-full flex-row border-b-[0.5px] py-1.5 text-[12px] font-light tracking-tighter">
        / COMMENTS
      </span>
      <div className="mt-3 mb-2 flex flex-col">
        <input
          type="text"
          placeholder="Write a comment..."
          className="h-8 w-full border-b-[0.5px] text-black transition-all focus:border-b-2 focus:border-b-black focus:outline-none"
          onClick={() => setWriteClicked(true)}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {writeClicked && (
          <div className="mt-2 flex gap-1.5 self-end">
            <button
              onClick={() => {
                setWriteClicked(false);
                setComment("");
              }}
              className="inline-block justify-self-start rounded border border-dotted px-1.5 py-1 leading-[84%] font-light tracking-tighter whitespace-nowrap uppercase"
            >
              CANCEL
            </button>
            <button
              onClick={async () => {
                await postComment();
                await getComments();
              }}
              className="inline-block justify-self-start rounded bg-black px-1.5 py-1 leading-[84%] tracking-tighter whitespace-nowrap text-white uppercase"
            >
              Post comment
            </button>
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-col">
        {comments.map((comment) => {
          return (
            <div key={comment.id} className="flex gap-2 border-t-[0.5px]">
              <img src={userIcon} alt="" className="mt-4 self-start" />
              <div className="mx-1 my-3 flex flex-col">
                <div className="flex flex-row items-center gap-2">
                  <span className="font-medium">
                    @{comment.author.username}
                  </span>
                  <span className="text-xs font-light">
                    {parseDate(comment.createdAt)}
                  </span>
                </div>
                <span className="">{comment.text}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CommentSection;
