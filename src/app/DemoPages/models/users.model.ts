export class User  {
    credentialId: number;
    fullName: string;
    cmndImage: string;
    status: string;
    phoneNumber: string;
    created_at: string;
    parkingName?: string;
};

export class Owner {
    owner: User;
    stars: number;
    votes: number;
}
export class Account{
    username: string;
    password: string;
    email: string;
    role: string;
    created_at: string
}
