import React, { useState, useEffect } from "react";
import "./Todo.css";
import TodoItem from "./TodoItem";
import axios from "axios";

const API_URL = "http://localhost:8080/api/tasks";

const Todo = (props) => {
    const [todoList, setTodoList] = useState([]);
    const [todoInput, setTodoInput] = useState({ title: "", description: "" });
    const [type, setType] = useState("All");
    const [theme, setTheme] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await axios.get(API_URL);
            setTodoList(res.data);
        } catch (err) {
            console.error("Error fetching tasks:", err);
        }
    };

    // change theme
    useEffect(() => {
        const { changeTheme } = props;
        changeTheme(theme);
    }, [props, theme]);

    // Handle create new task
    const submitHandle = async (e) => {
        e.preventDefault();
        if (!todoInput.title || !todoInput.description) {
            setError(true);
            return;
        }

        setError(false); // clear error if valid

        try {
            const res = await axios.post(API_URL, {
                title: todoInput.title,
                description: todoInput.description,
            });
            console.log(res.data);
            setTodoList([...todoList, res.data]);
            setTodoInput({ title: "", description: "" });
        } catch (err) {
            console.error("Error creating task:", err);
        }
    };

    // Handle input change
    const onChangeHandle = (e) => {
        const { name, value } = e.target;
        setTodoInput({
            ...todoInput,
            [name]: value,
        });
    };

    // Handle remove task
    const removeHandle = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setTodoList(todoList.filter((todo) => todo.id !== id));
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    };

    // Update completed status
    const onChangeComplete = async (id, completed) => {
        try {
            const res = await axios.put(`${API_URL}/${id}`, { completed });
            setTodoList(
                todoList.map((todo) =>
                    todo.id === id
                        ? { ...todo, completed: res.data.completed }
                        : todo
                )
            );
        } catch (err) {
            console.error("Error updating task:", err);
        }
    };

    const listTodoActive = todoList.filter((_todo) => !_todo.completed);
    const listTodoCompleted = todoList.filter((_todo) => _todo.completed);

    const showListTodo = () => {
        let listToDo = [];
        if (type === "All") listToDo = todoList;
        else if (type === "Active") listToDo = listTodoActive;
        else listToDo = listTodoCompleted;

        return listToDo.map((_todo) => (
            <TodoItem
                key={_todo.id}
                todo={_todo}
                onChangeComplete={onChangeComplete}
                removeHandle={removeHandle}
            />
        ));
    };

    const handleChangeType = (t) => setType(t);

    const clearCompleted = async () => {
        try {
            const completedTodos = todoList.filter((todo) => todo.completed);
            await Promise.all(
                completedTodos.map((todo) =>
                    axios.delete(`${API_URL}/${todo.id}`)
                )
            );
            setTodoList(todoList.filter((todo) => !todo.completed));
        } catch (err) {
            console.error("Error clearing completed:", err);
        }
    };

    const changeTheme = `${theme === true ? "light-theme" : ""}`;

    return (
        <main>
            <div className="main-container">
                <div className="todo-form">
                    <div className="todo-form--title">
                        <h1 className="title-todo" style={{ color: "white" }}>
                            <span>T</span>
                            <span>O</span>
                            <span>D</span>
                            <span>O</span>
                        </h1>
                        <button onClick={() => setTheme(!theme)}>
                            <svg
                                className={`sun-icon ${
                                    theme === true ? "animationOut" : ""
                                }`}
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M16 11C13.25 11 11 13.25 11 16C11 18.75 13.25 21 16 21C18.75 21 21 18.75 21 16C21 13.25 18.75 11 16 11Z"
                                    fill="black"
                                />
                                <path
                                    d="M16 7C16.6 7 17 6.6 17 6V3C17 2.4 16.6 2 16 2C15.4 2 15 2.4 15 3V6C15 6.6 15.4 7 16 7Z"
                                    fill="black"
                                />
                                <path
                                    d="M8.20005 9.59999C8.40005 9.79999 8.70005 9.89999 8.90005 9.89999C9.10005 9.89999 9.40005 9.79999 9.60005 9.59999C10 9.19999 10 8.59999 9.60005 8.19999L7.50005 6.09999C7.10005 5.69999 6.50005 5.69999 6.10005 6.09999C5.70005 6.49999 5.70005 7.09999 6.10005 7.49999L8.20005 9.59999Z"
                                    fill="black"
                                />
                                <path
                                    d="M7 16C7 15.4 6.6 15 6 15H3C2.4 15 2 15.4 2 16C2 16.6 2.4 17 3 17H6C6.6 17 7 16.6 7 16Z"
                                    fill="black"
                                />
                                <path
                                    d="M8.20005 22.4L6.10005 24.5C5.70005 24.9 5.70005 25.5 6.10005 25.9C6.30005 26.1 6.60005 26.2 6.80005 26.2C7.00005 26.2 7.30005 26.1 7.50005 25.9L9.60005 23.8C10 23.4 10 22.8 9.60005 22.4C9.20005 22 8.60005 22 8.20005 22.4Z"
                                    fill="black"
                                />
                                <path
                                    d="M16 25C15.4 25 15 25.4 15 26V29C15 29.6 15.4 30 16 30C16.6 30 17 29.6 17 29V26C17 25.4 16.6 25 16 25Z"
                                    fill="black"
                                />
                                <path
                                    d="M23.8001 22.4C23.4001 22 22.8001 22 22.4001 22.4C22.0001 22.8 22.0001 23.4 22.4001 23.8L24.5001 25.9C24.7001 26.1 25.0001 26.2 25.2001 26.2C25.4001 26.2 25.7001 26.1 25.9001 25.9C26.3001 25.5 26.3001 24.9 25.9001 24.5L23.8001 22.4Z"
                                    fill="black"
                                />
                                <path
                                    d="M29 15H26C25.4 15 25 15.4 25 16C25 16.6 25.4 17 26 17H29C29.6 17 30 16.6 30 16C30 15.4 29.6 15 29 15Z"
                                    fill="black"
                                />
                                <path
                                    d="M23.1001 9.89999C23.4001 9.89999 23.6001 9.79999 23.8001 9.59999L25.9001 7.49999C26.3001 7.09999 26.3001 6.49999 25.9001 6.09999C25.5001 5.69999 24.9001 5.69999 24.5001 6.09999L22.4001 8.19999C22.0001 8.59999 22.0001 9.19999 22.4001 9.59999C22.6001 9.79999 22.8001 9.89999 23.1001 9.89999Z"
                                    fill="black"
                                />
                            </svg>

                            <svg
                                className={`moon-icon ${
                                    theme === true ? "animationIn" : ""
                                }`}
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M24.86 15.53C24.7763 15.4719 24.6769 15.4408 24.575 15.4408C24.4731 15.4408 24.3737 15.4719 24.29 15.53C22.2378 16.7875 19.8218 17.3171 17.4318 17.0333C15.0417 16.7496 12.8169 15.669 11.1161 13.966C9.41539 12.2629 8.33788 10.0366 8.05737 7.6462C7.77687 5.25575 8.30973 2.8405 9.57001 0.789991C9.64434 0.704901 9.68766 0.597148 9.6929 0.48429C9.69815 0.371432 9.66503 0.260123 9.59892 0.168502C9.53281 0.0768808 9.43762 0.0103491 9.32887 -0.0202513C9.22011 -0.0508517 9.1042 -0.0437167 9.00001 -9.11951e-06C6.90336 0.655833 5.01135 1.84148 3.50688 3.44231C2.0024 5.04314 0.936355 7.00503 0.411775 9.13831C-0.112806 11.2716 -0.0781741 13.5041 0.512321 15.6201C1.10282 17.7361 2.2292 19.664 3.7826 21.2174C5.336 22.7708 7.26388 23.8972 9.37987 24.4877C11.4959 25.0782 13.7284 25.1128 15.8617 24.5882C17.995 24.0636 19.9569 22.9976 21.5577 21.4931C23.1585 19.9887 24.3442 18.0966 25 16C25.019 15.9162 25.0161 15.829 24.9916 15.7466C24.9671 15.6643 24.9218 15.5897 24.86 15.53Z"
                                    fill="white"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="todo-form--content">
                        <form
                            className={`todo-form--content__create ${changeTheme}`}
                            onSubmit={submitHandle}
                        >
                            <label className="cBox-cus">
                                <input
                                    className="cBox"
                                    style={{ pointerEvents: "none" }}
                                    type="checkbox"
                                />
                            </label>
                            <div className="inputTodo">
                                <input
                                    name="title"
                                    className={`iPut ${
                                        theme === true ? "light-text" : ""
                                    }`}
                                    placeholder="Enter todo title..."
                                    value={todoInput.title}
                                    onChange={onChangeHandle}
                                />
                                <div></div>
                                <input
                                    name="description"
                                    className={`iPut ${
                                        theme === true ? "light-text" : ""
                                    }`}
                                    placeholder="Enter todo description..."
                                    value={todoInput.description}
                                    onChange={onChangeHandle}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            submitHandle(e);
                                        }
                                    }}
                                />
                                {error && (
                                    <span
                                        style={{
                                            padding: "10px 0",
                                            color: "red",
                                        }}
                                    >
                                        Title and description are required!
                                    </span>
                                )}
                            </div>
                        </form>

                        <div
                            className={`todo-form--content__list ${changeTheme}`}
                        >
                            {showListTodo()}

                            <div className="info-todoList">
                                <span className="item-left">
                                    {type === "All"
                                        ? todoList.length
                                        : type === "Active"
                                        ? listTodoActive.length
                                        : listTodoCompleted.length}{" "}
                                    items left
                                </span>
                                <nav>
                                    <ul className="nav-list">
                                        <li className="nav-item">
                                            <button
                                                className={
                                                    type === "All"
                                                        ? "active"
                                                        : ""
                                                }
                                                onClick={() =>
                                                    handleChangeType("All")
                                                }
                                            >
                                                All
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                className={
                                                    type === "Active"
                                                        ? "active"
                                                        : ""
                                                }
                                                onClick={() =>
                                                    handleChangeType("Active")
                                                }
                                            >
                                                Active
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button
                                                className={
                                                    type === "Completed"
                                                        ? "active"
                                                        : ""
                                                }
                                                onClick={() =>
                                                    handleChangeType(
                                                        "Completed"
                                                    )
                                                }
                                            >
                                                Completed
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                                <button
                                    className="clearComp"
                                    onClick={clearCompleted}
                                >
                                    Clear completed
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Todo;
