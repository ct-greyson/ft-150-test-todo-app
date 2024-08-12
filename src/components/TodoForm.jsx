import React, { useState } from "react";
import axios from "axios";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("");

  const postTodos = async () => {
    // const post = {
    //     title: title,
    //     body: body,
    //     userId: parseInt(userId),
    // }
    const post = {
      title,
      body,
      userId: parseInt(userId),
    };
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      post,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postTodos();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="text"
          name="body"
          placeholder="body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
        />
        <input
          type="text"
          name="userId"
          placeholder="userId"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TodoForm;
