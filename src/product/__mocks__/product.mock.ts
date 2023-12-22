import { categoryMock } from "../../category/__mocks__/category.mock";
import { ProductEntity } from "../entities/product.entity";

export const productMock: ProductEntity = {
    categoryId: categoryMock.id,
    createdAt: new Date(),
    id: 5432,
    image: 'http://image.com',
    name: 'nameProduckMock',
    price: 34.5,
    updatedAt: new Date(),
}