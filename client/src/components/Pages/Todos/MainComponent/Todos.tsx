import { motion } from 'framer-motion';
import React, { useEffect } from 'react'
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { Todo } from '../../../../Models/Todo';
import { uuidv4 } from '../../../../utils/utils';
import CardList from '../CrardList/CardList';
import InputField from '../InputField/InputField';
import './Todos.css'

type Props = {}

const Todos = ({ }: Props) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  useEffect(() => {
    setTodos([...todos]);
  }, [todos.length])

  const handleAdd = (message: string): void => {
    let todo: Todo = {
      id: uuidv4(),
      message: message,
      isDone: false
    };
    todos.push(todo);
    setTodos([...todos]);
  }

  const clearTodos = (): void => {
    setTodos([]);
  }

  return (
    <motion.div 
    id="todos"
    initial={{width: 0}}
    animate={{width: '90%'}}
    exit={{x: window.innerWidth, transition: {duration: 0.1}}}
    >
      {/* Footer */}
      <div style={{margin: '15px 0px'}}></div>
      <InputField handleAdd={handleAdd} clearTodos={clearTodos} />
      <CardList todos={todos} setTodos={setTodos} />
    </motion.div>
  );
}

export default Todos;
