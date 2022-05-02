import { render, screen, waitFor } from "@testing-library/react";
import { Async } from ".";

it("should render correctly", async () => {
  render(<Async />);

  expect(screen.getByText("Hello World")).toBeVisible();

  // method #1
  expect(await screen.findByText("Click me")).toBeVisible();

  // method #2
  await waitFor(() => {
    return expect(screen.getByText("Click me")).toBeVisible();
  });
});
