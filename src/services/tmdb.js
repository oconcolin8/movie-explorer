const API_TOKEN = import.meta.env.VITE_TMDB_API_KEY;


/*  
    searchMovies:
    Take a search term and returns a list of matching movies from TMDB
*/
export async function searchMovies(query) {
    try {
        // Build the url with the search term inserted at the end "&query=${query}"
        const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${query}`;
        
        // Send the request to TMDB and wait for the response
        const response = await fetch(url, {
            method: 'GET', // We are reading data, not sending it, so we use GET
            headers: {
                accept: 'application/json', // Tell TMDB we want the response in JSON format
                Authorization: `Bearer ${API_TOKEN}` // Attach our API key to prove we are allowed to use the API
            }
        });

        // Wait for the response body to be parsed into a JavaScript object
        const data = await response.json();

        // TMDB wraps all results in a 'results' array, so we return just that part
        return data.results;
    } catch (error) {
        // If anything goes wrong (network issue, bad key, etc), log the error
        console.error("Error searching movies", error);
    }
}


/*
    getMovieDetails:
    Function to gather the details about a movie
*/
export async function getMovieDetails(id) {
    try {
        // Build the url to access the movies id
        const url = `https://api.themoviedb.org/3/movie/${id}`;
        
        // Send the request to TMDB and wait for the response
        const response = await fetch(url, {
            method: 'GET', // We are reading data, not sending it, so we use GET
            headers: {
                accept: 'application/json', // Tell TMDB we want the response in JSON format
                Authorization: `Bearer ${API_TOKEN}` // Attach our API key to prove we are allowed to use the API
            }
        });

        // Wait for the response body to be parsed into a JavaScript object
        const data = await response.json();

        // Return data to get the full array
        return data;
    } catch (error) {
        // If anything goes wrong (network issue, bad key, etc), log the error
        console.error("Error getting movie details", error);
    }
}


/*
    getMovieCredits:
    Function to gather the creadits for a movie
*/
export async function getMovieCredits(id) {
    try {
        // Build the url to access the movies credit
        const url = `https://api.themoviedb.org/3/movie/${id}/credits`;
        
        // Send the request to TMDB and wait for the response
        const response = await fetch(url, {
            method: 'GET', // We are reading data, not sending it, so we use GET
            headers: {
                accept: 'application/json', // Tell TMDB we want the response in JSON format
                Authorization: `Bearer ${API_TOKEN}` // Attach our API key to prove we are allowed to use the API
            }
        });

        // Wait for the response body to be parsed into a JavaScript object
        const data = await response.json();

        // Return data.cast to just get the cast
        return data.cast;
    } catch (error) {
        // If anything goes wrong (network issue, bad key, etc), log the error
        console.error("Error getting movie details", error);
    }
}


/*
    getMovieReviews:
    Function to gather the reviews for a movie
*/
export async function getMovieReviews(id) {
    try {
        // Build the url to access the movies reviews
        const url = `https://api.themoviedb.org/3/movie/${id}/reviews`;
        
        // Send the request to TMDB and wait for the response
        const response = await fetch(url, {
            method: 'GET', // We are reading data, not sending it, so we use GET
            headers: {
                accept: 'application/json', // Tell TMDB we want the response in JSON format
                Authorization: `Bearer ${API_TOKEN}` // Attach our API key to prove we are allowed to use the API
            }
        });

        // Wait for the response body to be parsed into a JavaScript object
        const data = await response.json();

        // Return data.results to just get the reviews
        return data.results;
    } catch (error) {
        // If anything goes wrong (network issue, bad key, etc), log the error
        console.error("Error getting movie details", error);
    }
}