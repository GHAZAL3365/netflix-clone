import React, {useEffect,useState} from 'react';
import "./Nav.css"
import netflixAvtar from "./images/netflix-avatar.png"

const Nav = () => {
  const [show,setShow] = useState(false);

    useEffect(()=>{
       window.addEventListener("scroll",function() {
        if( window.scrollY > 100) {
           setShow(true)  
        }
        else {
            setShow(false);
        }
       
       });
    //    return  () => {
    //     window.removeEventListener("scroll");
    // }

    },[]);

    return (
        <div className={`nav ${show  && "nav__black"}`}>
            <img 
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            className="nav__logo"
            alt="netflix-logo"/>

            <img  className="nav__avatar"
            src={netflixAvtar}
            alt="netflix-avatar"/>
        </div>
    );
}

export default Nav;
