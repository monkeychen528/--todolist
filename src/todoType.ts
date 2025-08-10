// 待辦事項類型定義
interface TodoItem {
  id: number;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
}

// 篩選類型
type FilterType = "all" | "completed" | "incomplete";

export { TodoItem, FilterType };
