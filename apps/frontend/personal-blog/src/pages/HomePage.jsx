import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import Marquee from "react-fast-marquee";

import Navbar from "../components/Navbar";
import plus from "../assets/plus.svg";
import folder from "../assets/folder.svg";
import openFolder from "../assets/folder-open.svg";
import rightArrow from "../assets/arrow-right.svg";
import emptyCheckbox from "../assets/checkbox-empty.svg";
import crossedCheckbox from "../assets/crossed-checkbox.svg";

import FeaturedPost from "../components/FeaturedPost";
import Collapsible from "../components/Collapsible";

import PostButton from "../components/PostButton";
import Tag from "../components/Tag";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filtersOpened, setFiltersOpened] = useState(true);
  const [activeFilters, setActiveFilters] = useState(new Set());
  const [categories, setCategories] = useState([]);
  const { user } = useAuth();

  async function getPosts() {
    try {
      const res = await fetch("http://localhost:3001/posts", {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Could not get posts.");
      }
      const posts = await res.json();
      setPosts(posts);

      const seen = new Set(posts.map((p) => p.topic));
      setCategories(Array.from(seen));
    } catch (error) {
      console.error(error);
    }
  }

  function toggleFilters(category) {
    setActiveFilters((prev) => {
      let next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }

  function filterPosts() {
    const next = [];
    for (let post of posts) {
      if (activeFilters.has(post.topic)) {
        next.push(post);
      }
    }
    setFilteredPosts(next);
  }

  async function handleDelete(id) {
    try {
      if (confirm("Are you sure you want to delete this article?")) {
        const res = await fetch(`http://localhost:3001/posts/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to delete draft");
        getDrafts();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const stats = [
    ["BOBAS CONSUMED: ", "100+"],
    ["ARTICLES WRITTEN: ", posts.length + "+"],
    ["COUNTRIES VISITED: ", "12+"],
    ["LANGUAGES LEARNED: ", "5+"],
    ["CODING PROJECTS COMPLETED: ", "10+"],
  ];

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [activeFilters]);

  return (
    <>
      <Navbar></Navbar>
      <div className="z-10 w-screen p-1.5">
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
        <section className="font-main relative max-w-5/8 pl-1.5 text-[calc(100px+((170-100)*(100vw-960px)/(1728-960)))] leading-[84%] tracking-tighter">
          Welcome to Justin's Blog
        </section>
        <section className="font-main px-1.5 pt-[50px] text-[calc(13.296px+1.71898vw)] leading-[84%] tracking-tighter md:max-w-7/8 lg:max-w-26/50">
          This is my personal blog where I post about coding, learning
          languages, and my life.
        </section>
        {/* plusses */}
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

        {/* featured articles */}
        <section className="mt-12">
          <div className="mb-2 border-b border-gray-400">
            <span className="text-[12px] leading-[84%]">
              / FEATURED ARTICLES
            </span>
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

        {/* Stats section */}
        <section>
          <div className="mt-12 mb-2 border-b border-gray-400">
            <span className="text-[12px] leading-[84%]">/ STATISTICS</span>
          </div>
          <Marquee autoFill={true} pauseOnHover={true} speed={30}>
            {stats.map((stat) => {
              return (
                <div className="ml-3 flex items-center gap-2 border-r border-dotted pr-3">
                  <span className="text-[12px] font-light">{stat[0]}</span>
                  <Tag title={stat[1]} className="" />
                </div>
              );
            })}
          </Marquee>
        </section>

        {/* Feed */}
        <section className="mt-30">
          {/* Heading  */}
          <div className="mb-12 flex">
            <h2 className="text-[calc(54px+((114-54)*(100vw-390px)/(1728-390)))] leading-[84%] tracking-tighter">
              Feed
            </h2>
            <sup className="ml-2 text-lg">({posts.length})</sup>
          </div>

          {/* Posts */}
          <div className="grid grid-cols-24 p-4">
            {/* Filter Section */}
            <div className="col-start-1 col-end-5 flex flex-col">
              <span className="mb-4 grid w-full grid-cols-2 border-b-[0.5px] py-1.5 text-[12px] font-light tracking-tighter">
                <span>/ FILTERS</span>
                <button className="ml-auto">/ CLEAR FILTERS</button>
              </span>
              <button
                className="flex flex-row gap-2"
                onClick={() => setFiltersOpened((prev) => !prev)}
              >
                <img
                  src={rightArrow}
                  alt="folder"
                  className={`my-auto h-3 ${filtersOpened ? "rotate-90" : ""} opacity-80 transition-transform duration-100 ease-out`}
                />
                <img
                  src={filtersOpened ? openFolder : folder}
                  alt="folder"
                  className="my-auto h-4"
                />
                <span className="text-[14px] font-light">Topic</span>
              </button>

              {/* Filters list */}
              <ul className="mt-2.5 ml-[7px]">
                {filtersOpened &&
                  categories.map((category) => {
                    const isActive = activeFilters.has(category);
                    return (
                      <motion.li
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.1, ease: "easeOut" }}
                        style={{ overflow: "hidden" }}
                        key={category}
                        className="flex flex-row gap-2 border-l-[0.5px] pl-4 text-[14px] text-black/40"
                        onClick={() => toggleFilters(category)}
                      >
                        <img
                          src={isActive ? crossedCheckbox : emptyCheckbox}
                          alt="checkbox icon"
                          className="my-auto w-4"
                        />
                        <span
                          className={`${isActive ? "bg-orange-200 text-black" : "text-black/40"} hover:text-black`}
                        >
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </span>
                      </motion.li>
                    );
                  })}
              </ul>
            </div>

            {/* Post Cards Table */}
            <div className="col-start-6 col-end-25 flex flex-col">
              <div className="grid grid-cols-17 border-b-[0.5px] py-1.5 text-[12px] font-light tracking-tighter">
                <span className="col-start-1 col-end-3">/ DATE</span>
                <span className="col-start-3 col-end-5">/ NAME</span>
              </div>
              {activeFilters.size > 0
                ? filteredPosts.map((post) => {
                    return <PostButton key={post.id} post={post} user={user} />;
                  })
                : posts.map((post) => {
                    return <PostButton key={post.id} post={post} user={user} />;
                  })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;
