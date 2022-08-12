import { createContext, useContext, useState } from "react";

const Context = createContext()

const Provider = ({ children }) => {

    const [todoList, setTodoList] = useState(
        [
            {
                id: 1,
                task: "Her şeye rağmen gül",
                isCompleted: false,
            },
            {
                id: 2,
                task: "Spor yap",
                isCompleted: false,
            },
            {
                id: 3,
                task: "Yüzmeye git",
                isCompleted: true,
            },
        ]);

    const [selectAll, setSelectAll] = useState(false);
    const [showList, setShowList] = useState([...todoList]);

    const data = {
        todoList: todoList,
        setTodoList: setTodoList,
        selectAll: selectAll,
        setSelectAll: setSelectAll,
        showList: showList,
        setShowList: setShowList,
    }

    return <Context.Provider value={data}>{children}</Context.Provider>
}

export const useTodo = () => useContext(Context)

export default Provider;

