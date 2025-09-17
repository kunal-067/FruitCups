'use client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Layout = ({ children }) => {
    const dispatch = useDispatch();
    const cart = useSelector(state=>state.cart)

    // useEffect(()=>{
    //     console.log(cart)
    //     localStorage.setItem("cart", JSON.stringify(cart))
    // },[cart])

    return (
        <div>{children}</div>
    )
}

export default Layout