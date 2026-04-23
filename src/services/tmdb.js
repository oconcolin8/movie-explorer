// API token is stored in .env and passed in the Authorization header, not the URL
const API_TOKEN = import.meta.env.VITE_TMDB_API_KEY;

// Search for movies by title, returns results array and total page count
export async function searchMovies(query, page = 1) {
    try {
        const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=${page}&query=${encodeURIComponent(query)}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_TOKEN}`
            }
        });
        const data = await response.json();
        return { results: data.results, totalPages: data.total_pages };
    } catch (error) {
        console.error("Error searching movies", error);
        return { results: [], totalPages: 0 };
    }
}

// Fetch full details for a single movie by its TMDB ID
export async function getMovieDetails(id) {
    try {
        const url = `https://api.themoviedb.org/3/movie/${id}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_TOKEN}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error getting movie details", error);
    }
}

// Fetch the cast list for a movie
export async function getMovieCredits(id) {
    try {
        const url = `https://api.themoviedb.org/3/movie/${id}/credits`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_TOKEN}`
            }
        });
        const data = await response.json();
        return data.cast;
    } catch (error) {
        console.error("Error getting movie credits", error);
    }
}

// Fetch user reviews for a movie
export async function getMovieReviews(id) {
    try {
        const url = `https://api.themoviedb.org/3/movie/${id}/reviews`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${API_TOKEN}`
            }
        });
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error getting movie reviews", error);
    }
}
