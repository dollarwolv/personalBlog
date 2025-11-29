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
      <section className="font-main relative max-w-5/8 pl-1.5 text-[calc(100px+((170-100)*(100vw-960px)/(1728-960)))] leading-[84%] tracking-[-12px]">
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
      <section className="mt-12 grid grid-cols-2">
        <FeaturedPost></FeaturedPost>
      </section>
    </div>
  );
}

export default HomePage;
