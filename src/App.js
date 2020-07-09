import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Cart from './components/Cart';

import api from './services/api';
import PokemonList from './components/PokemonList';

function App() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pokemons, setPokemons] = useState([0]);

  const [previous, setPrevious] = useState(null);
  const [next, setNext] = useState(null);

  const url = 'https://pokeapi.co/api/v2';

  const filterPokemon = (searchTerm) => {

    console.log('serchterm', searchTerm)

    if (!searchTerm) {
      getInfoFromAPI(`${url}/pokemon`);

    } else {

      api.get(`${url}/pokemon/${searchTerm}`)
        .then(result => {
          setPokemons([{
            name: result.data.name
          }]);
          setNext(null);
          setPrevious(null);
          
        })
  
        .catch(error => {
          alert("Pokemon não encontrado!");
        })
    }

  };

  const getInfoFromAPI = useCallback(uri => {

    api.get(uri)
      .then(result => {
        setPokemons(result.data.results);
        setIsLoaded(true);

        setPrevious(result.data.previous);
        setNext(result.data.next);

      })

      .catch(error => {
        setError("Erro ao carregar itens.")
      })

  }, []);

  useEffect(() => {

    getInfoFromAPI(`${url}/pokemon`)

  }, [getInfoFromAPI]);

  function handlePreviousPage () {
    if(previous) getInfoFromAPI(previous);
  }

  function handleNextPage() {
    if(next) getInfoFromAPI(next);
  }

  if (error) {
    console.error('Erro ao carregar: ', error);
    return <div>Erro: {error}</div>;

  } else if (!isLoaded) {
    return <div className="loading-message">Carregando...</div>;

  } else {

      return (
        <>
        <section  className="header">
          <Navbar search={filterPokemon}/>
        </section>

          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-9 col-lg-8 col-md-8 col-sm-6 col-12">
                <PokemonList pokemons={pokemons} />

                <nav aria-label="Pagination">
                  <ul className="pagination justify-content-center">
                    <li className="page-item">

                      {
                        previous &&
                        <button className="page-link "
                                onClick={handlePreviousPage}> Anterior</button>
                      }
                    
                    </li>
                    <li className="page-item">

                      {
                        next && 
                        <button className="page-link active" onClick={handleNextPage}> Próximo</button>

                      }
                    </li>
                  </ul>
                </nav>
  
              </div>
              <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                <Cart />
              </div>
            </div>

          </div>
      
        </>
      );
  }
}

export default App;
