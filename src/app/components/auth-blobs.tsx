"use client";

/**
 * Slow-moving soft blobs for auth pages (login/signup).
 * Inline styles + keyframes in component so they always apply (no reliance on globals.css).
 */
const BLOB_KEYFRAMES = `
@keyframes auth-blob-1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(40px, -30px) scale(1.05); }
  66% { transform: translate(-20px, 25px) scale(0.98); }
}
@keyframes auth-blob-2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(-35px, 40px) scale(1.02); }
  66% { transform: translate(25px, -20px) scale(0.96); }
}
@keyframes auth-blob-3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-30px, -25px) scale(1.08); }
}
@keyframes auth-blob-4 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(28px, 35px) scale(0.95); }
}
`;

const blobBase = {
  position: "absolute" as const,
  borderRadius: "50%",
  filter: "blur(80px)",
  pointerEvents: "none" as const,
};

export function AuthBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <style dangerouslySetInnerHTML={{ __html: BLOB_KEYFRAMES }} />
      <div
        style={{
          ...blobBase,
          width: "min(420px, 55vw)",
          height: "min(420px, 55vw)",
          left: "-10%",
          top: "-5%",
          background: "rgba(147, 197, 253, 0.55)",
          animation: "auth-blob-1 12s ease-in-out infinite",
        }}
      />
      <div
        style={{
          ...blobBase,
          width: "min(380px, 50vw)",
          height: "min(380px, 50vw)",
          right: "-8%",
          bottom: "-5%",
          background: "rgba(196, 181, 253, 0.5)",
          animation: "auth-blob-2 14s ease-in-out infinite",
        }}
      />
      <div
        style={{
          ...blobBase,
          width: "min(320px, 42vw)",
          height: "min(320px, 42vw)",
          right: "15%",
          top: "20%",
          background: "rgba(253, 230, 138, 0.5)",
          animation: "auth-blob-3 13s ease-in-out infinite",
        }}
      />
      <div
        style={{
          ...blobBase,
          width: "min(300px, 40vw)",
          height: "min(300px, 40vw)",
          left: "10%",
          bottom: "15%",
          background: "rgba(153, 246, 228, 0.45)",
          animation: "auth-blob-4 15s ease-in-out infinite",
        }}
      />
    </div>
  );
}
