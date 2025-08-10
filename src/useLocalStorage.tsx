import { TodoItem } from "./todoType";

const useLocalStorage = () => {
  const getTodo = () => {
    const data = localStorage.getItem("todos");
    return data ? JSON.parse(data) : [];
  };

  const saveTodo = (todoData: TodoItem[], cb?: ()=>void) => {
    localStorage.setItem("todos", JSON.stringify(todoData));
    cb?.()
  };

  return { getTodo, saveTodo };
};

export default useLocalStorage;