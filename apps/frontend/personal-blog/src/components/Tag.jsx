function Tag({ title }) {
  return (
    <div className="py-auto inline-block justify-self-start rounded border border-dotted p-1 text-[12px] leading-[84%] font-light tracking-tighter whitespace-nowrap uppercase">
      {title}
    </div>
  );
}

export default Tag;
