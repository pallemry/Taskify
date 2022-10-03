import { Todo } from '../../../Models/Todo';

export interface CardPropTypes {
    updateIsDone(id: string): boolean | undefined;
    updateMessage(id: string, message: string): string | undefined
    deleteTask(id: string): void;
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
