import Tag from "./Tag";

function Collapsible({ summary, topic, author, id }) {
  return (
    <div className="grid grid-cols-17 grid-rows-3 pt-5">
      <span className="col-start-1 col-end-2 text-[12px] font-light tracking-tighter">
        SUMMARY:
      </span>
      <span className="col-start-3 col-end-10">{summary}</span>
      <span className="col-start-13 col-end-15 self-baseline text-[12px] font-light tracking-tighter">
        AUTHOR:
      </span>
      <span className="sizing col-start-15 col-end-17 self-baseline text-[18px]">
        Justin Dotzlaw
      </span>
      <span className="col-start-1 col-end-2 my-auto text-[12px] font-light tracking-tighter">
        TOPIC:
      </span>
      <div className="col-start-3 col-end-10 my-8">
        <Tag title={"CRYPTO"} />
      </div>
      <a className="col-start-1 col-end-18 row-start-3 row-end-4 inline-flex h-9 items-center justify-center rounded-full border px-3 py-2.5 font-medium hover:bg-black hover:text-white">
        Read
      </a>
    </div>
  );
}

export default Collapsible;
