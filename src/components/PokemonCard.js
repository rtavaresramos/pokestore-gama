import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Counter from './Counter';

const PokemonCard = ({ pokemon }) => {

    const [ infoPokemon, setInfoPokemon ] = useState({});
    const [ loaded, setLoaded ] = useState(false); 

    useEffect(() => {
        async function getInfo() {
            const info = await api.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
            setInfoPokemon(info.data);
            setLoaded(true);
        }
        getInfo();
        
    }, [pokemon]);

    return (

        <div className="pokemon-card">
            <div className="pokemon-card-header">
                <h2>{pokemon.name}</h2>
                {
                    loaded ? 
                    infoPokemon.types.map((type, index) =>
                        <span key={index} className="pokemon-type">
                            {type.type.name}
                        </span>) : 
                    '...'
                }
            </div>
            <div className="pokemon-card-body">
               {
                   loaded ? 
                   <img src={infoPokemon.sprites.front_default} alt={pokemon.name} /> : 
                   'Carregando...'
               }
            </div>
            <div className="pokemon-card-footer">
                <h4>{parseFloat(infoPokemon.weight).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h4>   
                <Counter pokemon={pokemon} info={infoPokemon} price={infoPokemon.weight} />
            </div>
           
        </div>
    )
}

export default PokemonCard;