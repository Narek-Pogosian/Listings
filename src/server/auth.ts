import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { type Adapter } from "next-auth/adapters";
import { loginSchema } from "@/lib/schemas/auth-schemas";
import { cache } from "react";
import { users } from "./db/schema";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

/** * @see https://next-auth.js.org/configuration/options */
export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id,
      },
    }),
  },
  adapter: DrizzleAdapter(db) as Adapter,
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { data, success } = loginSchema.safeParse(credentials);
        if (!success) {
          return null;
        }

        const res = await db
          .select()
          .from(users)
          .where(eq(users.email, data.email))
          .limit(1);

        const user = res[0];

        if (!user) {
          throw new Error("User not found.");
        }

        const isMatch = bcrypt.compareSync(data.password, user.hashedPassword);
        if (!isMatch) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
};

export const getServerAuthSession = cache(() => getServerSession(authOptions));
