import { db } from './firebase';
import { doc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';

// Data is stored at users/{uid}/watchlist/{movieId} each user has their own private list
// Using the movie ID as the document key prevents duplicate entries

export async function addToWatchlist(user, movie) {
  try {
    const ref = doc(db, 'users', user.uid, 'watchlist', String(movie.id));
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

// Returns all movies in the user's watchlist as an array
export async function getWatchlist(user) {
  try {
    const ref = collection(db, 'users', user.uid, 'watchlist');
    const snapshot = await getDocs(ref);
    return snapshot.docs.map(doc => doc.data());
  } catch (err) {
    console.error('Error getting watchlist:', err);
    return [];
  }
}

export async function removeFromWatchlist(user, movieId) {
  try {
    await deleteDoc(doc(db, 'users', user.uid, 'watchlist', String(movieId)));
  } catch (err) {
    console.error('Error removing from watchlist:', err);
  }
}

export async function removeFromWatched(user, movieId) {
  try {
    await deleteDoc(doc(db, 'users', user.uid, 'watched', String(movieId)));
  } catch (err) {
    console.error('Error removing from watched:', err);
  }
}

export async function addToWatched(user, movie) {
  try {
    const ref = doc(db, 'users', user.uid, 'watched', String(movie.id));
    await setDoc(ref, {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
    });
    console.log('Added to watched:', movie.title);
  } catch (err) {
    console.error('Error adding to watched:', err);
  }
}

// Returns all movies in the user's watched list as an array
export async function getWatched(user) {
  try {
    const ref = collection(db, 'users', user.uid, 'watched');
    const snapshot = await getDocs(ref);
    return snapshot.docs.map(doc => doc.data());
  } catch (err) {
    console.error('Error getting watched:', err);
    return [];
  }
}
