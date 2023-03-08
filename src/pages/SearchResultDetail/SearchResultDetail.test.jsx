import { describe, test } from "vitest";
import { render, screen } from "@testing-library/react";

import SearchResultDetail from "./SearchResultDetail";

import MockProvider from "../../test/MockProvider";

describe("Search result detail page test", () => {
  test("Renders page correctly", async () => {
    render(
      <MockProvider isAuth>
        <SearchResultDetail />
      </MockProvider>
    );

    expect(screen.getByTestId("keyword")).toBeDefined();
    expect(screen.getByTestId("totalAds")).toBeDefined();
    expect(screen.getByTestId("totalLinks")).toBeDefined();
    expect(screen.getByTestId("totalSearchResults")).toBeDefined();
  });
});
