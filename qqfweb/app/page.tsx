import AvatarOrbit from "./components/AvatarOrbit";
import SingerCard3D from "./components/SingerCard3D";

export default function Home() {
  return (
    /* 满屏高度（减去 Navbar）三栏布局 */
    <div
      className="w-full flex items-center"
      style={{ minHeight: "calc(100vh - 66px)" }}
    >
      {/* ── 左侧盒子：SingerCard3D，随盒子等比缩放，向上偏移 200px ── */}
      <div className="flex-1 flex items-center justify-center min-w-0 px-4">
        <div style={{ transform: "translateY(-200px)" }}>
          <SingerCard3D />
        </div>
      </div>

      {/* ── 中间盒子：AvatarOrbit，宽度由组件自身决定 ── */}
      <div className="flex-shrink-0 flex items-center justify-center">
        <AvatarOrbit />
      </div>

      {/* ── 右侧盒子：暂时留空，后续填充内容 ── */}
      <div className="flex-1 min-w-0" />
    </div>
  );
}
