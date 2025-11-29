function Navbar() {
  return (
    <div className="top fixed top-0 flex gap-0.5 p-3">
      <a className="bg-black/10 px-2 py-[5px] text-xs tracking-tighter">
        [B] BLOG
      </a>
      <a className="bg-black/10 px-2 py-[5px] text-xs tracking-tighter">
        [P] PERSONAL
      </a>
      <a className="bg-black/10 px-2 py-[5px] text-xs tracking-tighter">
        [M] MEDIUM
      </a>
    </div>
  );
}

export default Navbar;
