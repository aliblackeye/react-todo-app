import { useState } from 'react';
import { useTodo } from '../../context/TodoContext';
import TodoItem from "./TodoItem";
import { toast } from 'react-toastify';

function TodoApp() {

    const { todoList, setTodoList, selectAll, setSelectAll, showList, setShowList } = useTodo()

    const [todoInput, setTodoInput] = useState("");

    const [filterMode, setFilterMode] = useState("all");

    const taskRemained = todoList.length - (todoList.filter(todo => todo.isCompleted)).length

    // Tümünü seç butonuna tıklandığında olan işlemler
    const handleSelectAll = () => {


        setSelectAll(!selectAll);

        let newTodoList = todoList;

        if (!selectAll) {
            newTodoList.forEach((todo) => {
                todo.isCompleted = true;
            })
            setTodoList(newTodoList);
        }

        else {
            newTodoList.forEach((todo) => {
                todo.isCompleted = false;
            })
            setTodoList(newTodoList);
        }

    }

    const handleTodoInput = (e) => {
        setTodoInput((e.target.value).trim())
    }

    const handleAddTodo = () => {
        if (todoInput) {
            setTodoList([...todoList, { id: (todoList.length) + 1, task: todoInput, isCompleted: false }]);
            toast.success("Görev eklendi!")
        }

        else {
            toast.error("Görev belirtmediniz!")
        }
    }

    const handleShowAll = () => {
        setFilterMode("all")
        setShowList(todoList)


    }

    const handleShowActives = () => {
        setFilterMode("actives")
        const actives = todoList.filter(todo => (
            todo.isCompleted !== true
        ))
        setShowList(actives)

    }

    const handleShowCompleted = () => {
        setFilterMode("completed")
        const completed = todoList.filter(todo => (
            todo.isCompleted === true
        ))
        setShowList(completed)
    }

    const handleClear = () => {
        const notCompleted = todoList.filter(todo => (
            todo.isCompleted !== true
        ))

        setTodoList(notCompleted)
    }

    return (
        <div className="todo-app-wrapper">

            <h1 className="todo-app-title">Todo List</h1>
            <div className="todo-app">
                <div className="todo-app-top">
                    <div className="check check-all"><div className="square" onClick={handleSelectAll}><div className={`tick ${selectAll && "active"}`}>✔️</div></div></div>
                    <input type="text" className="add-todo-text" placeholder="Yeni görev ekle..." onChange={handleTodoInput} />
                    <button className="add-todo-btn" onClick={handleAddTodo}>Ekle</button>
                </div>

                <div className="todo-app-middle">
                    {showList.sort((a, b) => {
                        return a.id - b.id;
                    }).map((todo) => (
                        <TodoItem key={todo.id} text={todo.task} isCompleted={todo.isCompleted} id={todo.id} />
                    ))}

                </div>

                <div className="todo-app-bottom">
                    <div className="todo-counter">
                        {taskRemained > 0 ? taskRemained + " görev kaldı" : "Görev kalmadı"}
                    </div>
                    <div className="todo-filter">
                        <button className={`all ${filterMode === "all" && "clicked"}`} onClick={handleShowAll}>Tümü</button>
                        <button className={`actives ${filterMode === "actives" && "clicked"}`} onClick={handleShowActives}>Aktif</button>
                        <button className={`completed ${filterMode === "completed" && "clicked"}`} onClick={handleShowCompleted}>Tamamlananlar</button>
                    </div>
                    <div className="todo-clear">
                        <button className="clear" onClick={handleClear}>Tamamlananları Temizle</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TodoApp