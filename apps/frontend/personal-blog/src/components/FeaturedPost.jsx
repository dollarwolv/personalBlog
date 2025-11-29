import placeceholder from "../assets/placeholder.png";
import Tag from "./Tag";

function FeaturedPost({ title, subtitle, tags }) {
  return (
    <div className="mt-5 flex gap-3 md:h-[20vw]">
      <img src={placeceholder} alt="featured post image" className="w-1/2" />

      <div className="flex h-full max-w-4/10 flex-col gap-3">
        <span className="text-[calc(28px+((33-28)*(100vw-760px)/(1728-760)))] leading-[84%] tracking-tighter">
          {title}
        </span>
        <div className="mt-auto flex flex-col gap-3">
          <span className="small-responsive-text mt-auto leading-[84%] tracking-tight">
            {subtitle}
          </span>
          <div className="flex gap-1">
            {tags.map((tag, index) => (
              <Tag key={index} title={tag}></Tag>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedPost;
