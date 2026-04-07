import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  spring,
} from "remotion";

const Title = ({ text, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = interpolate(frame, [0, fps * 0.6], [0, 1], {
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [0, fps * 0.6], [30, 0], {
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        textAlign: "center",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 110, fontWeight: 800, letterSpacing: -2 }}>
        {text}
      </div>
      {subtitle ? (
        <div style={{ fontSize: 42, opacity: 0.85, marginTop: 16 }}>
          {subtitle}
        </div>
      ) : null}
    </div>
  );
};

const Earth = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame, fps, config: { damping: 12 } });
  const rotation = interpolate(frame, [0, 120], [0, 360]);
  const heat = interpolate(frame, [0, 120], [0, 1], {
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        width: 520,
        height: 520,
        borderRadius: "50%",
        background: `radial-gradient(circle at 35% 30%, #4fc3f7, #1565c0 60%, #0d47a1)`,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        boxShadow: `0 0 ${120 * heat}px ${30 * heat}px rgba(255,90,0,${0.6 * heat})`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "15%",
          width: 140,
          height: 90,
          background: "#2e7d32",
          borderRadius: "40% 60% 50% 50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "55%",
          left: "55%",
          width: 180,
          height: 110,
          background: "#388e3c",
          borderRadius: "60% 40% 50% 50%",
        }}
      />
    </div>
  );
};

const Bar = ({ label, value, color, delay, max }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18 },
  });
  const width = (value / max) * 900 * progress;
  return (
    <div style={{ marginBottom: 30, fontFamily: "sans-serif", color: "white" }}>
      <div style={{ fontSize: 36, marginBottom: 10 }}>{label}</div>
      <div
        style={{
          height: 50,
          background: "rgba(255,255,255,0.1)",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width,
            height: "100%",
            background: color,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: 20,
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          {Math.round((value * progress) * 10) / 10}t
        </div>
      </div>
    </div>
  );
};

const Smoke = ({ x, delay }) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - delay);
  const y = interpolate(t, [0, 90], [0, -400]);
  const opacity = interpolate(t, [0, 20, 90], [0, 0.7, 0]);
  const scale = interpolate(t, [0, 90], [0.5, 2]);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        bottom: 200,
        width: 80,
        height: 80,
        borderRadius: "50%",
        background: "#555",
        opacity,
        transform: `translateY(${y}px) scale(${scale})`,
      }}
    />
  );
};

const Factory = () => {
  return (
    <AbsoluteFill style={{ background: "#1a1a2e" }}>
      {[0, 15, 30, 45, 60, 75].map((d, i) => (
        <Smoke key={i} x={700 + i * 90} delay={d} />
      ))}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 600,
          width: 700,
          height: 300,
          background: "#37474f",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 300,
          left: 750,
          width: 60,
          height: 200,
          background: "#455a64",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 300,
          left: 900,
          width: 60,
          height: 200,
          background: "#455a64",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 100,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Title text="Emissions are rising" subtitle="36 billion tonnes of CO₂ per year" />
      </div>
    </AbsoluteFill>
  );
};

const Intro = () => (
  <AbsoluteFill
    style={{
      background: "linear-gradient(180deg, #0d1b2a 0%, #1b263b 100%)",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Earth />
    <div style={{ marginTop: 60 }}>
      <Title text="Our Carbon Footprint" subtitle="Every action leaves a trace" />
    </div>
  </AbsoluteFill>
);

const Stats = () => {
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0d1b2a 0%, #1b263b 100%)",
        justifyContent: "center",
        padding: 120,
      }}
    >
      <div style={{ marginBottom: 60 }}>
        <Title text="Average annual CO₂ per person" />
      </div>
      <Bar label="Walking / Cycling" value={0.5} color="#66bb6a" delay={10} max={20} />
      <Bar label="Plant-based diet" value={1.5} color="#9ccc65" delay={20} max={20} />
      <Bar label="Car commute" value={4.6} color="#ffa726" delay={30} max={20} />
      <Bar label="One transatlantic flight" value={1.6} color="#ef5350" delay={40} max={20} />
      <Bar label="Average lifestyle" value={16} color="#e53935" delay={50} max={20} />
    </AbsoluteFill>
  );
};

const Outro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = interpolate(frame, [0, fps], [0, 1], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #1b5e20 0%, #2e7d32 100%)",
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <Title text="Reduce. Reuse. Renew." subtitle="The future is in our hands 🌱" />
    </AbsoluteFill>
  );
};

export const CarbonFootprint = () => {
  return (
    <AbsoluteFill style={{ background: "black" }}>
      <Sequence durationInFrames={90}>
        <Intro />
      </Sequence>
      <Sequence from={90} durationInFrames={90}>
        <Factory />
      </Sequence>
      <Sequence from={180} durationInFrames={120}>
        <Stats />
      </Sequence>
      <Sequence from={300} durationInFrames={60}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
