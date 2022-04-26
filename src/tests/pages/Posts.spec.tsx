import { render, screen } from "@testing-library/react";
import Posts, { getStaticProps } from "../../pages/posts";
import { client } from "../../services/prismic";

const posts = [
  {
    slug: "fake-slug",
    title: "Fake title 1",
    excerpt: "Fake excerpt 1",
    updatedAt: "2020-01-01",
  },
];

jest.mock("next-auth/react", () => {
  return {
    useSession: () => [null, false],
  };
});
jest.mock("../../services/prismic", () => {
  return {
    client: {
      getAllByType: jest.fn(),
    },
  };
});

describe("Posts page", () => {
  it("renders correctly", () => {
    render(<Posts posts={posts} />);
    const getclientMocked = jest.mocked(client);
    getclientMocked.getAllByType.mockResolvedValue({
      data: posts,
    } as any);

    expect(screen.getByText("Fake title 1")).toBeInTheDocument();
  });

  it("loads initial data", async () => {
    const getclientMocked = jest.mocked(client);

    getclientMocked.getAllByType.mockReturnValueOnce([
      {
        uid: "fake-slug",
        data: {
          title: [
            {
              type: "heading1",
              text: "Fake title 1",
            },
          ],
          content: [
            {
              type: "paragraph",
              text: "Fake excerpt 1",
            },
          ],
        },
        last_publication_date: "2022-04-30T03:00:00.000Z",
      },
    ] as any);

    const response = await getStaticProps({ previewData: undefined });

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "fake-slug",
              title: "Fake title 1",
              excerpt: "Fake excerpt 1",
              updatedAt: "April 30, 2022",
            },
          ],
        },
      })
    );
  });
});
