import AvatarOrbit from "./components/AvatarOrbit";
import SingerCard3D from "./components/SingerCard3D";

export default function Home() {
  return (
    <div className="flex flex-col items-center pt-[20px]">
      <AvatarOrbit />
      <div className="mt-10">
        <SingerCard3D />
      </div>
    </div>
  );
}
