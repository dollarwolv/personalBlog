import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import userIcon from "../assets/userIcon.svg";
import trash from "../assets/trash.svg";
import edit from "../assets/edit.svg";

// TODO: Finish editing comment function.
// Current progress: Can delete, can click edit, but no save button, and input is
// not wide enough, and it's not immediately clear that it worked.
function Comment({ comment, getComments, postid }) {
  const [commentBeingEdited, setCommentBeingEdited] = useState(false);
  const [commentText, setCommentText] = useState("");

  const { token, user } = useAuth();

  function parseDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${year}.${month + 1}.${day}`;
  }

  async function handleDeleteComment(commentId) {
    const res = await fetch(
      `http://localhost:3001/posts/${postid}/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (!res.ok) {
      throw new Error("Could not post comment.");
    }
    getComments();
  }

  async function handleEditComment(commentId) {
    const res = await fetch(
      `http://localhost:3001/posts/${postid}/comments/${commentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          text: comment,
        }),
      },
    );
    if (!res.ok) {
      throw new Error("Could not post comment.");
    }
    getComments();
  }

  useEffect(() => {
    setCommentText(comment.text);
  }, []);

  return (
    <div className="flex gap-2 border-t-[0.5px]">
      <img src={userIcon} alt="" className="mt-4 self-start" />
      <div className="mx-1 my-3 flex flex-col">
        <div className="flex w-full flex-row items-center gap-2">
          <span className="font-medium">@{comment.author.username}</span>
          <span className="text-xs font-light">
            {parseDate(comment.createdAt)}
          </span>
        </div>
        {commentBeingEdited ? (
          <input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="w-full"
          ></input>
        ) : (
          <span className="">{comment.text}</span>
        )}
      </div>
      {(user?.role === "ADMIN" || comment.authorId === user?.id) && (
        <div className="col-start-17 col-end-18 my-auto ml-auto flex">
          {comment.authorId === user?.id && (
            <button
              onClick={() => {
                setCommentBeingEdited(true);
                handleEditComment(comment.id);
              }}
              className="w-8"
            >
              <img src={edit} alt="edit post" />
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
            <img src={trash} alt="delete post" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Comment;
