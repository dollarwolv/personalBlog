import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import plus from "../assets/plus.svg";
import Tag from "../components/Tag";
import ReactMarkdown from "react-markdown";

function Article() {
  const [mainBody, setMainBody] = useState("");
  const [title, setTitle] = useState("");
  const [publishedAt, setPublishedAt] = useState("");

  const { id } = useParams();

  async function fetchPost() {
    try {
      const res = await fetch(`http://localhost:3001/posts/${id}`, {
        method: "GET",
      });
      const data = await res.json();
      const { title, text, publishedAt } = data.post;
      setTitle(title);
      setMainBody(text);
      setPublishedAt(publishedAt);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchPost(id);
  }, [id]);
  return (
    <>
      <Navbar />
      <div className="px-3">
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
        <section className="font-main relative max-w-9/10 pl-1.5 text-[calc(54px+((114-54)*(100vw-390px)/(1728-390)))] leading-[84%] tracking-tighter">
          {title}
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
        <section className="mt-14 grid grid-cols-24">
          {/* Metadata section  */}
          <div className="col-start-1 col-end-7">
            <span className="flex w-full flex-row border-b-[0.5px] py-1.5 text-[12px] font-light tracking-tighter">
              / METADATA
            </span>
            <div className="flex flex-col">
              <div className="grid grid-cols-2 border-b-[0.5px] border-dotted py-3 text-[12px] font-light tracking-tighter">
                <span>DATE:</span>
                <span>2025.11.25</span>
              </div>
              <div className="grid grid-cols-2 border-b-[0.5px] border-dotted py-3 text-[12px] font-light tracking-tighter">
                <span>AUTHOR:</span>
                <Tag className="" title={"JUSTIN DOTZLAW"}></Tag>
              </div>
              <div className="grid grid-cols-2 border-b-[0.5px] border-dotted py-3 text-[12px] font-light tracking-tighter">
                <span>READING TIME:</span>
                <span>6 MIN READ</span>
              </div>
              <div className="grid grid-cols-2 border-b-[0.5px] border-dotted py-3 text-[12px] font-light tracking-tighter">
                <span>CATEGORIES:</span>
                <Tag title={"CRYPTO"}></Tag>
              </div>
            </div>
          </div>

          {/* Article main body */}
          <div className="col-start-8 col-end-25">
            <span className="flex flex-col border-b-[0.5px] py-1.5 text-[12px] font-light tracking-tighter">
              / ARTICLE
            </span>
            <div className="prose prose-h1:mt-10 prose-h1:mb-0 prose-h2:font-light prose-p:text-[18px] prose-h2:text-5xl prose-h2:mt-10 prose-h2:mb-0 prose-h3:mt-10 prose-h3:mb-0 prose-h4:mt-10 prose-h4:mb-0 prose-h5:mt-10 prose-h5:mb-0 prose-h6:mt-10 prose-h6:mb-0 prose-p:mt-6 prose-p:mb-0 prose-ul:mt-6 prose-ul:mb-0 prose-ol:mt-6 prose-ol:mb-0 prose-blockquote:mt-6 prose-blockquote:mb-0 mt-4">
              <ReactMarkdown>{mainBody}</ReactMarkdown>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Article;
