import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { Query, query } from "faunadb";

import { fauna } from "../../../services/fauna";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "read:user",
        },
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session }) {
      try {
        const activeSubscription = await fauna.query(
          query.Get(
            query.Intersection([
              query.Match(
                query.Index("subscription_by_user_ref"),
                query.Select(
                  "ref",
                  query.Get(
                    query.Match(
                      query.Index("user_by_email"),
                      query.Casefold(session.user.email)
                    )
                  )
                )
              ),
              query.Match(query.Index("subscription_by_status"), "active"),
            ])
          )
        );

        return { ...session, activeSubscription };
      } catch {
        return { ...session, activeSubscription: null };
      }
    },
    async signIn({ user, account, profile }) {
      const { email } = user;

      try {
        await fauna.query(
          // condition
          query.If(
            query.Not(
              query.Exists(
                query.Match(query.Index("user_by_email"), query.Casefold(email))
              )
            ),
            // then
            query.Create(query.Collection("users"), { data: { email } }),
            // else
            query.Get(
              query.Match(query.Index("user_by_email"), query.Casefold(email))
            )
          )
        );
        return true;
      } catch {
        return false;
      }
    },
  },
});
