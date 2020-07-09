import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import { useCart } from '../hooks/cart';

const Counter = ({ pokemon, info, price }) => {

    const [count, setCount] = useState(0);
    const { addToCart } = useCart();

    function handleCountPlus() {
        setCount(count + 1);
        handleAddToCart(count + 1);
    }

    function handleCountMinus() {
        if (count > 0) setCount(count - 1);
        handleAddToCart(count - 1);
    }

    function handleAddToCart(newCount = undefined) {


        const selectedItem = {
            name: pokemon.name,
            price: price,
            image: info.sprites.front_default,
            quant: newCount !== undefined ? newCount : count
        }
        addToCart(selectedItem);
    }

    return (
        <>
            <div className="row no-gutters">
                
                <div className="col-3">
                    <button
                        className="btn btn-primary"
                        onClick={handleCountMinus}
                    >
                        <FontAwesomeIcon icon={faMinus} />
                    </button>

                </div>
                <div className="col-6">
                    <span>
                        {count}
                    </span>
                </div>
                <div className="col-3">
                    <button
                        className="btn btn-primary"
                        onClick={handleCountPlus}
                    >
                        <FontAwesomeIcon icon={faPlus} />

                    </button>
                </div>
                
            </div>

            
        </>
    );
}


export default Counter;