import plus from "../assets/plus.svg";
import globeDev from "../assets/globedev.svg";

function Footer() {
  return (
    <section className="mt-12 grid grid-cols-24 grid-rows-[auto_1fr_auto_1fr_auto] border-t-[0.5px] p-3 pt-1">
      <div className="col-start-1 col-end-25 grid grid-cols-24">
        <img src={plus} alt="plus" className="col-start-1 col-end-2 h-2.5" />
        <img src={plus} alt="plus" className="col-start-4 col-end-5 h-2.5" />
        <img src={plus} alt="plus" className="col-start-7 col-end-8 h-2.5" />
        <img src={plus} alt="plus" className="col-start-10 col-end-11 h-2.5" />
        <img src={plus} alt="plus" className="col-start-13 col-end-14 h-2.5" />
        <img src={plus} alt="plus" className="col-start-16 col-end-17 h-2.5" />
        <img src={plus} alt="plus" className="col-start-19 col-end-20 h-2.5" />
        <img src={plus} alt="plus" className="col-start-22 col-end-23 h-2.5" />
        <img src={plus} alt="plus" className="col-start-25 col-end-26 h-2.5" />
      </div>
      <div className="col-start-1 col-end-6 flex flex-col gap-2">
        <span className="flex flex-row gap-2 py-1.5 text-[12px] font-light tracking-tighter">
          / MORE
        </span>
        <span className="text-[calc(11.9596px+0.523169vw)] leading-[90%]">
          Visit my personal site to learn more about what I do.
        </span>
        <a
          href="https://justindotzlaw.com"
          className="mt-12 inline-flex h-9 items-center justify-center rounded-full border px-3 py-2.5 font-medium hover:bg-black hover:text-white"
        >
          Visit personal site
        </a>
      </div>
      <div className="col-start-19 col-end-23 flex flex-col gap-2">
        <span className="flex flex-row gap-2 py-1.5 text-[12px] font-light tracking-tighter">
          / SOCIAL
        </span>
        <div className="flex items-center gap-0.5">
          <a
            href="https://www.instagram.com/justiiin.d/"
            className="py-auto inline-block justify-self-start rounded border border-dotted p-1 text-[12px] leading-[84%] font-light tracking-tighter whitespace-nowrap uppercase hover:bg-green-300"
          >
            INSTAGRAM
          </a>
          <a
            href="https://medium.com/@justindotzlaw"
            className="py-auto inline-block justify-self-start rounded border border-dotted p-1 text-[12px] leading-[84%] font-light tracking-tighter whitespace-nowrap uppercase hover:bg-green-300"
          >
            MEDIUM
          </a>
        </div>
        <span className="flex flex-row gap-2 py-1.5 text-[12px] font-light tracking-tighter">
          / CODING
        </span>
        <div className="flex items-center gap-0.5">
          <a
            href="https://github.com/dollarwolv"
            className="py-auto inline-block justify-self-start rounded border border-dotted p-1 text-[12px] leading-[84%] font-light tracking-tighter whitespace-nowrap uppercase hover:bg-green-300"
          >
            GITHUB
          </a>
          <a
            href="https://www.codewars.com/users/shwagmoney31"
            className="py-auto inline-block justify-self-start rounded border border-dotted p-1 text-[12px] leading-[84%] font-light tracking-tighter whitespace-nowrap uppercase hover:bg-green-300"
          >
            CODEWARS
          </a>
        </div>
      </div>
      <div className="col-start-1 col-end-25 mt-1.5 grid grid-cols-24">
        <img src={plus} alt="plus" className="col-start-1 col-end-2 h-2.5" />
        <img src={plus} alt="plus" className="col-start-4 col-end-5 h-2.5" />
        <img src={plus} alt="plus" className="col-start-7 col-end-8 h-2.5" />
        <img src={plus} alt="plus" className="col-start-10 col-end-11 h-2.5" />
        <img src={plus} alt="plus" className="col-start-13 col-end-14 h-2.5" />
        <img src={plus} alt="plus" className="col-start-16 col-end-17 h-2.5" />
        <img src={plus} alt="plus" className="col-start-19 col-end-20 h-2.5" />
        <img src={plus} alt="plus" className="col-start-22 col-end-23 h-2.5" />
        <img src={plus} alt="plus" className="col-start-25 col-end-26 h-2.5" />
      </div>
      <div className="col-start-1 col-end-6 self-end">
        <img src={globeDev} alt="globe icon" />
        <span className="text-[12px] font-light tracking-tighter">
          © 2025 JUSTIN DOTZLAW
        </span>
      </div>
      <div className="col-start-19 col-end-23 flex gap-0.5 self-end">
        <a
          href="https://github.com/dollarwolv/personalBlog"
          className="py-auto inline-block justify-self-start rounded border border-dotted p-1 text-[12px] leading-[84%] font-light tracking-tighter whitespace-nowrap uppercase hover:bg-green-300"
        >
          SOURCE CODE
        </a>
        <a
          href="https://stripe.dev/"
          className="py-auto inline-block justify-self-start rounded border border-dotted p-1 text-[12px] leading-[84%] font-light tracking-tighter whitespace-nowrap uppercase hover:bg-green-300"
        >
          INSPIRATION
        </a>
      </div>
      <div className="col-start-1 col-end-25 mt-1.5 grid grid-cols-24">
        <img src={plus} alt="plus" className="col-start-1 col-end-2 h-2.5" />
        <img src={plus} alt="plus" className="col-start-4 col-end-5 h-2.5" />
        <img src={plus} alt="plus" className="col-start-7 col-end-8 h-2.5" />
        <img src={plus} alt="plus" className="col-start-10 col-end-11 h-2.5" />
        <img src={plus} alt="plus" className="col-start-13 col-end-14 h-2.5" />
        <img src={plus} alt="plus" className="col-start-16 col-end-17 h-2.5" />
        <img src={plus} alt="plus" className="col-start-19 col-end-20 h-2.5" />
        <img src={plus} alt="plus" className="col-start-22 col-end-23 h-2.5" />
        <img src={plus} alt="plus" className="col-start-25 col-end-26 h-2.5" />
      </div>
    </section>
  );
}

export default Footer;
