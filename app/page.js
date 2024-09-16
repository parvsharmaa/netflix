'use client';

import { useEffect, useState } from 'react';
import Billboard from '@/components/Billboard/Billboard';
import MovieList from '@/components/Movie/MovieList';
import Navbar from '@/components/Navbar/Navbar';
import requests from '@/utils/requests';
import { getCachedData, setCachedData } from '@/utils/cache';
import Shimmer from '@/components/Movie/Shimmer';
import { useAuth } from '@/context/authContext';
import Footer from '@/components/Footer/Footer';

const fetchMovies = async (url) => {
  const cachedData = getCachedData(url);
  if (cachedData) {
    return cachedData;
  }
  const response = await fetch(url);
  const data = await response.json();
  setCachedData(url, data);
  return data;
};

export default function Home() {
  const { userData } = useAuth();

  const [data, setData] = useState({
    fetchSeries: null,
    trendingNow: null,
    topRated: null,
    actionMovies: null,
    comedyMovies: null,
    horrorMovies: null,
    romanceMovies: null,
    documentaries: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const [
          fetchSeries,
          trendingNow,
          topRated,
          actionMovies,
          comedyMovies,
          horrorMovies,
          romanceMovies,
          documentaries,
        ] = await Promise.all([
          fetchMovies(requests.fetchSeries),
          fetchMovies(requests.fetchTrending),
          fetchMovies(requests.fetchTopRated),
          fetchMovies(requests.fetchActionMovies),
          fetchMovies(requests.fetchComedyMovies),
          fetchMovies(requests.fetchHorrorMovies),
          fetchMovies(requests.fetchRomanceMovies),
          fetchMovies(requests.fetchDocumentaries),
        ]);

        setData({
          fetchSeries,
          trendingNow,
          topRated,
          actionMovies,
          comedyMovies,
          horrorMovies,
          romanceMovies,
          documentaries,
        });
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);

  return (
    <>
      <Navbar />
      <Billboard />
      <div className='p-10'>
        {loading ? (
          <Shimmer />
        ) : (
          <>
            <MovieList
              title='My List'
              data={userData?.favourites?.map((movie) => ({
                ...movie,
                isInMyList: true,
              }))}
            />
            <MovieList title='Trending Now' data={data.trendingNow?.Search} />
            <MovieList title='TV Shows' data={data.fetchSeries?.Search} />
            <MovieList title='Top Rated' data={data.topRated?.Search} />
            <MovieList title='Action' data={data.actionMovies?.Search} />
            <MovieList title='Comedy' data={data.comedyMovies?.Search} />
            <MovieList title='Horror' data={data.horrorMovies?.Search} />
            <MovieList title='Romance' data={data.romanceMovies?.Search} />
            <MovieList
              title='Documentaries'
              data={data.documentaries?.Search}
            />
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
