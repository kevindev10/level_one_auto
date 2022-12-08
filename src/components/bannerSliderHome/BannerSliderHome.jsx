

import './BannerSliderHome.css'
import Slider from "react-slick";
import a1 from './BannerSliderHomePhotos/1.jpg'
import a2 from './BannerSliderHomePhotos/2.jpg'
import a3 from './BannerSliderHomePhotos/3.jpg'
import a4 from './BannerSliderHomePhotos/4.jpg'
import a5 from './BannerSliderHomePhotos/5.jpg'
import a6 from './BannerSliderHomePhotos/6.jpg'
import a7 from './BannerSliderHomePhotos/7.jpg'



import {Link} from 'react-router-dom'






function BannerSliderHome() {

  var settings = {
    arrow:false,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 15000,
    autoplaySpeed: 15000,
    fade: true,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          speed: 3000,
          autoplaySpeed: 3000,
        }
      },
     
    ]
  };


  return (
    <div >

      <Slider {...settings}>






      <div>
        <h3>
          <div className="container1">

            <div className="background-img" style={{"backgroundImage": "url(" + a1+ ") ", "objectFit":"100%" , }} >
                 
                  <div className='background-cover'></div>
                  <div className="centered1">
                    <Link to='/stock' onClick={() => window.scrollTo(0, 0)}>
                      <div className="btn from-left">View Our Stock</div>
                    </Link>
                  </div>
              </div>

          </div>
           

        </h3>
      </div>
      <div>
        <h3>

        <div className="container1">

          <div className="background-img" style={{"backgroundImage": "url(" + a2+ ") ", "objectFit":"100%" , }} >
              
                <div className='background-cover'></div>
                <div className="centered1">
                  <Link to='/stock' onClick={() => window.scrollTo(0, 0)}>
                    <div className="btn from-left">View Our Stock</div>
                  </Link>
                </div>
            </div>

          </div>



        </h3>
      </div>
      <div>
        <h3>
          
        <div className="container1">

              <div className="background-img" style={{"backgroundImage": "url(" + a3+ ") ", "objectFit":"100%" , }} >
                  
                    <div className='background-cover'></div>
                    <div className="centered1">
                      <Link to='/stock' onClick={() => window.scrollTo(0, 0)}>
                        <div className="btn from-left">View Our Stock</div>
                      </Link>
                    </div>
                </div>

              </div>


          


        </h3>
      </div>
      <div>
        <h3>
          


        <div className="container1">

          <div className="background-img" style={{"backgroundImage": "url(" + a4+ ") ", "objectFit":"100%" , }} >
              
                <div className='background-cover'></div>
                <div className="centered1">
                  <Link to='/stock' onClick={() => window.scrollTo(0, 0)}>
                    <div className="btn from-left">View Our Stock</div>
                  </Link>
                </div>
            </div>

          </div>





        </h3>
      </div>
      <div>
        <h3>
          

        <div className="container1">

            <div className="background-img" style={{"backgroundImage": "url(" + a5+ ") ", "objectFit":"100%" , }} >
                
                  <div className='background-cover'></div>
                  <div className="centered1">
                    <Link to='/stock' onClick={() => window.scrollTo(0, 0)}>
                      <div className="btn from-left">View Our Stock</div>
                    </Link>
                  </div>
              </div>

            </div>



        </h3>
      </div>
      <div>
        <h3>
          

        <div className="container1">

          <div className="background-img" style={{"backgroundImage": "url(" + a6+ ") ", "objectFit":"100%" , }} >
              
                <div className='background-cover'></div>
                <div className="centered1">
                  <Link to='/stock' onClick={() => window.scrollTo(0, 0)}>
                    <div className="btn from-left">View Our Stock</div>
                  </Link>
                </div>
            </div>

          </div>




        </h3>
      </div>


      <div>
        <h3>
          

        <div className="container1">

          <div className="background-img" style={{"backgroundImage": "url(" + a7+ ") ", "objectFit":"100%" , }} >
              
                <div className='background-cover'></div>
                <div className="centered1">
                  <Link to='/stock' onClick={() => window.scrollTo(0, 0)}>
                    <div className="btn from-left">View Our Stock</div>
                  </Link>
                </div>
            </div>

          </div>




        </h3>
      </div>




















      </Slider>

    </div>
  )
}

export default BannerSliderHome