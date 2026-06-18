import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
          background: "linear-gradient(135deg, #B11226 0%, #8E0C1B 100%)",
          color: "#FBF3EE",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: 0.85,
            marginBottom: 24,
          }}
        >
          Curso en vivo
        </div>
        <div style={{ display: "flex", fontSize: 88, fontWeight: 600, lineHeight: 1.02 }}>
          Aprender a Amar
        </div>
        <div style={{ display: "flex", fontSize: 36, marginTop: 24, opacity: 0.9 }}>
          Basado en El arte de amar de Erich Fromm
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 32,
            background: "#FBF3EE",
            color: "#B11226",
            padding: "16px 32px",
            borderRadius: 999,
            alignSelf: "flex-start",
            fontWeight: 700,
          }}
        >
          {`$${siteConfig.price} ${siteConfig.currency} · 4 sesiones`}
        </div>
      </div>
    ),
    { ...size },
  );
}
