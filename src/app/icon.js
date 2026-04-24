import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0E7C7B",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            background: "#C9A84C",
            borderRadius: "50%",
            position: "absolute",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 3,
            color: "#C9A84C",
            fontSize: 9,
            fontWeight: 900,
          }}
        >
          ▲
        </div>
      </div>
    ),
    { ...size }
  );
}
