import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, getMovieCredits, getMovieReviews } from "../services/tmdb";
import { useState, useEffect } from 'react';

function MovieDetailPage({ user }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const [details, setDetails] = useState(null);
    const [credits, setCredits] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const movieDetails = await getMovieDetails(id);
            const movieCredits = await getMovieCredits(id);
            const movieReviews = await getMovieReviews(id);

            setDetails(movieDetails);
            setCredits(movieCredits);
            setReviews(movieReviews);
        }
        fetchData();
    }, [id]);

    return (
        <div>
            {/* Back button — navigate(-1) goes to the previous page */}
            <button onClick={() => navigate(-1)}>Back to Results</button>

            {!details ? (
                <p>Loading...</p>
            ) : (
                <div>
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
                        {credits.slice(0, 10).map((member) => (
                            <li key={member.id}>
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
                        <p>No reviews yet</p>
                    ) : (
                        <ul>
                            {reviews.map((review) => (
                                <li key={review.id}>
                                    <h3>{review.author}</h3>
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