import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const username = process.env.ADMIN_USER || "admin";
        const password = process.env.ADMIN_PASS || "shakir123";

        if (credentials?.username === username && credentials?.password === password) {
          return { id: "1", name: "Muhammed Shakir", role: "admin" };
        }
        return null;
      }
    })
  ],
  pages: { signIn: '/admin' },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
