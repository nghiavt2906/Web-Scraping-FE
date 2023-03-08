import { describe, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Login from "./Login";

import MockProvider from "../../../test/MockProvider";

describe("Login page test", () => {
  test("Renders login page correctly", () => {
    render(
      <MockProvider>
        <Login />
      </MockProvider>
    );

    expect(screen.getByPlaceholderText(/Username/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/Password/i)).toBeDefined();
    expect(screen.getByRole("button", { name: "Login" })).toBeDefined();
  });

  test("Alert error if password is empty", async () => {
    render(
      <MockProvider>
        <Login />
      </MockProvider>
    );

    await userEvent.type(screen.getByPlaceholderText(/Username/i), "test");
    await userEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(
      screen.getByText("Username and password are required!")
    ).toBeDefined();
  });

  test("Alert error if username is empty", async () => {
    render(
      <MockProvider>
        <Login />
      </MockProvider>
    );

    await userEvent.type(screen.getByPlaceholderText(/Password/i), "abc123");
    await userEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(
      screen.getByText("Username and password are required!")
    ).toBeDefined();
  });

  test("Alert error if both username and password are empty", async () => {
    render(
      <MockProvider>
        <Login />
      </MockProvider>
    );

    await userEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(
      screen.getByText("Username and password are required!")
    ).toBeDefined();
  });
});
