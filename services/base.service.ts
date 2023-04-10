import ErrorDictionary from '../lib/errorDictionary';
import prisma from '../lib/prismadb';

class BaseService {
    sessionToken: string;
    sessionUserId: string;

    constructor(sessionToken: string) {
        this.sessionToken = sessionToken;
    }

    async setSessionUserId() {
        if (!this.sessionToken) throw new Error(ErrorDictionary.NO_SESSION_TOKEN_PROVIDED);
        const { userId } = await prisma.session.findFirstOrThrow({ where: { sessionToken: this.sessionToken } });
        this.sessionUserId = userId;
    }
}

export default BaseService;
