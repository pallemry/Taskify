import './CardList.css'
import { CardListProps } from './CardListProps'
import Card from '../Card/Card';
import { removeElement } from '../../../../utils/utils';
import { Todo } from '../../../../Models/Todo';
import { useEffect, useState } from 'react';

const CardList: React.FC<CardListProps> = ({todos, setTodos}) => {

  const deleteTask = (id: string) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  const updateIsDone = (id: string, isDone: boolean | null = null) => {
    let result: boolean | undefined;
    setTodos(todos.map(t => {
      if (t.id === id) {
        if (isDone) {
          t.isDone = isDone;
        } else {
          t.isDone = !t.isDone;
        }

        result = t.isDone;
      }
      return t;
    }))
    return result;
  }

  const updateMessage = (id: string, message: string) => {
    let result: string | undefined;
    setTodos(todos.map(t => {
      if (t.id === id) {
        t.message = message;
        result = t.message;
      }
      return t;
    }));
    return result;
  }

  return (
    <ul className='todos'>
      {
        todos.map(todo => {
          return <Card 
           updateIsDone={updateIsDone}
           updateMessage={updateMessage}
           deleteTask={deleteTask}
           todo={todo}
           key={todo.id} 
           todos={todos} 
           setTodos={setTodos}/>
        })
      }
    </ul>
  )
}

export default CardList;