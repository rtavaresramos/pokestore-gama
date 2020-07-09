import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = ({ search }) => {

    const [searchTerm, setSearchTerm]  = useState('');

    const handleChange = event => {
        setSearchTerm(event.target.value);
    }

    const handleSubmit = event => {
        search(searchTerm.toLowerCase());
    }

    return (
        <>

            <div className="row search search-content">
                <div className="col-12 col-sm-12">

                    <div className="input-group">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Pesquisar..." 
                            aria-label="Pesquisar" 
                            aria-describedby="button-search"
                            onChange={handleChange} />

                            <div className="input-group-append">
                                <button 
                                className="btn btn-primary" 
                                type="submit" 
                                id="button-search"
                                onClick={handleSubmit}> 
                                    <FontAwesomeIcon icon={faSearch} />
                                </button>
                            </div>
                    </div>        

                                     
                </div>
            </div>
            

        </>

    )
}

export default Search;