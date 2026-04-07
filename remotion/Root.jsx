import { Composition } from "remotion";
import { CarbonFootprint } from "./CarbonFootprint.jsx";

export const RemotionRoot = () => {
  return (
    <Composition
      id="CarbonFootprint"
      component={CarbonFootprint}
      durationInFrames={360}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
