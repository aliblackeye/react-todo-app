import TodoApp from './components/TodoApp/TodoApp';
import TodoProvider from './context/TodoContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {

  return (
    <div className="App">
      <ToastContainer />
      <TodoProvider>
        <TodoApp />
      </TodoProvider>
    </div>
  );
}

export default App;
