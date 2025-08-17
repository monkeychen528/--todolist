import { useRef, useState } from "react";
import clsx from "clsx";

import { TodoItem } from "./todoType";

import styles from "./TodoItem.module.scss";
import Trash from "./icons/Trash";

interface TodoItemProp {
  obj: TodoItem;
  handleEdit: (
    id: number,
    mutateDate: Record<string, string | boolean>
  ) => void;
  handleDelete: (id: number) => void;
}
const TodoLi = ({ obj, handleEdit, handleDelete }: TodoItemProp) => {
  const [isSelect, setIsSelected] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);

  const handleSelect = () => {
    setIsSelected((prev) => !prev);
  };

  const handleEditConfirm = (id: number) => {
    if (!titleRef.current) return;
    handleEdit(id, { title: titleRef.current.value });
    handleSelect();
  };
  return (
    <li className={styles.list}>
      <input
        name="complete"
        className={clsx(styles.check, isSelect && !obj.isCompleted && styles.checkDisabled)}
        type="checkbox"
        checked={obj.isCompleted}
        onClick={() =>!isSelect && handleEdit(obj.id, { isCompleted: !obj.isCompleted })}
        onChange={() => void 0}
      />

      <div
        className={clsx(
          styles.list__titleWrap,
          obj.isCompleted && styles.list__titleComplete,
          obj.isCompleted && 'list__titleComplete'
        )}
      >
        {isSelect ? (
          <>
            <input
              className={styles.list__titleEdit}
              name="editTitleInput"
              aria-label="editTitleInput"
              ref={titleRef}
              defaultValue={obj.title}
              type="text"
            />
            <button
              className={styles.list__titleEdit__submit}
              onClick={() => handleEditConfirm(obj.id)}
            >
              確認
            </button>
          </>
        ) : (
          <div className={styles.list__title} onClick={handleSelect}>
            <p>{obj.title}</p>
          </div>
        )}
      </div>

      <div>
        {new Date(obj.createdAt).toLocaleDateString()}{" "}
        {new Date(obj.createdAt).toLocaleTimeString([], { hour12: false })}
      </div>

      <button
        type="button"
        className={styles.delete}
        onClick={() => handleDelete(obj.id)}
      ><Trash /></button>
    </li>
  );
};

export default TodoLi;
