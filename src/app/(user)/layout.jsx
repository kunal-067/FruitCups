'use client'
import { hydrateCart } from '@/redux/slices/cartSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Layout = ({ children }) => {
    const dispatch = useDispatch();
    const cart = useSelector(state=>state.cart)

    useEffect(() => {
        const localCart = localStorage.getItem("cart");
        dispatch(hydrateCart(JSON.parse(localCart)));
    }, [dispatch])
    useEffect(()=>{
        localStorage.setItem("cart", JSON.stringify(cart))
    },[cart])

    return (
        <div>{children}</div>
    )
}

export default Layout