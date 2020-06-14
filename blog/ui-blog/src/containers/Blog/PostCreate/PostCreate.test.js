import React from "react";
import PostCreate from "./PostCreate";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

jest.mock("axios");

it("renders correctly", async () => {
  axios.post.mockImplementation(() => Promise.resolve({ status: 201, data: {
    id: "hello-world",
    title: "Hello World", 
    publishDate: "2020-01-01",
    readMinutes: 1,
    tags: ["tag1", "tag2", "tag3"],
    content: "Content",
  }}));

  await act(async () => {
    render(<MemoryRouter initialEntries={["/blog"]}><PostCreate id={"hello-world"} /></MemoryRouter>);
  })

  // log: document.body.innerHTML
  fireEvent.input(screen.getByPlaceholderText("Title"), { target: { value: "Hello World" } });
  fireEvent.input(screen.getByPlaceholderText("Your post"), { target: { value: "Content" } });
  fireEvent.input(screen.getByPlaceholderText("Add tags"), { target: { value: "tag1 tag2 tag3" } });

  expect(screen.getByDisplayValue(/Hello World/)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/Content/)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/tag1 tag2 tag3/)).toBeInTheDocument();

  expect(screen.getByTestId("post-close")).toHaveAttribute("href", "/blog");
  expect(axios.post.mock.calls.length).toBe(0);
  fireEvent.click(screen.getByTestId("post-create"));
  expect(axios.post.mock.calls.length).toBe(1);
});
