"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

/* ═══════════════════════════════════════════════════════
   Info Row 配置 — hoverColor 取自各 icon 背景渐变色(加深)
   ═══════════════════════════════════════════════════════ */
const INFO_ROWS = [
  { icon: "/home/profile_card/rocket.svg", alt: "Vision", label: "VISION", text: "To become a Product Rockstar", hoverColor: "#E6A23C" },
  { icon: "/home/profile_card/line.svg", alt: "Vibe", label: "VIBE", text: "ENFP | Life-enthusiast | Creative Mind", hoverColor: "#AB47BC" },
  { icon: "/home/profile_card/hobby.svg", alt: "Hobby", label: "HOBBY", text: "Climbing | Volleyball | Badminton", hoverColor: "#26A69A" },
  { icon: "/home/profile_card/chat.svg", alt: "Motto", label: "MOTTO", text: "Stay hungry, stay foolish", hoverColor: "#42A5F5" },
];

/* ═══════════════════════════════════════════════════════
   Social Icon 配置
   ═══════════════════════════════════════════════════════ */
const SOCIAL_ICONS = [
  { name: "phone", action: "copy" as const, value: "18038698188", toast: "作者电话已复制成功" },
  { name: "xiaohongshu", action: "copy" as const, value: "719245539", toast: "作者小红书号已复制成功" },
  { name: "github", action: "link" as const, value: "https://github.com/QQF-gitbash", toast: "" },
  { name: "mail", action: "copy" as const, value: "2703425032@qq.com", toast: "作者邮箱账号已复制成功" },
];

/* ═══════════════════════════════════════════════════════
   内联 Social Icon SVG — 支持 hover 变色
   ═══════════════════════════════════════════════════════ */
