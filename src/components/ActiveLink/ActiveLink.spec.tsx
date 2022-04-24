import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { ActiveLink } from ".";

jest.mock("next/router");

const setupTests = (asPath: string) => {
  const useRouterMocked = jest.mocked(useRouter);

  useRouterMocked.mockReturnValueOnce({
    asPath,
  } as any);
};

describe("<ActiveLink />", () => {
  it("should render correctly", () => {
    setupTests("/");

    render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByText("Home")).toBeVisible();
  });

  it("should receive active class if it is current page", () => {
    setupTests("/");

    render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByText("Home")).toHaveClass("active");
  });

  it("should not receive active class if it is not current page", () => {
    setupTests("/posts");

    render(
      <ActiveLink href="/" activeClassName="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByText("Home")).not.toHaveClass("active");
  });
});
