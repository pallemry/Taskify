import React, { useEffect } from 'react'
import useLocalStorage from '../../../hooks/useLocalStorage';
import { Todo } from '../../../Models/Todo';
import { uuidv4 } from '../../../utils/utils';
import CardList from '../CrardList/CardList';
import InputField from '../InputField/InputField';

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
    <>
      <InputField handleAdd={handleAdd} clearTodos={clearTodos} />
      <CardList todos={todos} setTodos={setTodos} />
    </>
  );
}

export default Todos;
