import { describe, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Signup from "./Signup";

import MockProvider from "../../../test/MockProvider";

describe("Singup page test", () => {
  test("Renders Signup page correctly", () => {
    render(
      <MockProvider>
        <Signup />
      </MockProvider>
    );

    expect(screen.getByPlaceholderText(/Username/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/Password/i)).toBeDefined();
    expect(screen.getByRole("button", { name: "Sign up" })).toBeDefined();
  });

  test("Alert error if password is empty", async () => {
    render(
      <MockProvider>
        <Signup />
      </MockProvider>
    );

    await userEvent.type(screen.getByPlaceholderText(/Username/i), "test");
    await userEvent.click(screen.getByRole("button", { name: "Sign up" }));

    expect(
      screen.getByText("Username and password are required!")
    ).toBeDefined();
  });

  test("Alert error if username is empty", async () => {
    render(
      <MockProvider>
        <Signup />
      </MockProvider>
    );

    await userEvent.type(screen.getByPlaceholderText(/Password/i), "abc123");
    await userEvent.click(screen.getByRole("button", { name: "Sign up" }));

    expect(
      screen.getByText("Username and password are required!")
    ).toBeDefined();
  });

  test("Alert error if both username and password are empty", async () => {
    render(
      <MockProvider>
        <Signup />
      </MockProvider>
    );

    await userEvent.click(screen.getByRole("button", { name: "Sign up" }));

    expect(
      screen.getByText("Username and password are required!")
    ).toBeDefined();
  });
});
