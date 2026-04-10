import { useParams } from 'react-router-dom';
import { getMovieDetails, getMovieCredits, getMovieReviews } from "../services/tmdb";
import { useState, useEffect } from 'react';

function MovieDetailPage() {
    const { id } = useParams();

    const [details, setDetails] = useState(null);
    const [credits, setCredits] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(()  => {
        const fetchData = async () => {
            const movieDetails = await getMovieDetails(id);
            const movieCredits = await getMovieCredits(id);
            const movieReviews = await getMovieReviews(id);
            console.log("movieDetails:", movieDetails)

            setDetails(movieDetails);
            setCredits(movieCredits);
            setReviews(movieReviews);
        }
        fetchData();
    }, [id]);

    return (
        <div>
            {!details ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {/* Movie Header Info */}
                    <img 
                        src={`https://image.tmdb.org/t/p/w500${details.poster_path}`} 
                        alt={details.title} 
                    />
                    <h1>{details.title}</h1>
                    <p>{details.tagline}</p>
                    <p>{details.overview}</p>
                    <p>Release Date: {details.release_date}</p>
                    <p>Runtime: {details.runtime} minutes</p>
                    <p>Rating: {details.vote_average}</p>
                    <p>Genres: {details.genres.map(g => g.name).join(', ')}</p>

                    {/* Cast Section */}
                    <h2>Cast</h2>
                    <ul>
                        {/*
                            .slice(0, 10) limits to the first 10 cast members
                            so we don't show the entire cast list
                        */}
                        {credits.slice(0, 10).map((member) => (
                            <li key={member.id}>
                                {/* Some cast members don't have a photo */}
                                {member.profile_path && (
                                    <img 
                                        src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                                        alt={member.name}
                                    />
                                )}
                                <p>{member.name} as {member.character}</p>
                            </li>
                        ))}
                    </ul>

                    {/* Reviews Section */}
                    <h2>Reviews</h2>
                    {reviews.length === 0 ? (
                        // Show a message if there are no reviews for this movie
                        <p>No reviews yet</p>
                    ) : (
                        <ul>
                            {reviews.map((review) => (
                                <li key={review.id}>
                                    <h3>{review.author}</h3>
                                    {/*
                                        Reviews can be very long so we limit to
                                        300 characters and add '...' if truncated
                                    */}
                                    <p>{review.content.slice(0, 300)}...</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    )
}

export default MovieDetailPage


