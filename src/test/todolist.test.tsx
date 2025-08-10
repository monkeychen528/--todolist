import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { it, expect, describe } from "vitest";
import TodoList from "../TodoList";

// 請撰寫單元測試
// describe("TodoApp", () => {
//   // 測試 1: 新增待辦事項
//   // 測試 2: 切換完成狀態
//   // 可以增加更多測試案例
// });
describe("TodoApp", () => {
  it("should add a new todo item", async () => {
    const user = userEvent.setup();

    render(<TodoList />);

    // 找到輸入框與建立按鈕
    const input = screen.getByPlaceholderText("輸入您的代辦事項");
    const button = screen.getByRole("button", { name: "建立" });

    // 模擬輸入
    await user.type(input, "新的待辦事項");
    // 模擬點擊
    await user.click(button);

    // 檢查畫面是否包含新的項目
    expect(screen.getByText("新的待辦事項")).toBeInTheDocument();
  });

  it("switch state should success", async () => {
    const user = userEvent.setup();
    // keep前次
    const radio = screen.getByRole("radio");

    expect(radio).not.toBeChecked();
    await user.click(radio);

    // 確認已勾選
    expect(radio).toBeChecked();
  });

  it("lock should not be edited", async () => {
    const user = userEvent.setup();
    const radio = screen.getByRole("radio");
    expect(radio).toBeChecked();

    const titleDiv =
      screen.getByText("新的待辦事項").parentElement?.parentElement;
    expect(titleDiv).toBeInTheDocument();
    await user.click(titleDiv!);

    expect(titleDiv).toHaveClass(/list__titleComplete/);
  });

  it("unlock should be editable", async () => {
    const user = userEvent.setup();
    const radio = screen.getByRole("radio");

    expect(radio).toBeChecked();
    await user.click(radio);

    const titleDiv = screen.getByText("新的待辦事項");
    expect(titleDiv).toBeInTheDocument();

    // 點擊標題
    await user.click(titleDiv);

    // 確認 input 出現且預設值為標題
    const input = screen.getByRole("textbox", { name: "editTitleInput" });
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("新的待辦事項");
  });
});
