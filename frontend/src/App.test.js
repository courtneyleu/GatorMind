import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Router } from "express";

it("renders without crashing", () => {
  const div = document.createElement("div");
  render(<App />, div);
});

test("renders the landings page", () => {
  render(
    <Router>
      <App />
    </Router>
  );

  <form aria-labelledby="form-label-element-id" aria-hidden />;

  expect(screen.getByRole("heading")).toHaveTextContent("Gator Mind");
  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
    "A safe space to share"
  );
  expect(screen.getByRole("button", { name: "Login" })).toBeDisabled();
  expect(screen.getByRole("button", { name: "Register" })).toBeDisabled();
});
