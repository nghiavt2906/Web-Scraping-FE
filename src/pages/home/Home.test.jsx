import { describe, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Home from "./Home";

import MockProvider from "../../test/MockProvider";

describe("Home page test", () => {
  test("Renders home page correctly", () => {
    render(
      <MockProvider isAuth>
        <Home />
      </MockProvider>
    );

    expect(screen.getAllByTestId("file-input")).toBeDefined();
    expect(screen.getByRole("button", { name: "Submit" })).toBeDefined();
  });
});
