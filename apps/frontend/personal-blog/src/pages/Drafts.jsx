import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import square from "../assets/square.svg";
import { Link } from "react-router-dom";
import trash from "../assets/trash.svg";
import { useAuth } from "../context/AuthContext";
import { apiPath } from "../utils/api";

function Drafts() {
  const [drafts, setDrafts] = useState([]);
  const { token } = useAuth();

  async function getDrafts() {
    try {
      const res = await fetch(apiPath("/posts/drafts"));
      if (!res.ok) throw new Error("Failed to fetch drafts");

      const drafts = await res.json(); // decode JSON
      setDrafts(drafts);
      console.log(drafts);
    } catch (error) {
      console.error(error);
    }
  }

  // handles deleting a post.
  async function handleDelete(id) {
    try {
      if (confirm("Are you sure you want to delete this article?")) {
        const res = await fetch(apiPath(`/posts/${id}`), {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to delete draft");
        getDrafts();
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getDrafts();
  }, []);

  function parseDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${year}.${month + 1}.${day}`;
  }

  return (
    <div>
      <Navbar />
      <div className="mt-12 flex flex-col p-4">
        {drafts.map((draft) => {
          return (
            <Link
              to={`/edit/${draft.id}`}
              className="flex border-t py-2.5"
              key={draft.id}
            >
              <img src={square} alt="square" className="mx-2 my-auto h-2" />
              <div className="my-auto pr-4 text-[12px]">
                {parseDate(draft.createdAt)}
              </div>
              <div className="my-auto text-3xl">{draft.title}</div>
              <img
                src={trash}
                alt="delete post"
                className="my-auto ml-auto w-8"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDelete(draft.id);
                }}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Drafts;
