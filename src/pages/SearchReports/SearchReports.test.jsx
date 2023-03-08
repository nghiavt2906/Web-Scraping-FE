import { describe, test } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SearchReports from "./SearchReports";

import MockProvider from "../../test/MockProvider";

describe("Search reports page test", () => {
  test("Renders page correctly", async () => {
    render(
      <MockProvider isAuth>
        <SearchReports />
      </MockProvider>
    );

    expect(screen.getByTestId("loading-reports")).toBeDefined();
    expect(screen.getByTestId("search-keywords-input")).toBeDefined();
    expect(screen.getByTestId("clear-button")).toBeDefined();
  });

  test("Can type search keyword successfully", async () => {
    render(
      <MockProvider isAuth>
        <SearchReports />
      </MockProvider>
    );

    await userEvent.type(screen.getByTestId("search-keywords-input"), "car");
    expect(screen.getByTestId("search-keywords-input").value).toBe("car");
  });

  test("Clear search keyword successfully", async () => {
    render(
      <MockProvider isAuth>
        <SearchReports />
      </MockProvider>
    );

    await userEvent.type(screen.getByTestId("search-keywords-input"), "car");
    await userEvent.click(screen.getByTestId("clear-button"));
    expect(screen.getByTestId("search-keywords-input").value).toBe("");
  });
});
