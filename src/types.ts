export const enum ProductStatus {
    Active = "ACTIVE",
    Inactive = "INACTIVE",
}

export interface Product {
    productId?: string;
    name: string;
    description: string;
    price: number
    status: ProductStatus;
}
  