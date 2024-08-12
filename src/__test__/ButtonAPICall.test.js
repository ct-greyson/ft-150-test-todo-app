import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import ButtonAPICall from "../components/ButtonAPICall";

// create a fake version (a "mock" version) of our axios so we don't actually make API calls
jest.mock("axios");

// describe allows us to name a group of our tests and bundle them together into a block
// takes in a string describing what the tests are for, and a function to perform the tests
describe("ButtonAPICall Component Tests", () => {
  // block for the test itself
  // name should be specific/concise
  test("fetches data from API when button is clicked", async () => {
    // mock data to return from API
    const mockResponse = { data: [{ id: 1, title: "Buy food" }] };

    // mock the API call to return our mockResponse
    // when API is called, this is the call that will be made
    axios.get.mockResolvedValue(mockResponse)

    // first, we render our component to the fake DOM
    // we search for an element in that component with the text "Fetch Todos" (case sensitive) 
    // then we trigger a click event on that element
    const { getByText } = render(<ButtonAPICall />)
    fireEvent.click(getByText("Fetch Todos"))

    // what is the event supposed to do
    // waitFor waits for the event to be fired
    await waitFor(() => {
        // this is the API we are expecting to call with axios when the event has been triggered
        expect(axios.get).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/todos")
    })
  });

  //Snapshot/UI test
  test("Component matches snapshot", () => {
    // asFragment creates the snapshot for our code if one does not exist
    // it captures the current state of our UI that will be compared against for future testing
    // if a snapshot already exists, then we go straight to the comparison
    const { asFragment } = render(<ButtonAPICall />)
    expect(asFragment()).toMatchSnapshot(); //compares the current snapshot to the original 
  })
});


