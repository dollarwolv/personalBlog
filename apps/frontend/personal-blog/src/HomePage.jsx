import Navbar from "./components/Navbar";
import plus from "./assets/plus.svg";
import FeaturedPost from "./components/FeaturedPost";

function HomePage() {
  return (
    <div className="z-10 w-screen bg-[#f2f6f7] p-1.5">
      <Navbar></Navbar>
      <div className="mt-16 grid grid-cols-9">
        <img src={plus} alt="plus" className="col-start-1 col-end-2 h-2.5" />
        <img src={plus} alt="plus" className="col-start-7 col-end-8 h-2.5" />
        <img src={plus} alt="plus" className="col-start-9 col-end-10 h-2.5" />
        <img src={plus} alt="plus" className="col-start-10 col-end-11 h-2.5" />
      </div>
      <section className="font-main relative max-w-5/8 pl-1.5 text-[calc(100px+((170-100)*(100vw-960px)/(1728-960)))] leading-[84%] tracking-tighter">
        Welcome to Justin's Blog
      </section>
      <section className="font-main px-1.5 pt-[50px] text-[calc(13.296px+1.71898vw)] leading-[84%] tracking-tighter md:max-w-7/8 lg:max-w-26/50">
        This is my personal blog where I post about coding, learning languages,
        and my life.
      </section>
      {/* plusses */}
      <div className="mt-2 grid grid-cols-9">
        <img src={plus} alt="plus" className="col-start-1 col-end-2 h-2.5" />
        <img src={plus} alt="plus" className="col-start-7 col-end-8 h-2.5" />
        <img src={plus} alt="plus" className="col-start-9 col-end-10 h-2.5" />
        <img src={plus} alt="plus" className="col-start-10 col-end-11 h-2.5" />
      </div>

      {/* featured articles */}
      <section className="mt-12">
        <div className="mb-2 border-b border-gray-400">
          <span className="text-[12px] leading-[84%]">/ FEATURED ARTICLES</span>
        </div>
        <div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-none">
          <FeaturedPost
            title={"Introducing Stripe Workflows"}
            tags={["YOUTUBE", "HURENSOHN"]}
            subtitle={
              "Stripe Workflows is a new way to integrate and extend Stripe with zero complex code. See how to build conditional logic that connects Stripe products,..."
            }
          />
          <div className="border-l border-dotted border-gray-400">
            <FeaturedPost
              title={"Join a local Stripe Developer Meetup"}
              tags={["YOUTUBE", "HURENSOHN"]}
              subtitle={
                "Don't miss out on our bi-monthly meetings across the globe, hosted by James Beswick, Ben Smith, Allison Farris, and Brad Johnson...."
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
