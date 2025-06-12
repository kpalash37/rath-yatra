import React from "react";

const YOUTUBE_VIDEO_ID = "YOUR_YOUTUBE_VIDEO_ID"; // Replace with your actual video ID

export default function LivePage() {
    return (
        <main style={{ minHeight: "100vh", background: "#f9fafb", padding: "2rem" }}>
            <section style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
                <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#1a202c" }}>
                    Rath Yatra Live Stream
                </h1>
                <p style={{ fontSize: "1.2rem", marginBottom: "2rem", color: "#4a5568" }}>
                    Watch the live stream of the Rath Yatra event below.
                </p>
                <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                    <iframe
                        src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1`}
                        title="Rath Yatra Live Stream"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            border: 0,
                        }}
                    />
                </div>
            </section>
        </main>
    );
}