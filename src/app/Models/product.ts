export interface Pagination<T> {
    pageIndex: number;
    pageSize:  number;
    count:     number;
    data:      T[];
}

export interface Product {
    id:           number;
    name:         string;
    description:  string;
    price:        number;
    pictureURl:   string;
    productType:  string;
    productBrand: string;
}
