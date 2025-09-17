import {
    createSelector
} from "@reduxjs/toolkit";

// Input selector: get cart array from state
const selectCart = state => state.cart;

// Selector factory: returns a selector for a specific product ID
export const calculateFinalPrice = (productId, size) =>
    createSelector([selectCart], (cart) => {
        const item = cart.find(p => p._id === productId && p.size?.value === size?.value);
        if (!item) return 0;

        let total = item.price || 0;

        total += item.fruits?.reduce((sum, f) => sum + (f.price || 0), 0) || 0;
        total += item.toppings?.reduce((sum, t) => sum + (t.price || 0), 0) || 0;

        if (item.couponApplied) {
            total *= (100 - item.couponApplied.discount) / 100;
        }

        total *= item.quantity * (item.size?.value || 2.5) / 2.5;

        return Math.max(total, 0);
    });

const selectCheckout = state => state.checkout;
export const calculateCheckoutTotal = createSelector(
    [selectCheckout], ({
        products
    }) => {
        return products.reduce((total, p) => {
            const toppingsTotal = p.customizations?.toppings?.reduce((sum, t) => sum + t.price, 0) || 0;
            const fruitsTotal = p.customizations?.fruits?.reduce((sum, f) => sum + f.price, 0) || 0;
            return total + (p.priceAtPurchase + toppingsTotal + fruitsTotal)*p.quantity*(p.size?.value || 2.5)/2.5;
        }, 0);

    }
)