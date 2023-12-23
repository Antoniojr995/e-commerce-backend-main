import { ReturnProduct } from "../../product/dtos/return-product.dto";
import { ReturnOrderDTO } from "../../order/dtos/return-order.dto";
import { OrderProductEntity } from "../entities/order-product.entity";

export class ReturnOrderProductDTO {
    id: number;
    orderId: number;
    productId: number;
    amount: number;
    price: number;
    oder?: ReturnOrderDTO;
    product?: ReturnProduct;

    constructor(orderProduct: OrderProductEntity) {
        this.id = orderProduct.id;
        this.orderId = orderProduct.orderId;
        this.productId = orderProduct.productId;
        this.amount = orderProduct.amount;
        this.price = orderProduct.price;
        this.oder = orderProduct.order ? new ReturnOrderDTO(orderProduct.order) : undefined;
        this.product = orderProduct.product ? new ReturnProduct(orderProduct.product) : undefined;
    }
}