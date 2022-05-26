import { useEffect, useState } from "react";
import { useStorage } from "@capacitor-community/storage-react/dist";

const STORAGE_KEY = "yet-another-todo-list";
export function useFonctionment() {
  const [list, setTodos] = useState([]);

  const { get, set } = useStorage();

  useEffect(() => {
    async function run() {
      const storedList = await get(STORAGE_KEY);

      if (storedList) {
        try {
          const parsedList = JSON.parse(storedList);
          setTodos(parsedList);
        } catch {}
      }
    }
    run();
  }, [get, setTodos]);

  useEffect(() => {
    set(STORAGE_KEY, JSON.stringify(list));
  }, [set, list]);

  function addTodo(text) {
    setTodos((todos) => {
      console.log(text);
      console.log(todos);
      return [...todos, { text: text, done: false, id: generateId() }];
    });
  }

  function updateTodo(id, overrides) {
    setTodos((todos) => {
      return todos.map((item) => {
        if (item.id === id) {
          console.log(item);
          console.log(overrides);
          return {
            ...item,
            ...overrides,
          };
        }
        // eslint-disable-next-line no-restricted-globals
        return item;
      });
    });
    window.location.reload();
  }

  function deleteTodo(id) {
    setTodos((todos) => {
      return todos.filter((item) => {
        if (item.id === id) {
          return false;
        }
        return true;
      });
    });
  }

  return { list, addTodo, updateTodo, deleteTodo };
}

function generateId() {
  return Date.now();
}
