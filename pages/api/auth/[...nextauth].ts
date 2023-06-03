import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../lib/prismadb';

export default NextAuth({
    secret: process.env.SECRET,
    adapter: PrismaAdapter(prisma),
    debug: process.env.NODE_ENV === 'production',
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            // @ts-ignore
            scope: 'read:user',
        }),
    ],
    callbacks: {
        async redirect({ baseUrl }) {
            return baseUrl;
        },
    },
});
