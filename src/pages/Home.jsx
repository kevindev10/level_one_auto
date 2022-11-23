import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import Footer from '../components/Footer'
import BannerSliderHome from  '../components/bannerSliderHome/BannerSliderHome'
import mainHome from '../assets/homepagePhotos/mainHome.jpg'
import homeX from '../assets/homepagePhotos/homeX.jpg'
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,

} from 'firebase/firestore'

import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import Slider from "react-slick";
import feedbackBackground from '../assets/homepagePhotos/feedbackBackground.jpg'
import StarsIcon from '@mui/icons-material/Stars';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { margin } from '@mui/system'









function Home() {


  const [newArrivals, setNewArrivals ] = useState(null)
  const [loading, setLoading] = useState(false)

   useEffect(() =>{
        const fetchlatestArrivals = async () => {
      try {

        // Get reference
        const carsRef = collection(db, 'cars')

        // Create a query
        const q = query(
          carsRef,
          // where('sold', '==', false),
          orderBy('timestamp', 'desc'),
          
        )

        // Execute query
        const querySnap = await getDocs(q)
      
      
        const vehicles = []
       

        querySnap.forEach((doc) => {
            return vehicles.push({
            id: doc.id,
            data: doc.data(),
         
          })
        })
   
       
        setNewArrivals(vehicles)
        setLoading(false)
       
      } catch (error) {
      
        toast.error( 'Could not fetch cars')
      }
    }

    fetchlatestArrivals()
  }, [])




   // Slider settings


   const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 3,
      autoplay: true,
      speed: 15000,
      autoplaySpeed: 15000,
  };


  const settings2 = {
    arrow:false,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 10000,
    autoplaySpeed: 10000,
    fade: true,
  };


  // get bottom banner photo slides
     

      const getSlides = () =>{
        return newArrivals.map ((newArrival) =>{
      return <>
                 <div key ={newArrival.id}>
                    <h3  className='newArrivalsWidth'>
                      <div className='newArrivalImageDiv'>
                         <img src={newArrival.data.imageUrls[0]} alt="New Arrivals" width='100%' height='100%'  className='newArrivalImages' style={{paddingLeft :'1.5%'}} />
                      </div>
                 
                    
                    <p>{newArrival.data.description}</p>
                    <p>Ksh &nbsp; {newArrival.data.discountedPrice?  newArrival.data.discountedPrice.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',') : newArrival.data.regularPrice.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                    </h3>
                    
                  </div>

                  
        
            </>     

        })
      }

















  return (
    <>
       <article className='bannerSliderHome'>
          <BannerSliderHome/>
       </article>
       <main > 

        <div className='firstDivAfterSLider'>
          <article className='firstArticleInFirstDiv'> 
              <h1 className='firstArticleInFirstDivH1'>Welcome to Level One Auto</h1> <br/> 
              <div className='firstArticleInFirstDivParagraph'>
              <p>Established over 15 years ago, <strong>Level One Auto</strong> is a family-run business and one that prides itself on looking after its customers.</p><br/>
              <p>We stock a wide range of nearly new and used cars to suit all budgets and lifestyles. No matter what type of car you’re looking for, we’re bound to have the right one for you.</p>
              <p><br/>
              Our aim is to make the purchase of your next car as simple and straightforward as possible. If you’re looking to sell your current car, we also provide a part exchange service where we offer you the best possible price in just a few easy step
              </p><br/>
              <p>So, if you have a question about a specific car, don’t see what you are looking for, want to arrange a test-drive, talk about finance or part-exchanging your car then either give us a call or complete the online enquiry form and one of our team will be happy to help you.</p> <br/> 


              </div>
             
           
          </article>

          <section className='firstSectionInFirstDiv'>
            <div className='mainphotoInFirstSection'>
              <img src={mainHome} alt="main car yard view" width='100%'  style={{paddingBottom: '2.5%'}}/>
              <img src={homeX} alt="car yard view one" width='100%'  style={{paddingBottom: '2.5%'}}  />
              
            
            </div>
            
          
       
            
        

       
           
       
          
         </section>

        </div>

        






           
       
     



  <div className='mainNewArrivalsDiv' >


    
  <h2 style={{paddingBottom:'2.7%' , textAlign:'center',fontWeight:'100', fontSize:'1.8rem' }}> Latest Arrivals </h2>

      { loading ? (
        <Spinner/>
      ):(
        newArrivals && newArrivals.length > 0 ? (

          <div>        

           
               
             <Slider {...settings}>
                        {getSlides()}
                      
                        </Slider>

           </div>

        ) : ( <p>No Cars In Stock</p>)
        
       



      )


      }


      <h2 >
   

        <Link to='/stock' style={{paddingTop:'2.7%' ,  display: 'flex' , alignItems: 'center', alignItems: 'center',justifyContent:'center' ,  flexWrap: 'wrap'}} className="viewAllStock">
           <span style={{fontWeight:'100',fontSize:'1.8rem'}}>View All Stock</span> 
           
           < DoubleArrowIcon sx={{ fontSize: 40 }} />
          
      
        </Link>

     
      
         
         
       </h2>


    
   </div>



     







              <div>



              <div>
               
                <Slider {...settings2}>
                  <div>
                    <h3>
                    <div className="container1-bottom-banner">

                      <div className="background-img-bottom-banner" style={{"backgroundImage": "url(" +feedbackBackground+ ") ", "objectFit":"100%" }} >
                          
                            <div className='background-cover-bottom-banner'></div>
                            <div className="centered1-bottom-banner">
                                <h4 className='banner-heading'>Don't just take our word for it, read what our customers say about us:</h4>
                                <p className='bannersubHeading'>Y. Christie</p>
                                <p className='banner-paragraph'>When I first walked in I was greeted promptly. I was assigned my own advisor and from there the service was world class...There was a vast amount of choice and I was not rushed at all and he explained the benefits and features of every car. </p>
                              
                              <p className='banner-rating'><StarsIcon className='rating-icon'/><StarsIcon className='rating-icon'/><StarsIcon className='rating-icon'/><StarsIcon className='rating-icon '/><StarsIcon className='rating-icon'/></p>
                            
                            </div>
                        </div>

                      </div>


                    </h3>
                  </div>
                  <div>
                    <h3>
                      
                    <div className="container1-bottom-banner">

                    <div className="background-img-bottom-banner" style={{"backgroundImage": "url(" +feedbackBackground+ ") ", "objectFit":"100%" }} >
                          
                          <div className='background-cover-bottom-banner'></div>
                          <div className="centered1-bottom-banner">
                              <h4 className='banner-heading'>Don't just take our word for it, read what our customers say about us:</h4>
                              <p className='bannersubHeading'>W. Bradey</p>
                              <p className='banner-paragraph'>My recent experience was again very positive. Selection of cars was very good, and the customer service was very impressive. I found the staff to be really professional and also very efficient.</p>
                            
                            <p className='banner-rating'><StarsIcon className='rating-icon'/><StarsIcon className='rating-icon'/><StarsIcon className='rating-icon'/><StarsIcon className='rating-icon '/><StarsIcon className='rating-icon'/></p>
                          
                          </div>
                      </div>

                    </div>


                    </h3>
                  </div>
                  <div>
                    <h3>
                      
                    <div className="container1-bottom-banner">
                    <div className="background-img-bottom-banner" style={{"backgroundImage": "url(" +feedbackBackground+ ") ", "objectFit":"100%" }} >
                          
                          <div className='background-cover-bottom-banner'></div>
                          <div className="centered1-bottom-banner">
                              <h4 className='banner-heading'>Don't just take our word for it, read what our customers say about us:</h4>
                              <p className='bannersubHeading'>H. Chengy</p>
                              <p className='banner-paragraph'>Had a good experience buying my car, very helpful staff and plenty of variety to chose from. Only gave 4/5 cause the purchasing process is bit long spent most of the day there. But overall a well deserved rating be visiting again</p>
                            
                            <p className='banner-rating'><StarsIcon className='rating-icon'/><StarsIcon className='rating-icon'/><StarsIcon className='rating-icon'/><StarsIcon className='rating-icon '/><StarsIcon className='rating-icon'/></p>
                          
                          </div>
                      </div>

                    </div>



                    </h3>
                  </div>
                  <div>
                    <h3>


                    <div className="container1-bottom-banner">
                    <div className="background-img-bottom-banner" style={{"backgroundImage": "url(" +feedbackBackground+ ") ", "objectFit":"100%" }} >
                          
                          <div className='background-cover-bottom-banner'></div>
                          <div className="centered1-bottom-banner">
                              <h4 className='banner-heading'>Don't just take our word for it, read what our customers say about us:</h4>
                              <p className='bannersubHeading'>S. Aurora</p>
                              <p className='banner-paragraph'>Bought a new car yesterday at Level One Auto and couldn’t be happier due to the amazing customer service as always, and a huge thanks to Steve at Level One Auto for making the car buying experience so easy and stress-free, as he was very patient and kind throughout the whole process.</p>
                            
                            <p className='banner-rating'><StarsIcon className='rating-icon'/><StarsIcon className='rating-icon'/><StarsIcon className='rating-icon'/><StarsIcon className='rating-icon '/><StarsIcon className='rating-icon'/></p>
                          
                          </div>
                      </div>

                    </div>





                    </h3>
                  </div>
                  <div>
                    <h3>
                      

                    <div className="container1-bottom-banner">
                    <div className="background-img-bottom-banner" style={{"backgroundImage": "url(" +feedbackBackground+ ") ", "objectFit":"100%" }} >
                          
                          <div className='background-cover-bottom-banner'></div>
                          <div className="centered1-bottom-banner">
                              <h4 className='banner-heading'>Don't just take our word for it, read what our customers say about us:</h4>
                              <p className='bannersubHeading'>J. Doe</p>
                              <p className='banner-paragraph'>Very happy with my purchase of my BMW 650I. Never had any dealings with this company before, but they had a car I was interested in. It was exactly as described and Alex even replaced one tyre with a new one due to a slight bulge . Overall, I can recommend Level One Auto as the cars are described as they are with no nasty surprises and most importantly Alex is an honest car dealer.</p>
                            
                            <p className='banner-rating'><StarsIcon className='rating-icon'/><StarsIcon className='rating-icon'/><StarsIcon className='rating-icon'/><StarsIcon className='rating-icon '/><StarsIcon className='rating-icon'/></p>
                          
                          </div>
                      </div>

                    </div>






                    </h3>
                  </div>
                
                </Slider>
      </div>

              </div>

















   
       </main>

       <Footer/>
    </>
   
  )
}

export default Home