import { useState } from "react";

import * as React from "react";
import { Tooltip } from "radix-ui";
import { PlusIcon } from "@radix-ui/react-icons";
// import "./styles.css";

const TooltipDemo = () => {
	return (
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger asChild>
					<button className="IconButton">
						<PlusIcon />
					</button>
				</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content className="TooltipContent" sideOffset={5}>
						Add to library
						<Tooltip.Arrow className="TooltipArrow" />
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>
	);
}

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
      <TooltipDemo />
    </div>
  );
}
