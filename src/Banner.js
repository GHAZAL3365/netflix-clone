import React,{useState,useEffect} from 'react';
import axios from './axios';
import requests from './request';
import "./Banner.css"

const Banner = () => {
   const [movie, setMovie] = useState("");
   console.log(movie);

   useEffect(()=>{
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
           
            const randomNumber = Math.floor(Math.random() * (request.data.results.length - 1));

            const randomMovie = request.data.results[randomNumber];
          
            setMovie(randomMovie);
            
            return request; 
           
           
        }
      
        fetchData();
    
   },[]);

   function truncate(str, n) {
    return str?.length > n? str.substr(0,n - 1) + "..." : str;
   }

    return (
        <header className="banner" 
         style={{
          backgroundSize: "cover",
          backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
          )`,
          backgroundPosition: "center center",

         }}
        > 
         <div className="banner__content">
        <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
        
         <div className="banner__buttons">
         <button className="banner__button">Play</button>
         <button className="banner__button">Mylist</button>

         </div>

         
         <h1 className="banner__description">
            {truncate(movie?.overview, 150)}
         </h1>

         </div>   
         <div className="banner__fadeBottom"></div>  

       </header>
    );
}

export default Banner;
