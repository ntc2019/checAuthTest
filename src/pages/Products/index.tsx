import React, { useEffect, useState } from 'react'

import { getProducts } from '../../features/ProductsSlice'
import ProductCard from './ProductCard'
import { getProductsStatus, fetchProductsData } from '../../features/ProductsSlice'
import { useDispatch, useSelector } from 'react-redux'
import './ProductList.scss'
import { appDispatch } from '../../app/store'
import { useAuth } from '../../hooks/useAuth'
const ProductList = () => {
    const dispatch: appDispatch = useDispatch();
    const { auth } = useAuth();
    const productStatus = useSelector(getProductsStatus);

    useEffect(() => {
        dispatch(fetchProductsData({ page: 1, limit: 9 }));
    }, [])
    const products = useSelector(getProducts);
    const [checkAdminDone, setCheckAdminDone] = useState(false);
    const { checkAdmin } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        async function check() {
            const res = await checkAdmin();
            setIsAdmin(res);
            setCheckAdminDone(true);
        }
        check();
    }, [auth])

    const renderedProducts = products.map(product => {
        return <ProductCard key={product.id} product={product} isAdmin={isAdmin} />
    })

    return (

        <div className='product-list'>
            {productStatus === 'success'
                ? <><h1>Menus</h1>
                    <div className="container">
                        <ul className='product-list-wrapper'>
                            {renderedProducts}
                        </ul>
                    </div>
                </>
                : <h1>Loading...</h1>}

        </div>
    )
}

export default ProductList