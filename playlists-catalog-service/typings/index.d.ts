declare namespace Express {
    export interface Request {
        user?: {
            username: string;
            userId: string;
            role: 'CLIENT' | 'TRAINER' | 'INFLUENCER';
        }
    }
}