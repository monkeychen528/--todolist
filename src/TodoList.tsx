import React, { useState, useEffect, useRef } from "react";
import { FilterType, TodoItem } from "./todoType";
import TodoLi from "./TodoItem";
import useLocalStorage from "./useLocalStorage";

import styles from "./TodoList.module.scss";

const filterValues: FilterType[] = ["all", "completed", "incomplete"];

// 請實作 TodoApp 組件
// 請實作以下功能：
// 1. 待辦事項列表狀態管理
// 2. 新增待辦事項功能
// 3. 切換完成狀態功能
// 4. 刪除待辦事項功能
// 5. 篩選功能
// 6. localStorage 持久化儲存
// 7. 編輯待辦事項功能

const TodoApp: React.FC = () => {
  // 請在此處實作狀態管理和相關邏輯
  const [todos, setTodos] = useState<TodoItem[]>([
    {
      id: new Date().getTime(),
      title: "測試",
      isCompleted: false,
      createdAt: new Date(),
    },
  ]);
  const [filterTodos, setFilterTodos] = useState<TodoItem[]>([]);
  const [filtertype, setFilterType] = useState<FilterType>("all");

  const { getTodo, saveTodo } = useLocalStorage();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCreate = () => {
    const _input = inputRef.current;
    const _val = _input?.value;
    if (!_input || !_val || !_val.trim()) return;
    const todoObj = {
      id: new Date().getTime(),
      title: _val,
      isCompleted: false,
      createdAt: new Date(),
    };
    setTodos((prev) => {
      return [...prev, todoObj];
    });
    saveTodo([...todos, todoObj]);
    inputRef.current!.value = "";
  };

  const handleEdit = async (
    id: number,
    mutate: Record<string, string | boolean>
  ) => {
    const newTodoObj = todos.map((obj) => {
      if (obj.id === id) {
        return {
          ...obj,
          ...mutate,
          //   isCompleted: !obj.isCompleted,
        };
      }

      return obj;
    });
    setTodos(newTodoObj);
    saveTodo(newTodoObj, () => showFilterData(filtertype, newTodoObj));
  };

  const handleDelete = (id: number) => {
    const newTodoObj = todos.filter((obj) => {
      return obj.id !== id;
    });
    setTodos(newTodoObj);
    saveTodo(newTodoObj, () => showFilterData(filtertype, newTodoObj));
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const _val = e.target.value as FilterType;
    setFilterType(_val);
    showFilterData(_val, todos);
  };

  const showFilterData = (type: FilterType, filterData: TodoItem[]) => {
    if (type === "completed")
      setFilterTodos(filterData.filter((obj) => obj.isCompleted));
    if (type === "incomplete")
      setFilterTodos(filterData.filter((obj) => !obj.isCompleted));
    if (type === "all") setFilterTodos([]);
  };

  useEffect(() => {
    const data = getTodo();
    if (data.legnth === 0) return;
    setTodos(data);
  }, []);

  return (
    <div className={styles["todo-app"]}>
      <div className={styles.actions}>
        <select
          name="filter"
          id="filter"
          className={styles.actions__filter}
          onChange={handleFilter}
        >
          {filterValues.map((str) => (
            <option key={str} value={str}>
              {str}
            </option>
          ))}
        </select>
        <input
          name="todoInput"
          id="todoInput"
          className={styles.actions__input}
          ref={inputRef}
          placeholder="輸入您的代辦事項"
        />
        <button
          name="submit"
          className={styles.actions__submit}
          type="button"
          onClick={handleCreate}
        >建立</button>
      </div>

      <div className={styles.content}>
        <ul className={styles.listWrap}>
          {filtertype === "all"
            ? todos.map((obj) => (
                <TodoLi
                  key={obj.id}
                  obj={obj}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))
            : filterTodos.map((obj) => (
                <TodoLi
                  key={obj.id}
                  obj={obj}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              ))}
        </ul>
      </div>
    </div>
  );
};

export default function TodoList() {
  return (
    <>
      <TodoApp />
    </>
  );
}
