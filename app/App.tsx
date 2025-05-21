import { useState } from "react";

export default function App() {
  // useState(1);
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1
        className="text-3xl font-bold underline"
        onClick={() => {
          setCount((c) => c + 1);
        }}
      >
        Hello World {count}
      </h1>
    </div>
  );
}
