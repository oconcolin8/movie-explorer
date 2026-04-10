import { useNavigate } from 'react-router-dom'

function MovieCard({movie}) {

  const navigate = useNavigate();
  
  return (
    <div>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
        <h2>{movie.title}</h2>
        <p>{movie.release_date}</p>
        <p>{movie.vote_average}</p>

        <button onClick={() => navigate(`/movie/${movie.id}`)}>
          View Details
        </button>
    </div>

    
  )
}

export default MovieCard