'use client'
import { Toaster } from '@/components/ui/sonner'
import { store } from '@/redux/store'
import React from 'react'
import { Provider } from 'react-redux'

const Wrapper = ({children}) => {
  return (
    <Provider store={store} >
        {children}
        <Toaster />
    </Provider>
  )
}

export default Wrapper