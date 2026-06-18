import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "#2A1418",
          color: "#FBF3EE",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 80, fontWeight: 600, lineHeight: 1.05 }}>
          Nadie nos enseñó a amar.
        </div>
        <div style={{ display: "flex", fontSize: 34, marginTop: 28, color: "#F4C9C0" }}>
          {`Curso en vivo con ${siteConfig.instructor}`}
        </div>
      </div>
    ),
    { ...size },
  );
}
