import { UserEntity } from "../entities/user.entity";
import { UserType } from "../enum/user-type.enum";

export const userEntityMock: UserEntity = {
    cpf: "123456",
    createdAt: new Date(),
    email: "emailmock@gmail.com",
    id: 123,
    name: 'nameMock',
    password: "senhaMock",
    phone: "99999999",
    typeUser: UserType.User,
    updateAt: new Date(),
}