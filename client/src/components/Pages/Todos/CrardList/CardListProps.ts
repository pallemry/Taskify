import { Todo } from '../../../../Models/Todo';

export interface CardListProps {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
