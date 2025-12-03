import { Link } from "react-router-dom";
import square from "../assets/square.svg";
import trash from "../assets/trash.svg";
import edit from "../assets/edit.svg";
import Collapsible from "./Collapsible";
import { useState } from "react";

function PostButton({ post, user }) {
  //   const [opened, setOpened] = useState(false);

  function parseDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${year}.${month + 1}.${day}`;
  }
  async function handleDelete(id) {
    try {
      if (confirm("Are you sure you want to delete this article?")) {
        const res = await fetch(`http://localhost:3001/posts/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to delete post");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="grid grid-cols-17 border-t py-2.5">
        <div className="col-start-1 col-end-3 flex">
          <img src={square} alt="square" className="my-auto mr-2 ml-0 h-2" />
          <div className="my-auto pr-4 text-[12px]">
            {parseDate(post.createdAt)}
          </div>
        </div>

        <div className="col-start-3 col-end-10 my-auto text-3xl">
          {post.title}
        </div>

        {/* Edit and delete buttons  */}
        {user?.role === "ADMIN" && (
          <div className="col-start-17 col-end-18 my-auto flex">
            <Link to={`/edit/${post.id}`}>
              <img src={edit} alt="edit post" className="w-8" />
            </Link>
            <img
              src={trash}
              alt="delete post"
              className="w-8"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDelete(post.id);
              }}
            />
          </div>
        )}
      </div>
      <Collapsible
        summary={
          "Learn how to add stablecoin payments to your Stripe integration in under an hour. Accept USDC on Ethereum, Solana, Polygon, and Base with zero blockchain knowledge—just add 'crypto' to your existing payment methods."
        }
      />
    </>
  );
}

export default PostButton;
