export interface User {
    id: number;
    email: string;
    username: string;
    fullName?: string;
    role: string;
    is_active: boolean;
}