import React, { useState, useContext, useEffect } from "react";
import { useGlobalcontext } from "../ContextAPI";

/** */
import { v4 as uuidv4 } from "uuid";
/** */


const Collections = () => {
   const { Credentials, server_url } = useGlobalcontext();

   /** */
   const [todos, setTodos] = useState([]);
   const [todoText, setTodoText] = useState("");
   const [filter, setFilter] = useState("uncompleted");

   const persist = (newTodos) => {
      fetch(`${server_url}/collections`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            // Authorization: `Basic ${Credentials.username}:${Credentials.password}`,
            Authorization: `Basic ${Credentials}`,
         },
         body: JSON.stringify(newTodos),
      }).then(() => { });
   };

   useEffect(() => {
      fetch(`${server_url}/collections`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            // Authorization: `Basic ${Credentials.username}:${Credentials.password}`,
            Authorization: `Basic ${Credentials}`,
         },
      })
         .then((response) => response.json())
         .then((todos) => setTodos(todos));
   }, []);

   const addTodo = (e) => {
      e.preventDefault();
      if (!todoText) return;
      const newTodo = { id: uuidv4(), checked: false, text: todoText };
      const newTodos = [...todos, newTodo];
      setTodos(newTodos);
      setTodoText("");
      persist(newTodos);
   };

   const toggleTodo = (id) => {
      const newTodoList = [...todos];
      const todoItem = newTodoList.find((todo) => todo.id === id);
      todoItem.checked = !todoItem.checked;
      setTodos(newTodoList);
      persist(newTodoList);
   };

   const getTodos = () => {
      return todos.filter((todo) =>
         filter === "completed" ? todo.checked : !todo.checked
      );
   };

   const changeFilter = (newFilter) => {
      setFilter(newFilter);
   };
   /** */

   return (<>
      <div>Collections</div>

      {/*  */}
      <div>
         <select value={filter} onChange={(e) => changeFilter(e.target.value)}>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
         </select>

         {getTodos().map((todo) => (
            <div key={todo.id}>
               <input
                  checked={todo.checked}
                  onChange={() => toggleTodo(todo.id)}
                  type="checkbox"
               />
               <label>{todo.text}</label>
            </div>
         ))}
         <br />
         <form onSubmit={addTodo}>
            <input
               value={todoText}
               onChange={(e) => setTodoText(e.target.value)}
               type="text"
            ></input>
            <button type="submit">Add</button>
         </form>
      </div>
      {/*  */}

   </>)
}

export default Collections;
