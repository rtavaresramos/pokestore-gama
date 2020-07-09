import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState(() => {
        const localCart = localStorage.getItem('@pokeStore/items');
        if(localCart) {
            return JSON.parse(localCart);
        }
        return [];
    });

    const [totalQuantItems, setTotalQuantItems] = useState(
        cartItems.reduce((total, pokemon) => total + pokemon.quant, 0)
    );

    function saveCart (items) {
        setCartItems(items);
        setTotalQuantItems(items.reduce(
            (total, pokemon) => total + pokemon.quant, 0)
        );
        localStorage.setItem('@pokeStore/items', JSON.stringify(items));
    }

    function addToCart(item) {

        if(cartItems.length === 0) {
            saveCart([item]);

        } else {

            const searchItem = cartItems.find(pokemon => pokemon.name === item.name);

            if(!searchItem) {
                saveCart([...cartItems, item]);
            }

            else {
                
                const updatedItems = cartItems.reduce((items, pokemon) => {
                    if(pokemon.name === item.name) {
                        pokemon.quant = item.quant;
                    }
                    if(pokemon.quant > 0) {
                        items.push(pokemon);
                    }
                    return items;
                }, []);

                saveCart(updatedItems);

            }
        }

    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, totalQuantItems }}>
            {children}
        </CartContext.Provider>
    )
}

function useCart() {
    const context = useContext(CartContext);

    if(!context) {
        throw new Error('useCart precisa ser usado com o CartContext');
    }
    return context;
}

export { CartProvider, useCart };