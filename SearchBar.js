// API =https:/api.unsplash.com/search/photos?page=1&query=${searchValue}&client_id=${API_KEY}
// https://api.unsplash.com/photos/users/ashbot/likes?page=1


import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import SearchBarStyle from './google-proxy/SearchBarStyle.css';

const SearchBar = () => { 
  const [query, setQuery] = useState('');
  const [data , setData] = useState([]);

  const inputRef = useRef(null);
  //const [search, setSearch] = useState([]); // Store a single result
  
  let API_KEY = "pcqEDNNItqjhlon44hYcXh_PLOW3b9qjxFwN4h5vajg"

  const myImg = async (searchItem) => {
    try {
      const response = await axios.get(`https://api.unsplash.com/search/photos`, {params: { page: 1, query: searchItem, client_id: API_KEY },});
      setData(response.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  const handleSearch = (searchTerm) => {
    const term = searchTerm || query;
    myImg(term); 
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  // console.log(data)
  return (
    <div>
      <input
        ref={inputRef}
        className='mt-5 text-gray-600 border border-gray-400 p-1 space-x-2 m-2 w-72'
        type='text'
        onKeyDown={handleKeyDown}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search Image...'
      />
      <button onClick={() => handleSearch()} className='border border-gray-300 p-2 focus:content-none bg-red-600 text-white rounded text-xs'>
        Search
      </button>

      <div className='md:m-4 p-3 '>
        <button onClick={() => handleSearch('Mountain')} className='bg-blue-950 text-white md:w-fit md: w-full mt-2 px-5 font-mono py-2 text-xs md:ms-3'>Mountain</button>
        <button onClick={() => handleSearch('Beaches')} className='bg-blue-950 text-white md:w-fit md: w-full mt-2 px-5 font-mono py-2 text-xs md:ms-3' >Beaches</button>
        <button onClick={() => handleSearch('Bird')} className='bg-blue-950 text-white px-5 md:w-fit md: w-full mt-2 font-mono py-2 text-xs md:ms-3' >Birds</button>
        <button onClick={() => handleSearch('food')} className='bg-blue-950 text-white px-5 md:w-fit md: w-full mt-2 font-mono py-2 text-xs md:ms-3' >Food</button>
      </div>

      <div className='images m-20'>
      {
        data.length > 0 ? (
          data.map((item, index) => {
            return (
             <div key={index}>
                 <img src={item.urls.small} alt={item.alt_description} className='images-name w-full p-2 m-2 h-56 object-cover' />
                 <p>{item.urls.title}</p>
             </div>
            )
         })
        ) : (
          <p className='text-gray-600 text-xl capitalize font-semibold text-center mt-20'>This images not available</p>
        )
      }
      </div>
    </div>
  );
};

export default SearchBar;
