import { Player } from "@remotion/player";
import { CarbonFootprint } from "../../remotion/CarbonFootprint.jsx";

export default function PreviewCarbonFootprint() {
  return (
    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <Player
        component={CarbonFootprint}
        durationInFrames={360}
        compositionWidth={1920}
        compositionHeight={1080}
        fps={30}
        controls
        loop
        style={{
          width: "100%",
          maxWidth: "100vw",
          aspectRatio: "16 / 9",
        }}
      />
    </div>
  );
}
