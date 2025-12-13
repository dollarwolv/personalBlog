import Tag from "./Tag";
import { Link } from "react-router-dom";

function Collapsible({ post }) {
  return (
    <div className="flex flex-col border-b-[0.5px] pt-5 md:grid md:grid-cols-17 md:grid-rows-[1fr_auto_auto]">
      <span className="col-start-1 col-end-2 text-[12px] font-light tracking-tighter">
        SUMMARY:
      </span>
      <span className="col-start-3 col-end-10">{post.summary}</span>
      <span className="col-start-13 col-end-15 mt-4 self-baseline text-[12px] font-light tracking-tighter md:mt-0">
        AUTHOR:
      </span>
      <span className="sizing col-start-15 col-end-17 self-baseline text-[18px]">
        {post.author.fullname}
      </span>
      <span className="col-start-1 col-end-2 mt-4 text-[12px] font-light tracking-tighter md:my-auto">
        TOPIC:
      </span>
      <div className="col-start-3 col-end-10 mt-4 md:my-8">
        <Tag title={post.topic} />
      </div>
      <Link
        to={`/article/${post.id}`}
        className="col-start-1 col-end-18 row-start-3 row-end-4 mt-4 mb-4 inline-flex h-9 items-center justify-center rounded-full border px-3 py-2.5 font-medium hover:bg-black hover:text-white md:mt-0"
      >
        Read
      </Link>
    </div>
  );
}

export default Collapsible;
