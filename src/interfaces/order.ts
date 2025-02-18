interface CustomerInfo {
    name: string;
    email: string;
    phone: string;
}
interface ShippingAddress {
    country: string;
    province: string;
    district: string;
    address: string;
}
// PAYLOAD
interface ProductItem {
    productId: string;
    variantId: string;
    name: string;
    size: string;
    color: string;
    category: string;
    quantity: number;
    price: number;
    image: string;
}
export interface IOrderCreatePayload {
    items: ProductItem[];
    totalPrice: number;
    shippingFee: number;
    customerInfo: CustomerInfo;
    shippingAddress: ShippingAddress;
    description?: string;
}
// RESPONSE
interface OrderItem {
    productId: string;
    variantId: string;
    name: string;
    size: string;
    color: string;
    category: string;
    quantity: number;
    price: number;
    image: string;
    isReviewed: boolean;
    isReviewDisabled: boolean;
}

export interface IOrder {
    userId: string;
    items: OrderItem[];
    totalPrice: number;
    shippingFee: number;
    customerInfo: CustomerInfo;
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    isPaid: boolean;
    canceledBy: string;
    description: string;
    orderStatus: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
}
