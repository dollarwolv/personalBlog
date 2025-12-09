import { useEffect, useState } from "react";

function CommentSection({ postid }) {
  const [writeClicked, setWriteClicked] = useState(false);
  const [comment, setComment] = useState("");

  const [comments, setComments] = useState([]);

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
            <button className="inline-block justify-self-start rounded bg-black px-1.5 py-1 leading-[84%] tracking-tighter whitespace-nowrap text-white uppercase">
              Post comment
            </button>
          </div>
        )}
      </div>
      <div>
        <button
          onClick={() => {
            console.log(comments);
          }}
        >
          get comments
        </button>
      </div>
    </section>
  );
}

export default CommentSection;
