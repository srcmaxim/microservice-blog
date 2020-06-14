import React from "react";
import PostEdit from "./PostEdit";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

jest.mock("axios");

it("renders correctly", async () => {
  axios.get.mockImplementation(() => Promise.resolve({ status: 200, data: {
    id: "hello-world",
    title: "Hello World", 
    publishDate: "2020-01-01",
    readMinutes: 1,
    tags: ["tag1", "tag2", "tag3"],
    content: "Content",
  }}));
  axios.put.mockImplementation(() => Promise.resolve({ status: 200 }));

  await act(async () => {
    render(<MemoryRouter initialEntries={["/blog"]}><PostEdit id={"hello-world"} /></MemoryRouter>);
  })

  // log: document.body.innerHTML
  expect(axios.get.mock.calls.length).toBe(1);
  expect(screen.getByDisplayValue(/Hello World/)).toBeInTheDocument();
  expect(screen.getByText(/Content/)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/tag1 tag2 tag3/)).toBeInTheDocument();
  expect(screen.getByTestId("post-close")).toHaveAttribute("href", "/blog/hello-world");
  
  expect(axios.put.mock.calls.length).toBe(0);
  fireEvent.click(screen.getByTestId("post-edit"));
  expect(axios.put.mock.calls.length).toBe(1);
});
