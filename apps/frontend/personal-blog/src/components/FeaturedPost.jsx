import Tag from "./Tag";
import GLOBE from "vanta/dist/vanta.globe.min";
import BIRDS from "vanta/dist/vanta.birds.min";
import { useState, useRef, useEffect } from "react";
import * as THREE from "three";

import console from "../assets/console.svg";
import settings from "../assets/settings.svg";

function FeaturedPost({ title, subtitle, tags, effect }) {
  const [vantaEffect, setVantaEffect] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      if (effect === "globe") {
        setVantaEffect(
          GLOBE({
            el: ref.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: false,
            gyroControls: false,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x0,
            size: 1.4,
            backgroundColor: 0xf5f4f8,
          }),
        );
      } else if (effect === "trunk") {
        setVantaEffect(
          BIRDS({
            el: ref.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            scale: 1.0,
            scaleMobile: 1.0,
            backgroundColor: 0xf5f4f8,
            color1: 0x0,
            color2: 0xcbcbe8,
            colorMode: "lerpGradient",
            birdSize: 1.4,
            separation: 40.0,
            alignment: 8.0,
            cohesion: 10.0,
          }),
        );
      }
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div className="mt-5 ml-3 flex flex-row gap-3 md:h-[20vw]">
      <div className="flex w-1/2 flex-col border bg-[#e9e9e9] px-1">
        <div className="flex flex-row justify-between bg-[#e9e9e9] py-1">
          <img src={console} alt="" />
          <span className="text-[8px]">[ FIG. 2 ]</span>
          <img src={settings} alt="" />
        </div>
        <div
          ref={ref}
          alt="featured post image"
          className="h-full w-full overflow-clip border p-2"
        />
        <div className="bg-[#e9e9e9] p-0.5"></div>
      </div>

      {/* Actual text and title */}
      <div className="ml-2 flex h-full max-w-4/10 flex-col gap-3">
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
