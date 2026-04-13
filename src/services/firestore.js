import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';

/*
  addToWatchlist:
  Saves a movie to the current user's watchlist in Firestore.
  We only save the essential fields we need to display the movie
  rather than the entire API response object.
*/
export async function addToWatchlist(user, movie) {
  try {
    /*
      Firestore path: users/{userId}/watchlist/{movieId}
      doc() builds a reference to that specific document.
      Using the movie's TMDB id as the document ID means
      saving the same movie twice won't create duplicates.
    */
    const ref = doc(db, 'users', user.uid, 'watchlist', String(movie.id));

    // setDoc writes the data to that document location
    await setDoc(ref, {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
    });

    console.log('Added to watchlist:', movie.title);
  } catch (err) {
    console.error('Error adding to watchlist:', err);
  }
}