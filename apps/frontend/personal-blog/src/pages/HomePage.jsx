import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence, delay } from "framer-motion";
import Marquee from "react-fast-marquee";
import { SquareLoader } from "react-spinners";

import plus from "../assets/plus.svg";
import folder from "../assets/folder.svg";
import openFolder from "../assets/folder-open.svg";
import rightArrow from "../assets/arrow-right.svg";
import emptyCheckbox from "../assets/checkbox-empty.svg";
import crossedCheckbox from "../assets/crossed-checkbox.svg";
import globeDev from "../assets/globedev.svg";

import FeaturedPost from "../components/FeaturedPost";
import Navbar from "../components/Navbar";
import PostButton from "../components/PostButton";
import Tag from "../components/Tag";
import Footer from "../components/Footer";
import { apiPath } from "../utils/api";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filtersOpened, setFiltersOpened] = useState(true);
  const [activeFilters, setActiveFilters] = useState(new Set());
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, token } = useAuth();

  const featuredPosts = posts.filter((p) => p.featured);

  async function getPosts() {
    setLoading(true);
    try {
      const res = await fetch(apiPath("/posts"), {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Could not get posts.");
      }
      const posts = await res.json();
      setPosts(posts);

      const seen = new Set(posts.map((p) => p.topic));
      setCategories(Array.from(seen));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(error);
      setLoading(false);
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

  function checkNumOfFeaturedPosts() {
    let num = 0;
    for (const post of posts) {
      if (post.featured) {
        num++;
      }
    }
    if (num >= 2) return false;
    return true;
  }

  async function handleFeature(id, feature) {
    const ok = checkNumOfFeaturedPosts();
    if (ok || !feature) {
      try {
        const res = await fetch(apiPath(`/posts/${id}`), {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            featured: feature,
          }),
        });
        if (!res.ok) {
          const err = await res.text();
          throw new Error(err);
        }
        getPosts();
      } catch (error) {
        console.error(error);
      }
    } else {
      console.warn("Too many featured posts");
      return;
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
          <div className="col-start-10 col-end-11">
            <img src={plus} alt="plus" className="h-2.5" />
            <div>
              <img
                src={globeDev}
                alt="globe icon"
                className="hidden md:absolute md:right-2 md:mt-2 md:block"
              />
            </div>
          </div>
        </div>
        <h1 className="font-main relative pr-4 pl-1.5 text-7xl leading-[84%] tracking-tighter md:max-w-5/8 md:text-[calc(100px+((170-100)*(100vw-960px)/(1728-960)))]">
          Welcome to Justin's Blog
        </h1>
        <h2 className="font-main mt-4 px-1.5 pr-4 text-2xl leading-[84%] tracking-tighter md:mt-12.5 md:max-w-7/8 md:pr-0 md:text-[calc(13.296px+1.71898vw)] lg:max-w-26/50">
          This is my personal blog where I post about coding, learning
          languages, and my life.
        </h2>
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
        {featuredPosts.length >= 2 && (
          <section className="mt-12">
            <div className="mb-2 border-b border-gray-400">
              <span className="text-[12px] leading-[84%]">
                / FEATURED ARTICLES
              </span>
            </div>
            <div className="grid grid-rows-2 gap-5 md:grid-cols-2 md:grid-rows-none md:gap-0">
              <FeaturedPost
                title={featuredPosts[0].title}
                topic={featuredPosts[0].topic}
                subtitle={featuredPosts[0].summary}
                id={featuredPosts[0].id}
                effect={"globe"}
              />
              <div className="border-dotted md:border-l md:border-gray-400">
                <FeaturedPost
                  title={featuredPosts[1].title}
                  topic={featuredPosts[1].topic}
                  subtitle={featuredPosts[1].summary}
                  id={featuredPosts[1].id}
                  effect={"trunk"}
                />
              </div>
            </div>
          </section>
        )}

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
        <section className="mt-12 md:mt-30">
          {/* Heading  */}
          <div className="mb-3 flex md:mb-12">
            <h2 className="text-[calc(54px+((114-54)*(100vw-390px)/(1728-390)))] leading-[84%] tracking-tighter">
              Feed
            </h2>
            <sup className="ml-2 text-lg">({loading ? "?" : posts.length})</sup>
          </div>

          {/* Posts */}
          <div className="flex flex-col p-1 md:grid md:grid-cols-24 md:p-4">
            {/* Filter Section */}
            <div className="flex flex-col md:col-start-1 md:col-end-5">
              <span className="mb-4 grid w-full grid-cols-2 border-b-[0.5px] py-1.5 text-[12px] font-light tracking-tighter">
                <span>/ FILTERS</span>
                <button
                  className="ml-auto hover:cursor-pointer"
                  onClick={() => {
                    setActiveFilters(new Set());
                  }}
                >
                  / CLEAR FILTERS
                </button>
              </span>
              <button
                className="hidden flex-row gap-2 md:flex"
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
              <ul className="ml-1 flex w-full items-center gap-3 overflow-x-auto whitespace-nowrap md:mt-2.5 md:mr-0 md:ml-1.75 md:block md:gap-0">
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
                        className="flex flex-none flex-row gap-1 text-[14px] text-black/40 md:gap-2 md:border-l-[0.5px] md:px-4"
                        onClick={() => toggleFilters(category)}
                      >
                        <img
                          src={isActive ? crossedCheckbox : emptyCheckbox}
                          alt="checkbox icon"
                          className="my-auto hidden w-2.5 md:block md:w-4"
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
            <div className="flex flex-col md:col-start-6 md:col-end-25">
              <div className="hidden grid-cols-17 border-b-[0.5px] py-1.5 text-[12px] font-light tracking-tighter md:grid">
                <span className="col-start-1 col-end-3">/ DATE</span>
                <span className="col-start-3 col-end-5">/ NAME</span>
              </div>
              <div className="mt-4 border-b-[0.5px] md:mt-0 md:border-0"></div>
              {!loading ? (
                activeFilters.size > 0 ? (
                  filteredPosts.map((post) => {
                    return (
                      <PostButton
                        key={post.id}
                        post={post}
                        user={user}
                        handleFeature={handleFeature}
                        getPosts={getPosts}
                      />
                    );
                  })
                ) : (
                  posts.map((post) => {
                    return (
                      <PostButton
                        key={post.id}
                        post={post}
                        user={user}
                        handleFeature={handleFeature}
                        getPosts={getPosts}
                      />
                    );
                  })
                )
              ) : (
                <div className="my-4 flex w-full flex-col items-center justify-center gap-2">
                  <SquareLoader size={"24px"} />
                  <span className="text-[12px] font-light">
                    Articles are loading. This may take a few seconds (I'm using
                    the free version for the backend 😅).
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
