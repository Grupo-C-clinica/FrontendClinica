
import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
function Home() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

    return (
        <home>
                <div className="home">
                    <div className="home-content">
                        <Carousel>
                        <div>
                            <img src="image1.jpg" alt="Image 1" />
                            <p className="legend">Image 1</p>
                        </div>
                        <div>
                            <img src="image2.jpg" alt="Image 2" />
                            <p className="legend">Image 2</p>
                        </div>
                        <div>
                             <img src="image3.jpg" alt="Image 3" />
                            <p className="legend">Image 3</p>
                        </div>
                        </Carousel>
                    </div>
                </div>
        </home>        
    );
}

export default Home;