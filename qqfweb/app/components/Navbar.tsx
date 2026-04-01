"use client";

import { useState } from "react";

const navItems = ["Home", "Project", "Life", "Skills"] as const;
type NavItem = (typeof navItems)[number];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState<NavItem>("Home");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-10 lg:px-16 bg-[var(--background)]">
      {/* 左侧：品牌标识 */}
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-black text-white text-[10px] font-bold leading-none">Q</span>
        <span className="text-base font-bold tracking-wide">QQF-WEB</span>
      </div>

      {/* 中间：页面导航 - 始终居中 */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center bg-white rounded-full px-1.5 py-1 shadow-sm">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => setActiveTab(item)}
            className={`w-20 py-2 rounded-full text-sm font-medium text-center transition-all duration-300 cursor-pointer ${
              activeTab === item
                ? "bg-black text-white"
                : "bg-transparent text-gray-600 hover:text-black"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* 右侧：ContactMe 按钮 */}
      <button className="group flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:text-[#F2F2F7] transition-colors cursor-pointer">
        {/* 电话图标 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1C10.07 21 3 13.93 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.24 1.01l-2.2 2.2z" />
        </svg>
        {/* 微信图标 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05a6.127 6.127 0 01-.253-1.726c0-3.573 3.26-6.467 7.3-6.467.34 0 .68.03 1.004.056C16.472 4.088 12.98 2.188 8.691 2.188zM5.785 5.991a.96.96 0 110 1.92.96.96 0 010-1.92zm5.812 0a.96.96 0 110 1.92.96.96 0 010-1.92z" />
          <path d="M23.058 14.826c0-3.132-3.07-5.674-6.857-5.674-3.786 0-6.857 2.542-6.857 5.674 0 3.13 3.07 5.673 6.857 5.673.752 0 1.487-.107 2.166-.313a.665.665 0 01.544.074l1.45.84a.253.253 0 00.126.04c.121 0 .221-.1.221-.223 0-.055-.022-.109-.037-.162l-.298-1.127a.452.452 0 01.162-.506c1.4-1.04 2.523-2.667 2.523-4.296zM13.385 13.91a.727.727 0 110 1.454.727.727 0 010-1.454zm5.633 0a.727.727 0 110 1.454.727.727 0 010-1.454z" />
        </svg>
        {/* 邮件图标 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
        <span>ContactMe !</span>
      </button>
    </nav>
  );
}
