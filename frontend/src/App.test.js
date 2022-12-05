import React from "react";
// import ReactDOM from "react-dom";
import { Routes, Route, Link } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import App from "./App";
import renderer from "react-test-renderer";
import { Router } from "express";

it("renders without crashing", () => {
  const div = document.createElement("div");
  render(<App />, div);
});

// test("renders the landings page", () => {
//   render(
//     <Router>
//       <App />
//     </Router>
//   );

//   <form aria-labelledby="form-label-element-id" aria-hidden />;

//   expect(screen.getByRole("heading")).toHaveTextContent("Gator Mind");
//   expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
//     "A safe space to share"
//   );
//   expect(screen.getByRole("button", { name: "Login" })).toBeDisabled();
//   expect(screen.getByRole("button", { name: "Register" })).toBeDisabled();
// });
