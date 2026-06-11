export default function NotFound() {
  return (
    <main
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
        gap: "12px",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ fontSize: "40px", margin: 0 }}>404</h1>
      <p style={{ color: "#6b7280", margin: 0 }}>Page not found</p>
      <a
        href="/home"
        style={{
          color: "#111827",
          fontSize: "14px",
          textDecoration: "underline",
          textUnderlineOffset: "4px",
        }}
      >
        Back to Home
      </a>
    </main>
  );
}
