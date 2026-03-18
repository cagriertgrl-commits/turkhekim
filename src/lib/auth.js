import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { rateLimit } from "./rateLimit";
import sql from "./db";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        sifre: { label: "Şifre", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.sifre) return null;

        const ip = req?.headers?.["x-forwarded-for"] || "bilinmiyor";
        const { basarili } = rateLimit(`giris-${ip}`, 5, 15); // 15 dakikada 5 deneme
        if (!basarili) return null;

        const doktorlar = await sql`
          SELECT * FROM doktorlar WHERE email = ${credentials.email} LIMIT 1
        `;

        if (doktorlar.length === 0) return null;

        const doktor = doktorlar[0];
        if (!doktor.sifre) return null;

        const sifreEslesti = await compare(credentials.sifre, doktor.sifre);
        if (!sifreEslesti) return null;

        return {
          id: doktor.id,
          name: doktor.ad,
          email: doktor.email,
          slug: doktor.slug,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.slug = user.slug;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.slug = token.slug;
      session.user.id = token.id;
      return session;
    },
  },
  pages: {
    signIn: "/giris",
  },
  session: { strategy: "jwt" },
};
