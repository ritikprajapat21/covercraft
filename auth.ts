import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return { isPro: false, ...profile };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      console.log("User in jwt", user);
      if (user) {
        token.isPro = user.isPro;
      }
      return token;
    },
    session({ session, token }) {
      if (token) {
        session.user.isPro = token.isPro as boolean;
      }
      return session;
    },
  },
});
