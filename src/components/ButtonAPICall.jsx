import React from "react";
import axios from "axios";

const ButtonAPICall = () => {
  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      console.log(response.data);
    } catch (error) {
        console.log(error.message)
    }
  };

  return (
    <div>
      <h1>woah, it's a button</h1>
      <button onClick={fetchTodos}>Fetch Todos</button>
    </div>
  );
};

export default ButtonAPICall;
