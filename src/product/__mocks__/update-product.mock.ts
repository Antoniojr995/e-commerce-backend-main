import { categoryMock } from "src/category/__mocks__/category.mock";
import { UpdateProductDTO } from "../dtos/update-product.dto";

export const updateProductMock: UpdateProductDTO = {
    categoryId: categoryMock.id,
    image: 'updateImageMock',
    name: 'updateMock',
    price: 134.0
}