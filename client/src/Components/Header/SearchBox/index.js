// import { CiSearch } from "react-icons/ci";
// import Button from '@mui/material/Button';

// const SearchBox = () => {
//     return (
//         <div className='headerSearch ml-3 mr-3'>
//             <input type='text' placeholder='Search for products...' />
//             <Button><CiSearch /></Button>
//         </div>
//     )

// }

// export default SearchBox;

import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

const SearchBox = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]); // Clear results if query is empty
            return;
        }

        const fetchSearchResults = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/products/search?query=${encodeURIComponent(query)}`);
                const data = await response.json();
                console.log("Search API Response:", data);
                setResults(data); // Store search results
            } catch (error) {
                console.error("Search API Error:", error);
            }
        };

        const debounce = setTimeout(fetchSearchResults, 300); // Debounce API calls

        return () => clearTimeout(debounce); // Cleanup on unmount or query change
    }, [query]);

    // Function to handle clicking on a search result
    const handleSelectProduct = () => {
        setQuery("");      // Clear input field
        setResults([]);    // Hide search results
    };

    return (
        <div className="headerSearch mr-3">
            <input
                type="text"
                placeholder="Search for products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Button><CiSearch /></Button>

            {results.length > 0 && (
                <div className="search-results">
                    {results.map((product) => (
                        <Link 
                            to={`/product/${product._id}`} 
                            key={product._id} 
                            className="search-item"
                            onClick={handleSelectProduct} // Hide results on click
                        >
                            {product.name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBox;
