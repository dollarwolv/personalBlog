import placeceholder from "../assets/placeholder.png";
import Tag from "./Tag";

function FeaturedPost() {
  return (
    <div className="flex gap-3">
      <img src={placeceholder} alt="featured post image" className="w-1/2" />

      <div className="flex h-full flex-col gap-3">
        <span className="text-[calc(28px+((33-28)*(100vw-760px)/(1728-760)))] leading-[84%] tracking-tighter">
          Introducing Stripe Workflows
        </span>
        <div className="mt-auto flex flex-col gap-3">
          <span className="small-responsive-text mt-auto leading-[84%] tracking-tight">
            Stripe Workflows is a new way to integrate and extend Stripe with
            zero complex code. See how to build conditional logic that connects
            Stripe products,...
          </span>
          <Tag title="YOUTUBE"></Tag>
        </div>
      </div>
    </div>
  );
}

export default FeaturedPost;
