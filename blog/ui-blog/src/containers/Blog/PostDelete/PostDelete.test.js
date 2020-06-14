import React from "react";
import PostDelete from "./PostDelete";
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
  axios.delete.mockImplementation(() => Promise.resolve({ status: 200 }));

  await act(async () => {
    render(<MemoryRouter initialEntries={["/blog"]}><PostDelete id={"hello-world"} /></MemoryRouter>);
  })

  // log: document.body.innerHTML
  expect(axios.get.mock.calls.length).toBe(1);
  expect(screen.getByText(/Hello World/)).toBeInTheDocument();
  expect(screen.getByTestId("post-close")).toHaveAttribute("href", "/blog/hello-world");
  
  expect(axios.delete.mock.calls.length).toBe(0);
  fireEvent.click(screen.getByTestId("post-delete"));
  expect(axios.delete.mock.calls.length).toBe(1);
});
