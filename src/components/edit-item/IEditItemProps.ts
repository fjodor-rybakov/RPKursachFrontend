import {IProduct} from "../../services/transport/interfaces/catalog/IProduct";

export interface IEditItemProps {
    product: IProduct;

    onClose(): void;

    onUpdate(): void;
}