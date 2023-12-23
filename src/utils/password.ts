import { compare, hash } from "bcrypt";

export const createPasswordHashed = async (password: string): Promise<string> => {
    const crypt = 10;
    return hash(password, crypt)
}

export const vaildatePassword = async (password: string, passwordHashed:string): Promise<boolean> => {
    return compare(password, passwordHashed)
}
