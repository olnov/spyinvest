import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { searchByDescription } from '../../services/assetsServices';

export const SearchAsset = ()=> {
    const [description,setDescription] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem('token');

    // Debounce timeout. Makes a delay tracking user input to reduce API calls
    useEffect(()=> {
        const debounceTimeout = setTimeout(()=> {
            if (description.trim().length>0) {
                fetchSuggestions();
            }else{
                setSuggestions([]);
            }
        },600);
        return ()=>clearTimeout(debounceTimeout);
    },[description]);

    const fetchSuggestions = async () => {
        setIsLoading(true);
        try {
            const results = await searchByDescription(token,description);
            setSuggestions(results);
            console.log("Results:",results);
        }catch(error){
            console.error("Error fetching results:",error);
        }finally{
            setIsLoading(false);
        }
    }
    
    const handleChange = (event) => {
        const { value } = event.target;
        setDescription(value);
    }

    const handleSuggestionClick = (suggestion) => {
        setDescription(suggestion.description);
        setSuggestions([]);
    }



    return (
        <>
        <div style={{ position: "relative", width: "300px", margin: "0 auto" }}>
        <Form.Control 
            type="search" 
            placeholder="Normal text" 
            name="description" 
            value={description}
            autoComplete='off' 
            onChange={handleChange} />
        {isLoading && <div>Loading...</div>}
        {suggestions.length > 0 && (
                <ul style={{
                    position: "absolute",
                    top: "100%", // Position it directly below the input
                    left: 0,
                    width: "100%",
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    marginTop: "5px",
                    listStyleType: "none",
                    padding: "0",
                    zIndex: 1000, // Ensure it appears above other content
                }}>
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion.id}
                            onClick={() => handleSuggestionClick(suggestion)}
                            style={{ padding: '8px', cursor: 'pointer' }}
                        >
                            {suggestion.description}
                        </li>
                    ))}
                </ul>
            )}
        </div>
        </>
    )
}

export default SearchAsset;