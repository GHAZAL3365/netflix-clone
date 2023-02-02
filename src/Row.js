import React, { useState, useEffect } from 'react';
import axios from "./axios";
import "./Row.css"
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchURL , isLargeRow }) => {
  const [movies, setMovies] = useState([]);
 
  const [trailerUrl, setTrailerUrl] = useState("");
  
  // this snippet of run once as row is load 
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }

    fetchData();

  }, [fetchURL])

  const opts = {
    height:"390",
    width: "100%",
    playerVars: {
      autoplay: 1
    }
    
  }

  const  handleClick = (movie) => {
    if(trailerUrl) {
      setTrailerUrl("")
    }
    else {
      movieTrailer(movie?.name || "") 
      .then((url)=>{
        // url is comlete search link EX (https://www.youtube.com/watch?v=LGfwASavWNQ);
        
        // Now we get search parameteres...
        const urlParams = new URLSearchParams(
          new URL(url).search);
         
        setTrailerUrl(urlParams.get("v"));

       
      }).catch((error) => console.log(error));

    }
     
  }


  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">

        {movies.map(movie => {
          return <img
            key={movie.id}
            onClick={()=>handleClick(movie)}
            src={ `${base_url}${isLargeRow ? movie.poster_path:movie.backdrop_path}`}
            className={`row__poster ${isLargeRow && "row__posterLarge"} `} 
            alt={movie.name} />
        })}

      </div>
{trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}

    </div>
  );
}

export default Row;
