import React from "react";
import "./TodoItem.css";

const TodoItem = ({ todo, onChangeComplete, removeHandle }) => {
    return (
        <div className="todo-list">
            <div className="form-cBox">
                <label className="cBox-cus">
                    <input
                        className="cBox"
                        type="checkbox"
                        checked={todo.completed}
                        onChange={(e) =>
                            onChangeComplete(todo.id, e.target.checked)
                        }
                    />
                    <span className="cus">
                        <svg
                            className="tick"
                            width="13"
                            height="8"
                            viewBox="0 0 18 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M17 1L6 12L1 7"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                </label>
                <div className="todoContent">
                    <span
                        className={`titleTodo ${
                            todo.completed ? "checked" : ""
                        }`}
                    >
                        {todo.title}
                    </span>
                    <span className="descTodo">{todo.description}</span>
                </div>
            </div>

            <button onClick={() => removeHandle(todo.id)}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4d4e5e"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-x"
                >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    );
};

export default TodoItem;
