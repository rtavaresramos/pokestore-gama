import React from 'react';
import PokemonCard from './PokemonCard';

function PokemonList({ pokemons }) {

    return (
        <>

        <div className="row no-gutters">
            {
                pokemons.map((pokemon, index) =>
                    <div key={index}  className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
                        <PokemonCard pokemon={pokemon} />
                    </div>
                )
            }
            
        </div>

        </>
    );
    
}

export default PokemonList;
