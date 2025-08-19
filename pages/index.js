import { useEffect, useState } from "react";
import { useRouter } from "next/router";

console.log("📄 index.js loaded");

export default function Landing() {
  const router = useRouter();
  const [redirectUri, setRedirectUri] = useState("");

  useEffect(() => {
    console.log("🚀 useEffect in Landing triggered");

    if (typeof window !== "undefined") {
      setRedirectUri(`${window.location.origin}/home/`);
    }
  }, [router]);

  const cognitoDomain =
    "https://digitalstorefrontendbb2ec967-bb2ec967-dev.auth.us-east-1.amazoncognito.com/";
  const clientId = "34c4ebfhi8pgqo0dq76rl7hfuq";

  const signInUrl = redirectUri
    ? `${cognitoDomain}/login?client_id=${clientId}&response_type=code&scope=email+openid+profile&redirect_uri=${encodeURIComponent(
        redirectUri
      )}`
    : "#";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "1rem" }}>
        Welcome to Digital Store
      </h1>
      <p
        style={{
          fontSize: "1.25rem",
          maxWidth: "450px",
          marginBottom: "3rem",
          opacity: 0.9,
        }}
      >
        Discover and buy premium digital templates crafted for creators like you.
      </p>
      <a
        href={signInUrl}
        style={{
          backgroundColor: "#ffcc00",
          color: "#333",
          fontWeight: "bold",
          borderRadius: "50px",
          padding: "0.75rem 3rem",
          fontSize: "1.25rem",
          textDecoration: "none",
          transition: "background-color 0.3s ease",
          cursor: "pointer",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#ffdb4d")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ffcc00")}
      >
        Sign In
      </a>
    </div>
  );
}
