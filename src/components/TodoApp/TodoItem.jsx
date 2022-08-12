import { useTodo } from "../../context/TodoContext"
import { toast } from 'react-toastify';

function TodoItem({ text, id, isCompleted }) {


    const { todoList, setTodoList } = useTodo();


    const handleCheck = () => {
        let updatedItem = (todoList.filter(todo => todo.id === id))[0];
        updatedItem.isCompleted = !(updatedItem.isCompleted)
        const filteredTodoList = (todoList.filter(todo => todo.id !== id));

        setTodoList([...filteredTodoList, updatedItem])
    }

    const handleRemove = () => {
        const filteredTodoList = (todoList.filter(todo => todo.id !== id));


        for (let i = 0; i < filteredTodoList.length; i++) {
            filteredTodoList[i].id = i + 1;
        }

        setTodoList([...filteredTodoList])
        toast.success("Görev silindi!")

    }

    return (
        <div className="todo-item">
            <div className="check"><div className="circle" onClick={handleCheck}><div className={`tick ${isCompleted && "active"}`}>✔️</div></div></div>
            <input type="text" className="todo-item-text" value={text} />
            <button className="remove" onClick={handleRemove}>x</button>
        </div>
    )
}

export default TodoItem