import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import TodoList from "./TodoList";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <TodoList />
  </StrictMode>
);