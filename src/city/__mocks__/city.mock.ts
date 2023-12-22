import { stateMock } from "../../state/__mocks__/state.mock";
import { CityEntity } from "../entities/city.entity";

export const cityMock: CityEntity = {
    createdAt: new Date(),
    id: 1234,
    name: 'cityNameMock',
    stateId: stateMock.id,
    updateAt: new Date(),

}