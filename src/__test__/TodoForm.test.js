import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import TodoForm from "../components/TodoForm";

jest.mock("axios");

describe("Todo Form Component Tests", () => {
  test("submit form input to API", async () => {
    const mockResponse = {
      data: [
        {
          id: 100,
          title: "Clean house",
          body: "organize, mop, dust",
          userId: 1,
        },
      ],
    };
    axios.post.mockResolvedValue(mockResponse);

    const { getByText, getByPlaceholderText } = render(<TodoForm />);

    // filling out our form
    fireEvent.change(getByPlaceholderText("title"), {
      target: { name: "title", value: "Clean house" },
    });

    fireEvent.change(getByPlaceholderText("body"), {
      target: { name: "body", value: "organize, mop, dust" },
    });

    fireEvent.change(getByPlaceholderText("userId"), {
      target: { name: "userId", value: "1" },
    });

    fireEvent.click(getByText("Submit"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "https://jsonplaceholder.typicode.com/todos",
        {
          title: "Clean house",
          body: "organize, mop, dust",
          userId: 1,
        },
        {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
      );
    });
  });
});
