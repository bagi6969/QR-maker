"use client";
import { useQr } from "@/app/context/HistoryContext";

export default function HistoryPage() {
  const { urls } = useQr();

  return (
    <div style={{ padding: "20px" }}>
      <h1>History</h1>
      <p>Entered Urls:</p>
      <br />
      {urls.map((url, index) => (
        <div key={index}>
          {url}
          <br />
        </div>
      ))}
    </div>
  );
}
