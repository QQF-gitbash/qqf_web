"use client";

import Image from "next/image";

export default function ProfileCard() {
  return (
    /* 外层占位：补偿 scale 不影响文档流 */
    <div style={{ width: 683 * 0.8, height: 843 * 0.8 }}>
    <div className="relative" style={{ width: 683, height: 843, transform: "scale(0.8)", transformOrigin: "top left" }}>
      {/* SVG 背景（挂绳 + 卡片形状 + 阴影） */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/home/profile_card/profile card.png')",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* 内容层：旋转对齐卡片主体（391×389, rx=24, rotate 31.46°） */}
      <div
        className="absolute"
        style={{
          width: 391,
          height: 389,
          left: 254,
          top: 236,
          transform: "rotate(31.46deg)",
          transformOrigin: "0 0",
        }}
      >
        <div className="w-full h-full px-7 pt-6 pb-5 flex flex-col">
          {/* macOS 窗口装饰圆点 — 卡片右上角 */}
          <div className="absolute top-5 right-6 flex gap-1">
            <span className="w-[7px] h-[7px] rounded-full bg-[#FDBC40]" />
            <span className="w-[7px] h-[7px] rounded-full bg-[#FC605C]" />
            <span className="w-[7px] h-[7px] rounded-full bg-[#34C749]" />
          </div>

          {/* ── 头部：盒子A（头像） + 盒子B（名称+用户名+社交图标） ── */}
          <div className="flex items-stretch gap-3">
            {/* 盒子 A：头像 */}
            <div className="flex flex-col items-center justify-center flex-shrink-0">
              <div className="w-[60px] h-[60px] rounded-full overflow-hidden border-2 border-white shadow-md">
                <Image
                  src="/home/profile_card/qqf.png"
                  alt="QQF Avatar"
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* 盒子 B：名称 + 用户名 + 社交图标（竖向排列） */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                  <span className="text-[15px] font-bold text-black">QQF</span>
                </div>
                <span className="text-[10px] text-gray-400 mt-0.5 block">
                  qqf1215@gmail.com
                </span>
              </div>
              <div className="flex gap-0.5">
                {["phone", "xiaohongshu", "github", "mail"].map((name) => (
                  <Image
                    key={name}
                    src={`/home/profile_card/${name}.svg`}
                    alt={name}
                    width={45}
                    height={45}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── 三行信息区 ── */}
          <div className="flex flex-col gap-2.5 mt-4">
            {/* VISION */}
            <div className="flex items-center gap-2.5 bg-white/60 rounded-xl px-3 py-2.5 backdrop-blur-sm">
              <Image
                src="/home/profile_card/rocket.svg"
                alt="Vision"
                width={32}
                height={32}
                className="flex-shrink-0"
              />
              <div>
                <span className="text-[8px] text-gray-400 font-semibold tracking-wider block">
                  VISION
                </span>
                <span className="text-[12px] font-semibold text-black block leading-tight">
                  To become a Product Rockstar
                </span>
              </div>
            </div>

            {/* VIBE */}
            <div className="flex items-center gap-2.5 bg-white/60 rounded-xl px-3 py-2.5 backdrop-blur-sm">
              <Image
                src="/home/profile_card/line.svg"
                alt="Vibe"
                width={32}
                height={32}
                className="flex-shrink-0"
              />
              <div>
                <span className="text-[8px] text-gray-400 font-semibold tracking-wider block">
                  VIBE
                </span>
                <span className="text-[12px] font-semibold text-black block leading-tight">
                  ENFP | Life-enthusiast | Creative Mind
                </span>
              </div>
            </div>

            
            {/* VIBE */}
            <div className="flex items-center gap-2.5 bg-white/60 rounded-xl px-3 py-2.5 backdrop-blur-sm">
              <Image
                src="/home/profile_card/hobby.svg"
                alt="Vibe"
                width={32}
                height={32}
                className="flex-shrink-0"
              />
              <div>
                <span className="text-[8px] text-gray-400 font-semibold tracking-wider block">
                  HOBBY
                </span>
                <span className="text-[12px] font-semibold text-black block leading-tight">
                  Climbing | Volleyball | Badminton
                </span>
              </div>
            </div>


            

            {/* MOTTO */}
            <div className="flex items-center gap-2.5 bg-white/60 rounded-xl px-3 py-2.5 backdrop-blur-sm">
              <Image
                src="/home/profile_card/chat.svg"
                alt="Motto"
                width={32}
                height={32}
                className="flex-shrink-0"
              />
              <div>
                <span className="text-[8px] text-gray-400 font-semibold tracking-wider block">
                  MOTTO
                </span>
                <span className="text-[12px] font-semibold text-black block leading-tight">
                  Stay hungry, stay foolish
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
