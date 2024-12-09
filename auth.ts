import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { importPKCS8, SignJWT } from "jose";
import { ConvexAdapter } from "./app/ConvexAdapter";
if (process.env.CONVEX_AUTH_PRIVATE_KEY === undefined) {
  throw new Error("Missing CONVEX_AUTH_PRIVATE_KEY");
}
if (process.env.JWKS === undefined) {
  throw new Error("Missing JWKS");
}
if (process.env.NEXT_PUBLIC_CONVEX_URL === undefined) {
  throw new Error("Missing NEXT_PUBLIC_CONVEX_URL");
}
const CONVEX_SITE_URL = process.env.NEXT_PUBLIC_CONVEX_URL!.replace(
  /.cloud$/,
  ".site"
);

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/drive.file",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  adapter: ConvexAdapter,
  callbacks: {
    async session({ session }) {
      const privateKey = await importPKCS8(
        process.env.CONVEX_AUTH_PRIVATE_KEY!,
        "RS256"
      );
      const convexToken = await new SignJWT({
        sub: session.userId,
      })
        .setProtectedHeader({ alg: "RS256" })
        .setIssuedAt()
        .setIssuer(CONVEX_SITE_URL)
        .setAudience("convex")
        .setExpirationTime("1h")
        .sign(privateKey);
      return { ...session, convexToken };
    },
  },
  trustHost: true,
});
declare module "next-auth" {
  interface Session {
    convexToken: string;
  }
}
