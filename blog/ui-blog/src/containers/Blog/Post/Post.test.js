import React from "react";
import Post from "./Post";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
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

  await act(async () => {
    render(<MemoryRouter initialEntries={["/blog"]}><Post id={"hello-world"} /></MemoryRouter>);
  })

  // log: document.body.innerHTML
  expect(screen.getByText(/Hello World/)).toBeInTheDocument();
  expect(screen.getByText(/January 1, 2020/)).toBeInTheDocument();
  expect(screen.getByText(/1 min/)).toBeInTheDocument();
  expect(screen.getByText(/tag1 tag2 tag3/)).toBeInTheDocument();
  expect(screen.getByText(/Content/)).toBeInTheDocument();
  
  expect(screen.getByTestId("header-link")).toHaveAttribute("href", "/blog/hello-world");
  expect(screen.getByTestId("post-edit")).toHaveAttribute("href", "/blog/hello-world/edit");
  expect(screen.getByTestId("post-delete")).toHaveAttribute("href", "/blog/hello-world/delete");
});
