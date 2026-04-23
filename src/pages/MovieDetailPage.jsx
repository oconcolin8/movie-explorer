import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails, getMovieCredits, getMovieReviews } from "../services/tmdb";
import { addToWatchlist, addToWatched } from '../services/firestore';
import { useState, useEffect } from 'react';

function MovieDetailPage({ user }) {
    const { id } = useParams(); // movie ID from the URL (e.g. /movie/550)
    const navigate = useNavigate();

    const [details, setDetails] = useState(null);
    const [credits, setCredits] = useState([]);
    const [reviews, setReviews] = useState([]);
    // These control the 3-second confirmation messages after saving
    const [savedWatchlist, setSavedWatchlist] = useState(false);
    const [savedWatched, setSavedWatched] = useState(false);

    const handleAddToWatchlist = async () => {
        await addToWatchlist(user, details);
        setSavedWatchlist(true);
        setTimeout(() => setSavedWatchlist(false), 3000);
    };

    const handleMarkAsWatched = async () => {
        await addToWatched(user, details);
        setSavedWatched(true);
        setTimeout(() => setSavedWatched(false), 3000);
    };

    // Fetch all movie data when the page loads or the ID in the URL changes
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
        <div className="container-fluid py-3">
            <button className="btn btn-outline-light btn-sm mb-3" onClick={() => navigate(-1)}>
                &larr; Back to Results
            </button>

            {/* Show loading message until data arrives */}
            {!details ? (
                <p className="text-secondary">Loading...</p>
            ) : (
                <>
                    <div className="row g-4 mb-4">
                        <div className="col-12 col-md-3">
                            <img
                                className="img-fluid rounded"
                                src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                                alt={details.title}
                            />
                        </div>
                        <div className="col-12 col-md-9">
                            <h1>{details.title}</h1>
                            {details.tagline && <p className="text-secondary fst-italic">{details.tagline}</p>}
                            <p>{details.overview}</p>
                            <p><strong>Release Date:</strong> {details.release_date}</p>
                            <p><strong>Runtime:</strong> {details.runtime} minutes</p>
                            <p><strong>Rating:</strong> &#9733; {details.vote_average}</p>
                            <p><strong>Genres:</strong> {details.genres.map(g => g.name).join(', ')}</p>

                            {/* Logged-in users see save buttons; guests see a login prompt */}
                            {user ? (
                                <div className="d-flex flex-wrap gap-2 align-items-center mt-3">
                                    <button className="btn btn-outline-primary" onClick={handleAddToWatchlist}>
                                        Add to Watchlist
                                    </button>
                                    {savedWatchlist && <span className="text-success">Added to watchlist!</span>}
                                    <button className="btn btn-outline-success" onClick={handleMarkAsWatched}>
                                        Mark as Watched
                                    </button>
                                    {savedWatched && <span className="text-success">Marked as watched!</span>}
                                </div>
                            ) : (
                                <p className="text-secondary mt-3">Log in to save movies</p>
                            )}
                        </div>
                    </div>

                    {/* Show top 10 cast members */}
                    <h2 className="mb-3">Cast</h2>
                    <div className="d-flex flex-wrap gap-3 mb-4">
                        {credits.slice(0, 10).map((member) => (
                            <div key={member.id} style={{ width: '90px' }} className="text-center">
                                {member.profile_path && (
                                    <img
                                        className="rounded mb-1"
                                        src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                                        alt={member.name}
                                        style={{ width: '90px', height: '135px', objectFit: 'cover' }}
                                    />
                                )}
                                <p className="small mb-0">{member.name}</p>
                                <p className="small text-secondary">{member.character}</p>
                            </div>
                        ))}
                    </div>

                    <h2 className="mb-3">Reviews</h2>
                    {reviews.length === 0 ? (
                        <p className="text-secondary">No reviews yet</p>
                    ) : (
                        <div className="d-flex flex-column gap-3">
                            {reviews.map((review) => (
                                <div key={review.id} className="card bg-dark border-secondary">
                                    <div className="card-body">
                                        <h6 className="card-title">{review.author}</h6>
                                        {/* Truncate long reviews to 300 characters */}
                                        <p className="card-text small">{review.content.slice(0, 300)}...</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default MovieDetailPage
