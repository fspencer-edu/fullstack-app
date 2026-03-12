import { useEffect, useState } from "react";

export default function App() {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    fetch("/api/info")
      .then((res) => res.json())
      .then((data) => setInfo(data))
      .catch(() => setInfo({ error: "Backend not reachable" }));
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Production Fullstack App</h1>

      <p>Feature branch test update</p>

      <pre>{JSON.stringify(info, null, 2)}</pre>
    </div>
  );
}