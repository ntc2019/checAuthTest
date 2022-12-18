import React from 'react'
import './ProductCard.scss'
import { Product } from '../../features/ProductsSlice'
type ProductCardProps = {
    product: Product,
    isAdmin: Boolean
}

const ProductCard = ({ product, isAdmin }: ProductCardProps) => {
    const { name, imageURL, description } = product;
    return (
        <li className="product-card">
            <p className="product-card__title">{name}</p>
            <div className="product-card__body">
                <div className="image-wrapper">
                    <img src={imageURL} />
                </div>
                <p className="description">{description}</p>
                {isAdmin
                    ?
                    <div>
                        <button>Delete</button>
                        <button>Edit</button>
                    </div>
                    : null}
            </div>
        </li>
    )
}

export default ProductCard