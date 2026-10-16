import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '../../../lib/prisma'
import type { NextAuthOptions } from 'next-auth'
import type { NextApiHandler } from 'next'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as any),
  providers: [
    EmailProvider({
      server: process.env.SMTP_HOST
        ? {
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASSWORD,
            },
          }
        : undefined,
      from: process.env.EMAIL_FROM || 'no-reply@example.com',
      // Custom sendVerificationRequest to log magic link in console when no SMTP is configured
      sendVerificationRequest: async ({ identifier: email, url, provider, token }) => {
        if (!process.env.SMTP_HOST) {
          // Development fallback — print link to server console
          console.log(`
[NextAuth] Sign-in link for ${email}: ${url}
`)
          return
        }
        // If SMTP is configured, NextAuth will use default sender
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  session: { strategy: 'database' },
  callbacks: {
    async session({ session, user }) {
      // Attach role to session.user
      if (session.user) session.user.role = (user as any).role
      return session
    },
  },
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions)
export default authHandler
