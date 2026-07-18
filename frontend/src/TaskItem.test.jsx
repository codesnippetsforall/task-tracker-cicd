import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { TaskItem } from "./TaskItem";

describe("TaskItem", () => {
  test("calls onToggle when checkbox is clicked", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    const task = { id: 1, title: "Write CI workflow", done: false };

    render(
      <TaskItem task={task} onToggle={onToggle} onDelete={vi.fn()} />,
    );

    expect(screen.getByText("Write CI workflow")).toBeInTheDocument();
    await user.click(screen.getByRole("checkbox"));
    expect(onToggle).toHaveBeenCalledWith(task);
  });
});
