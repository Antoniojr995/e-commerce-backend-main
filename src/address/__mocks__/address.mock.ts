import { cityMock } from "../../city/__mocks__/city.mock";
import { AddressEntity } from "../entities/address.entity";
import { userEntityMock } from "../../user/__mocks__/user.mock";

export const addressMock: AddressEntity = {
    cep: '123456',
    cityId: cityMock.id,
    complement: 'complementMock',
    createdAt: new Date(),
    id: 1234,
    numberAddress: 234,
    updateAt: new Date(),
    userId: userEntityMock.id
}