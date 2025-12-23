import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";
import SignupForm from "./SignupForm";
import Comment from "./Comment";
import { apiPath } from "../utils/api";

function CommentSection({ postid }) {
  const [writeClicked, setWriteClicked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const { token, user } = useAuth();

  async function getComments() {
    const res = await fetch(apiPath(`/posts/${postid}/comments`), {
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
    const res = await fetch(apiPath(`/posts/${postid}/comments`), {
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
      <form
        className="mt-3 mb-2 flex flex-col"
        onSubmit={async (e) => {
          e.preventDefault();
          await postComment();
          await getComments();
        }}
      >
        {user ? (
          <input
            type="text"
            placeholder="Write a comment..."
            className="h-8 w-full border-b-[0.5px] text-black transition-all focus:border-b-2 focus:border-b-black focus:outline-none"
            onClick={() => setWriteClicked(true)}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        ) : (
          <div className="relative flex flex-col">
            <div className="flex gap-1 font-light tracking-tighter">
              <button
                className="cursor-pointer font-bold"
                onClick={() => setShowLogin((prev) => !prev)}
              >
                Log in
              </button>
              <span>or</span>
              <button
                className="cursor-pointer font-bold"
                onClick={() => setShowSignup((prev) => !prev)}
              >
                sign up
              </button>
              <span>to write a comment.</span>
            </div>
            {/* login form  */}
            <AnimatePresence>
              {showLogin && (
                <SignupForm mode={"login"} setShow={setShowLogin} />
              )}
              {showSignup && (
                <SignupForm mode={"signup"} setShow={setShowSignup} />
              )}
            </AnimatePresence>
          </div>
        )}

        {writeClicked && (
          <div className="mt-2 flex gap-1.5 self-end">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setWriteClicked(false);
                setComment("");
              }}
              className="inline-block justify-self-start rounded border border-dotted px-1.5 py-1 leading-[84%] font-light tracking-tighter whitespace-nowrap uppercase"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="inline-block justify-self-start rounded bg-black px-1.5 py-1 leading-[84%] tracking-tighter whitespace-nowrap text-white uppercase"
            >
              Post comment
            </button>
          </div>
        )}
      </form>
      <div className="mt-4 flex flex-col">
        {comments.map((comment) => {
          return (
            <Comment
              comment={comment}
              key={comment.id}
              F
              postid={postid}
              getComments={getComments}
            />
          );
        })}
      </div>
    </section>
  );
}

export default CommentSection;
