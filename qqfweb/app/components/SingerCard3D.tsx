"use client";

import { useState } from "react";
import Tilt from "react-parallax-tilt";
import SingerCard from "./SingerCard";

/* 默认静态倾斜角度 */
const DEFAULT_TILT_X = 40;
const DEFAULT_TILT_Y = 10;
const DEFAULT_ROTATE_Z = -20;

export default function SingerCard3D() {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div style={{ perspective: 800 }}>
      {/* 外层容器：控制默认固定倾斜角度，hover 时重置为 0 */}
      <div
        style={{
          transform: isHovering
            ? "rotateX(0deg) rotateY(0deg) rotateZ(0deg)"
            : `rotateX(${DEFAULT_TILT_X}deg) rotateY(${DEFAULT_TILT_Y}deg) rotateZ(${DEFAULT_ROTATE_Z}deg)`,
          transition: "transform 0.5s ease",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Tilt 组件：仅负责 hover 时鼠标跟随倾斜 */}
        <Tilt
          tiltMaxAngleX={20}
          tiltMaxAngleY={20}
          scale={1.03}
          transitionSpeed={400}
          glareEnable={true}
          glareMaxOpacity={0.15}
          glareColor="#ffffff"
          glarePosition="all"
          glareBorderRadius="28px"
          onEnter={() => setIsHovering(true)}
          onLeave={() => setIsHovering(false)}
        >
          <SingerCard />
        </Tilt>
      </div>
    </div>
  );
}
