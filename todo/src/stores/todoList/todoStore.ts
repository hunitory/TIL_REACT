import { create } from "zustand";

export interface Todo {
  id: number;
  title: string;
  filter: "All" | "Done" | "Undo";
  isCompleted: boolean;
}

interface StoredData {
  todos: Todo[];
  timestamp: number;
}

export type TodoStore = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  addTodo: (title: string) => void;
  CompletedTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

// data expiration time
const EXPIRATION_TIME = 24 * 60 * 60 * 1000;
// 10 seconds
// const EXPIRATION_TIME = 10 * 100;

// load initial todos from localStorage before backend connection
const loadInitialTodos = (): Todo[] => {
  try {
    const savedData = localStorage.getItem("todos");
    if (savedData) {
      const parsedData = JSON.parse(savedData) as StoredData;

      // check expiration time
      const now = Date.now();
      if (now - parsedData.timestamp > EXPIRATION_TIME) {
        alert("데이터가 만료되었습니다.");
        localStorage.removeItem("todos");
        return [];
      }

      if (Array.isArray(parsedData.todos)) {
        return parsedData.todos;
      }
    }
  } catch (error) {
    console.error("Error loading initial todos:", error);
  }
  return [];
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: loadInitialTodos(),

  // set todos function
  setTodos: (todos) => {
    set({ todos });
  },

  // add todo function
  addTodo: (title) => {
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: state.todos.length + 1,
          title,
          filter: "Undo",
          isCompleted: false,
        },
      ],
    }));
  },

  // completed todo function
  CompletedTodo: (id) => {
    set((state) => {
      return {
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        ),
      };
    });
  },

  // delete todo function
  deleteTodo: (id) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }));
  },
}));

// type TodoActions = {
//   addTodo: (title: string) => void;
//   CompletedTodo: (id: number) => void;
// };

// type TodoStore = {
//   todos: Todo[];
//   action: TodoActions;
// };

// export const useTodoStore = create<TodoStore>((set) => ({
//   todos: [],
//   action: {
//     addTodo: (title: string) => {
//       set((state) => ({
//         todos: [
//           ...state.todos,
//           {
//             id: state.todos.length + 1,
//             title,
//             filter: 'Undo',
//             isCompleted: false,
//           },
//         ],
//       }));
//     },
//     CompletedTodo: (id: number) => {
//       set((state) => ({
//         todos: state.todos.map((todo) =>
//           todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
//         ),
//       }));
//     },
//   },
// }));
