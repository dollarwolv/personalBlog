import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import userIcon from "../assets/usericon.svg";
import trash from "../assets/trash.svg";
import edit from "../assets/edit.svg";
import { apiPath } from "../utils/api";
import { SquareLoader } from "react-spinners";
import { userIcons } from "../utils/userIcons";

function Comment({ comment, getComments, postid }) {
  const [commentBeingEdited, setCommentBeingEdited] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);

  const { token, user } = useAuth();

  function parseDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${year}.${month + 1}.${day}`;
  }

  async function handleDeleteComment(commentId) {
    if (confirm("Are you sure you want to delete this comment?")) {
      setLoading(true);
      const res = await fetch(
        apiPath(`/posts/${postid}/comments/${commentId}`),
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!res.ok) {
        throw new Error("Could not delete comment.");
      }
      getComments();
      setLoading(false);
    }
  }

  async function handleEditComment(commentId) {
    setLoading(true);
    const res = await fetch(apiPath(`/posts/${postid}/comments/${commentId}`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text: commentText,
      }),
    });
    if (!res.ok) {
      throw new Error("Could not post comment.");
    }
    setCommentBeingEdited(false);
    setLoading(false);
    getComments();
  }

  function hashUserIdToIndex(username, modulo) {
    if (!username || !modulo) return 0;
    let hash = 0;

    for (let i = 0; i < username.length; i++) {
      hash = (hash * 31 + username.charCodeAt(i)) >>> 0;
    }

    return hash % modulo;
  }

  useEffect(() => {
    setCommentText(comment.text);
  }, []);

  return (
    <div className="flex gap-2 border-t-[0.5px]">
      <img
        src={
          userIcons[
            hashUserIdToIndex(comment.author.username, userIcons.length)
          ]
        }
        alt=""
        className="mt-4 self-start"
      />
      <div className="mx-1 my-3 mr-auto flex grow flex-col">
        <div className="mr-auto flex grow flex-row items-center gap-2">
          <span className="font-medium">@{comment.author.username}</span>
          <span className="text-xs font-light">
            {parseDate(comment.createdAt)}
          </span>
        </div>
        {commentBeingEdited ? (
          <form
            className="flex flex-col"
            onSubmit={(e) => {
              e.preventDefault();
              handleEditComment(comment.id);
            }}
          >
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full rounded border-b-[0.5] border-dotted bg-gray-300/30 p-1"
            />
            <div className="mt-1 flex gap-2 self-end">
              {!loading && (
                <button
                  type="button"
                  className="rounded border border-dotted px-1.5 py-1 leading-[84%] font-light tracking-tighter whitespace-nowrap uppercase"
                  onClick={() => {
                    setCommentBeingEdited(false);
                    setCommentText(comment.text);
                  }}
                >
                  Cancel
                </button>
              )}

              <button
                type="submit"
                className="rounded bg-black px-1.5 py-1 leading-[84%] tracking-tighter whitespace-nowrap text-white uppercase"
              >
                {!loading ? (
                  "Submit"
                ) : (
                  <SquareLoader size={"12px"} color="#FFFFFF" />
                )}
              </button>
            </div>
          </form>
        ) : (
          <span className="">
            {!loading ? (
              comment.text
            ) : (
              <SquareLoader size={"12px"} className="mx-auto" />
            )}
          </span>
        )}
      </div>
      {(user?.role === "ADMIN" || comment.authorId === user?.id) &&
        !commentBeingEdited && (
          <div className="col-start-17 col-end-18 my-auto flex">
            {comment.authorId === user?.id && (
              <button
                onClick={() => {
                  setCommentBeingEdited(true);
                }}
                className="w-8"
              >
                <img src={edit} alt="edit comment" />
              </button>
            )}

            <button
              className="w-8"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDeleteComment(comment.id);
              }}
            >
              <img src={trash} alt="delete comment" />
            </button>
          </div>
        )}
    </div>
  );
}

export default Comment;
