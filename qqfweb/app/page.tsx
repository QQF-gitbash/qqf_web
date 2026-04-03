import AvatarOrbit from "./components/AvatarOrbit";
import SingerCard3D from "./components/SingerCard3D";
import LifeCard from "./components/LifeCard";

export default function Home() {
  return (
    /* 满屏高度（减去 Navbar）三栏布局 */
    <div
      className="w-full flex items-center"
      style={{ minHeight: "calc(100vh - 66px)" }}
    >
      {/* ── 左侧盒子：SingerCard3D + LifeCard 垂直排列 ── */}
      <div className="flex-1 flex items-center justify-center pl-8 pr-4 overflow-visible">
        <div className="flex flex-col items-center gap-20" style={{ transform: "translateY(-30px)" }}>
          <SingerCard3D />
          <LifeCard />
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