function SocialIconSVG({ name, hovered }: { name: string; hovered: boolean }) {
  const bg = hovered ? "#4A6FA5" : "white";
  const ic = hovered ? "#ffffff" : "#4A6FA5";
  const tr = "0.3s ease";

  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* 背景圆 */}
      <rect x="16.7005" width="32" height="32" rx="16" transform="rotate(31.4592 16.7005 0)"
        fill={bg} style={{ transition: `fill ${tr}` }} />
      {/* 边框 */}
      <rect x="16.8661" y="0.687452" width="31" height="31" rx="15.5"
        transform="rotate(31.4592 16.8661 0.687452)"
        stroke={hovered ? bg : "#89B4E2"} strokeOpacity={hovered ? 0 : 0.18}
        style={{ transition: `stroke ${tr}, stroke-opacity ${tr}` }} />

      {/* ── phone ── */}
      {name === "phone" && (
        <g clipPath={`url(#clip_phone)`}>
          <path d="M27.435 25.3122L25.215 23.6834C24.9229 23.4506 24.5144 23.3931 24.1647 23.5105L23.0571 23.8628C22.8239 23.9216 22.6489 23.922 22.5322 23.9222C22.2403 23.8061 21.7147 23.5155 21.1302 22.9334C20.5456 22.3513 20.2529 21.8269 20.1356 21.5354C20.0771 21.4189 20.0768 21.3022 20.1346 21.0104L20.4823 19.9014C20.5982 19.5511 20.5391 19.1429 20.3051 18.8517L18.7256 16.6383C18.2576 15.9976 17.3243 15.9995 16.8589 16.6421L15.6951 18.0445C14.7642 19.2131 14.5342 20.8469 15.3536 22.1869C15.9974 23.2356 16.9336 24.6337 18.161 25.7978C19.3301 26.9621 20.6736 27.8927 21.7833 28.5321C23.1266 29.346 24.8179 29.1675 26.041 28.2317L27.4387 27.1205C28.0796 26.7109 28.0193 25.7776 27.435 25.3122ZM25.3392 27.3581C24.4657 28.0599 23.2992 28.179 22.423 27.5974C21.4301 26.9578 20.1449 26.0854 19.0345 25.0377C17.9239 23.9316 16.9879 22.6502 16.4025 21.6597C15.8756 20.7275 15.99 19.6189 16.63 18.8009L17.7354 17.3403L19.3732 19.5537L19.0255 20.6627C18.9096 21.0129 18.8522 21.4797 19.0281 21.946C19.2041 22.4123 19.5554 23.0533 20.2568 23.7519C20.9583 24.4504 21.6006 24.7991 22.0677 24.9732C22.5347 25.1472 23.0012 25.0879 23.4093 24.9704L24.5169 24.6181L26.737 26.2469L25.3392 27.3581ZM21.4089 16.6328C21.35 16.3413 21.5243 15.9909 21.8742 15.9319C23.7401 15.578 25.5494 16.041 26.7767 17.1468C28.0624 18.3109 28.7078 20.1179 28.3623 22.3353C28.3046 22.627 28.0134 22.861 27.7216 22.8032C27.4298 22.7455 27.1959 22.4543 27.2536 22.1625C27.5414 20.2953 27.0136 18.8964 26.0785 18.0233C25.1433 17.1502 23.6842 16.7448 22.1681 17.0396C21.76 17.1571 21.4679 16.9244 21.4089 16.6328Z"
            fill={ic} style={{ transition: `fill ${tr}` }} />
          <path d="M21.3553 18.9079C21.2963 18.6164 21.5291 18.3242 21.8789 18.2652C23.9783 17.9692 26.0817 19.5983 25.8536 22.1654C25.7959 22.4572 25.5631 22.7493 25.213 22.6917C24.8629 22.6341 24.6291 22.4012 24.6867 22.0511C24.8581 20.3008 23.4558 19.1953 22.0562 19.3732C21.7063 19.4322 21.4142 19.1995 21.3553 18.9079Z"
            fill={ic} style={{ transition: `fill ${tr}` }} />
        </g>
      )}

      {/* ── xiaohongshu ── */}
      {name === "xiaohongshu" && (
        <>
          <path d="M15.1894 20.8124L14.0542 20.8505C14.2028 22.3281 13.8781 23.4633 13.8781 23.4633L14.5242 24.5583C15.3195 24.1855 15.1894 20.8124 15.1894 20.8124ZM18.8761 20.6885L17.7401 20.7267C17.7401 20.7267 17.8368 24.1009 18.6553 24.4195L19.2265 23.2836C19.2265 23.2836 18.8271 22.1727 18.8761 20.6885ZM16.0199 24.1809L15.3042 24.205C15.3323 25.0416 16.0422 25.0915 16.0422 25.0915L16.4038 25.0793C17.131 25.0549 17.1327 24.2227 17.1327 24.2227L16.9663 19.2701L15.8562 19.3074L16.0199 24.1809ZM19.7606 21.6804L20.5007 21.6555L19.9748 22.8264C19.9748 22.8264 19.6676 23.4848 20.1949 23.4891L21.4235 23.4479L21.8844 22.5401L21.2705 22.5607C21.2526 22.5613 21.2349 22.5573 21.219 22.5491C21.2031 22.5408 21.1896 22.5287 21.1797 22.5138C21.1698 22.4989 21.1639 22.4817 21.1626 22.4639C21.1612 22.446 21.1644 22.4281 21.1719 22.4119L22.0294 20.5833L20.9649 20.6191L20.9061 20.7504L20.8355 20.7527C20.8176 20.7533 20.7999 20.7493 20.784 20.7411C20.7681 20.7329 20.7546 20.7207 20.7447 20.7058C20.7348 20.6909 20.7289 20.6737 20.7276 20.6559C20.7262 20.638 20.7294 20.6202 20.7369 20.6039L21.4523 19.1201L20.3878 19.1559L19.5406 21.0176C19.5406 21.0176 19.2333 21.676 19.7606 21.6804ZM19.9957 23.8549C19.9957 23.8549 19.8601 23.8716 19.7667 23.7842L19.2515 24.8642C19.2515 24.8642 19.346 24.9843 19.5314 24.978L20.8976 24.9321L21.4447 23.8062L19.9957 23.8549Z"
            fill={ic} style={{ transition: `fill ${tr}` }} />
          <path d="M24.0155 20.5158L24.7176 20.4922L24.6796 19.3624L22.1676 19.4468L22.2056 20.5766L22.9183 20.5527L23.0271 23.7888L21.974 23.8242L21.481 24.9087L25.2246 24.7829L25.1888 23.7161L24.1243 23.7519L24.0155 20.5158ZM29.0766 21.1802L28.9474 21.1845L28.9229 20.4536C28.8999 19.769 28.3266 19.233 27.642 19.256L27.2142 19.2703L27.2026 18.9254L26.1168 18.9619L26.1284 19.3068L25.4468 19.3297L25.484 20.4375L26.1656 20.4146L26.1946 21.277L25.108 21.3136L25.1453 22.4214L26.2311 22.3849L26.3104 24.7464L27.3962 24.7099L27.3169 22.3492L28.8114 22.2989C28.9581 22.294 29.0814 22.4093 29.0863 22.5559L29.1254 23.7192L28.089 23.7541C28.1063 24.2685 28.5375 24.6716 29.0519 24.6543L29.3322 24.6449C29.8466 24.6276 30.2498 24.1964 30.2325 23.682L30.1832 22.2171C30.1649 21.6244 29.6685 21.1603 29.0766 21.1802ZM27.2514 20.3789L27.642 20.3658C27.7354 20.3627 27.8132 20.4353 27.8163 20.5288L27.8396 21.2218L27.2804 21.2406L27.2514 20.3789Z"
            fill={ic} style={{ transition: `fill ${tr}` }} />
          <path d="M30.0848 19.7185C30.0749 19.4214 29.8259 19.1887 29.5296 19.1986C29.3869 19.2034 29.252 19.2647 29.1545 19.369C29.057 19.4732 29.0049 19.612 29.0097 19.7546L29.0278 20.2926L29.5657 20.2745C29.862 20.2646 30.0948 20.0156 30.0848 19.7185Z"
            fill={ic} style={{ transition: `fill ${tr}` }} />
        </>
      )}

      {/* ── github ── */}
      {name === "github" && (
        <g clipPath={`url(#clip_github)`}>
          <path d="M20.7612 26.2652C17.9735 27.4905 17.688 25.1747 16.4944 25.0279M25.028 27.5025L24.7518 25.262C24.7395 24.9832 24.668 24.7103 24.542 24.4613C24.4161 24.2123 24.2385 23.993 24.0213 23.818C25.8142 23.3913 27.6398 22.4668 27.2502 19.3057C27.1504 18.4974 26.7436 17.7584 26.1141 17.2417C26.2909 16.502 26.1758 15.7226 25.793 15.0655C25.793 15.0655 25.0848 14.9471 23.6349 16.2014C22.2636 16.0053 20.8648 16.1777 19.5822 16.7009C17.8711 15.8363 17.2129 16.1231 17.2129 16.1231C17.0011 16.8536 17.0788 17.6376 17.4298 18.3122C16.941 18.9712 16.7265 19.7939 16.8312 20.6077C17.218 23.7456 19.2135 24.199 21.0592 24.2007C20.893 24.4211 20.775 24.6739 20.713 24.9428C20.6509 25.2117 20.6462 25.4907 20.6991 25.7615L20.9753 28.0021"
            stroke={ic} strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"
            style={{ transition: `stroke ${tr}` }} />
        </g>
      )}

      {/* ── mail ── */}
      {name === "mail" && (
        <g clipPath={`url(#clip_mail)`}>
          <path d="M17.1995 17.4679L26.529 17.1995C27.1704 17.1811 27.7103 17.6907 27.7287 18.3321L27.9301 25.3292C27.9485 25.9706 27.4388 26.5105 26.7974 26.529L17.468 26.7974C16.8266 26.8159 16.2867 26.3062 16.2682 25.6648L16.0669 18.6677C16.0485 18.0263 16.5581 17.4864 17.1995 17.4679Z"
            stroke={ic} strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"
            style={{ transition: `stroke ${tr}` }} />
          <path d="M27.7288 18.3321L22.0153 22.5815L16.0669 18.6677"
            stroke={ic} strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"
            style={{ transition: `stroke ${tr}` }} />
        </g>
      )}

      {/* clip-path 定义 */}
      <defs>
        <clipPath id="clip_phone">
          <rect width="14" height="14" fill="white" transform="translate(14.5819 15.6551) rotate(-0.117233)" />
        </clipPath>
        <clipPath id="clip_github">
          <rect width="14" height="14" fill="white" transform="translate(14.1947 15.9074) rotate(-7.02737)" />
        </clipPath>
        <clipPath id="clip_mail">
          <rect width="14" height="14" fill="white" transform="translate(14.8001 15.2027) rotate(-1.64798)" />
        </clipPath>
      </defs>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   Toast 弹窗组件 — 3s 倒计时自动关闭 / OK 手动关闭
   ═══════════════════════════════════════════════════════ */
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown <= 0) { onClose(); return; }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, onClose]);

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center"
      style={{ animation: "profileToastIn 0.3s ease" }}
    >
      {/* 半透明遮罩 */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      {/* 弹窗卡片 */}
      <div className="relative bg-white rounded-2xl shadow-2xl px-8 py-6 min-w-[280px] max-w-[360px] text-center"
        style={{ animation: "profileToastScale 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}>
        {/* 成功图标 */}
        <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* 提示文字 */}
        <p className="text-gray-800 font-medium text-[14px] mb-4">{message}</p>

        {/* OK 按钮 + 倒计时 */}
        <button
          onClick={onClose}
          className="px-8 py-2 rounded-xl text-white text-[13px] font-medium cursor-pointer border-0"
          style={{
            background: "linear-gradient(135deg, #4A6FA5, #5B8DBE)",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          OK ({countdown}s)
        </button>
      </div>

      {/* 内联动画 keyframes */}
      <style>{`
        @keyframes profileToastIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes profileToastScale { from { transform: scale(0.85); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   ProfileCard 主组件
   ═══════════════════════════════════════════════════════ */
export default function ProfileCard() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  /* 社交图标点击 */
  const handleSocialClick = useCallback(async (icon: (typeof SOCIAL_ICONS)[number]) => {
    if (icon.action === "link") {
      window.open(icon.value, "_blank");
      return;
    }
    try {
      await navigator.clipboard.writeText(icon.value);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = icon.value;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setToastMsg(icon.toast);
  }, []);

  const dismissToast = useCallback(() => setToastMsg(null), []);

  return (
    <>
      {/* 外层占位：补偿 scale 不影响文档流 */}
      <div style={{ width: 683 * 0.8, height: 843 * 0.8 }}>
        <div className="relative" style={{ width: 683, height: 843, transform: "scale(0.8)", transformOrigin: "top left" }}>
          {/* PNG 背景（挂绳 + 卡片形状 + 阴影） */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "url('/home/profile_card/profile card.png')",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
            }}
          />

          {/* 内容层：旋转对齐卡片主体 */}
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

                  {/* 社交图标行 — 内联 SVG + hover 变色 + 点击事件 */}
                  <div className="flex gap-0.5">
                    {SOCIAL_ICONS.map((icon) => (
                      <button
                        key={icon.name}
                        onClick={() => handleSocialClick(icon)}
                        onMouseEnter={() => setHoveredIcon(icon.name)}
                        onMouseLeave={() => setHoveredIcon(null)}
                        className="p-0 border-0 bg-transparent cursor-pointer"
                        style={{
                          width: 45,
                          height: 45,
                          transform: hoveredIcon === icon.name ? "scale(1.12)" : "scale(1)",
                          transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                        }}
                        title={icon.name}
                      >
                        <SocialIconSVG name={icon.name} hovered={hoveredIcon === icon.name} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── 信息行区域 — hover 浮动+缩放+变色 ── */}
              <div className="flex flex-col gap-2.5 mt-4">
                {INFO_ROWS.map((row, idx) => (
                  <div
                    key={row.label}
                    className="flex items-center gap-2.5 bg-white/60 rounded-xl px-3 py-2.5 backdrop-blur-sm cursor-default"
                    onMouseEnter={() => setHoveredRow(idx)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={{
                      transition:
                        "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease",
                      transform:
                        hoveredRow === idx
                          ? "translateY(-5px) scale(1.04)"
                          : "translateY(0) scale(1)",
                      boxShadow:
                        hoveredRow === idx
                          ? "0 8px 24px rgba(0,0,0,0.10)"
                          : "0 0 0 rgba(0,0,0,0)",
                    }}
                  >
                    <Image
                      src={row.icon}
                      alt={row.alt}
                      width={32}
                      height={32}
                      className="flex-shrink-0"
                    />
                    <div>
                      <span
                        className="text-[8px] font-semibold tracking-wider block"
                        style={{
                          transition: "color 0.3s ease",
                          color: hoveredRow === idx ? row.hoverColor : "#9CA3AF",
                        }}
                      >
                        {row.label}
                      </span>
                      <span
                        className="text-[12px] font-semibold block leading-tight"
                        style={{
                          transition: "color 0.3s ease",
                          color: hoveredRow === idx ? row.hoverColor : "black",
                        }}
                      >
                        {row.text}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast 弹窗 — 通过 Portal 渲染到 body，避免 transform 影响 fixed 定位 */}
      {mounted && toastMsg && createPortal(
        <Toast message={toastMsg} onClose={dismissToast} />,
        document.body
      )}
    </>
  );
}
