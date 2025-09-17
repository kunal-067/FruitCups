// app/DynamicProviders.js
'use client';

import { Provider, useDispatch } from 'react-redux';
import { store, persistor } from '@/redux/store';
import { useEffect } from 'react';
import { hydrateCart } from '@/redux/slices/cartSlice';
import { PersistGate } from 'redux-persist/integration/react';

function CartHydrator() {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const storedCart = localStorage.getItem('cart');
  //   // console.log('hydrating ', storedCart)
  //   if (storedCart) {
  //     try {
  //       const parsedCart = JSON.parse(storedCart);
  //       dispatch(hydrateCart(parsedCart));
  //       console.log('dispatched', parsedCart.length)
  //     } catch (error) {
  //       console.error('Failed to parse cart from localStorage:', error);
  //       dispatch(hydrateCart([]));
  //     }
  //   }
  // }, [dispatch]);

  return null; // No UI, just side effect
}

export default function ReduxProviders({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      {/* <CartHydrator /> */}
      {children}
      </PersistGate>
    </Provider>
  );
}