import { useState,  useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './Car.css'
//import { Helmet } from 'react-helmet'
//import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
//import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import 'swiper/swiper-bundle.css'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'
//SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { maxWidth } from '@mui/system'


function Car() {

  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [shareLinkCopied, setShareLinkCopied] = useState(false)
  
  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()

   

  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [nav3, setNav3] = useState();






  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'cars', params.carId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setCar(docSnap.data())
        // console.log(docSnap.data())
        setLoading(false)
      }
    }

    fetchListing()
    
  

  }, [navigate, params.carId])

  if (loading) {
    return <Spinner />
  }







  // const settingsMain = {
  //   arrows:true,
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1
  // };

  const settingsMain1 = {
   
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />

  };

  const settingsMain2 = {
    arrows:false,
    dots: false,
    infinite: true,
    slidesToShow:2,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
  };






// const getCarPics = () => {
//       return car.imageUrls.map((imageUrl, i)=>{
        
//         return <div key={params.carId}>
//                   <h3>

//                         <div>


//                                   <div>
                                   
//                                       <img src={imageUrl} alt={car.title} />


//                                   </div>



//                         </div>


//                   </h3>
//                 </div>
//       })
// }


const getCarPics = () => {
  let carImageUrls = car.imageUrls
  
  return carImageUrls.map((imageUrl)=>{
    
    return <div key={params.carId}>
             
                                  <img src={imageUrl} alt={car.title}  width='620px' height='413px'  style={{objectFit:'cover', maxWidth:'100%'}}/>


                             
            </div>
  })
}










const getCarPics2 = () => {
 
  const carImageUrls = car.imageUrls;
  const index = Math.round(carImageUrls.length/3)

  // Change Array Iteration Start point to index
  const getArray = (carImageUrls, index) => {
    const result = [];
    const length = carImageUrls.length;
    for (let i = 0; i < length; i++) {
     
      result.push(carImageUrls[(index + i) % length]);
    }
    return result;
  };


const imageArrayLeft = getArray(carImageUrls , index)
 
      
      return imageArrayLeft.map((imageUrl)=>{
        
        return <div key={params.carId}>
                
                                  
                                      <img src={imageUrl} alt={car.title}  width='295px' height='201px'   style={{objectFit:'cover', maxWidth:'100%', marginLeft:'2.7%'}} />


                </div>

      })


   


}






const getCarPics3 = () => {
 
  const carImageUrls3 = car.imageUrls;
  const index3 = (Math.round(carImageUrls3.length/3))*2

  // Change Array Iteration Start point to index3
  const getArray = (carImageUrls3, index3) => {
    const result3 = [];
    const length3 = carImageUrls3.length;
    for (let i = 0; i < length3; i++) {
     
      result3.push(carImageUrls3[(index3 + i) % length3]);
    }
    return result3;
  };


const imageArrayRight = getArray(carImageUrls3 , index3)
 
      
      return imageArrayRight.map((imageUrl)=>{
        
        return <div key={params.carId}>
                 
                                  
                                      <img src={imageUrl} alt={car.title}  width='295px'  height='201px'  style={{objectFit:'cover', maxWidth:'100%', marginLeft:'-2.7%'}} />


                </div>

      })


   


}

























  return (
    <main
     style={{padding:'2.5%'}} 
     >






        <div>

          
         
        <div  >

        <div style={{display:'flex', justifyContent:'space-between'}} >
            <h3 style={{fontSize:'1.45rem', fontWeight:'bold', }}>{car.title}</h3>
            <h3  style={{fontSize:'1.6rem', fontWeight:'bold'
                    , color:'maroon'}} className='new-arrival-price'>Ksh&nbsp; {car.discountedPrice?  car.discountedPrice.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',') : car.regularPrice.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h3>

        </div>

        <div style={{fontSize:'1.1rem', fontWeight:'100', marginBottom:'1.5%' }}>
          <p>{car.description}</p>
        </div>

        </div>

  


            <div
             style={{ }}
             >


                            
                            

                            <div style={{display:'flex' ,   height:'31.5rem' , justifyContent:'space-around' }}>
                               

                                         
                                 
                                    <div style={{width:'18.438rem', height:'12.563rem' }}>
                                     
                                        <Slider
                                        
                                          asNavFor={nav1 && nav2}
                                          ref={(slider3) => setNav3(slider3)}
                                          // slidesToShow={1}
                                          // swipeToSlide={true}
                                          // focusOnSelect={true}
                                          {...settingsMain2}
                                        >
                                        {getCarPics2()}
                                        </Slider>
                                   
                                    </div>
                                

                                
                                  
                                    <div  style={{width:'38.75rem', height:'14.313rem' ,  marginLeft:'1.5vw', marginRight:'1.5vw' }} >
                                      <Slider
                                      className='car-page-slick-slider'
                                      asNavFor={nav2 && nav3} 
                                      ref={(slider1) => 
                                      setNav1(slider1)} 
                                      {...settingsMain1}
                                      >
                                        {getCarPics()}
                                      </Slider>
                                    </div>
                                


                                 
                                 
                                    <div style={{width:'18.438rem', height:'12.563rem',   }}>
                                      <Slider
                                        asNavFor={nav1 && nav3}
                                        ref={(slider2) => setNav2(slider2)}
                                        // slidesToShow={1}
                                        // swipeToSlide={true}
                                        // focusOnSelect={true}
                                        {...settingsMain2}
                                      >
                                      {getCarPics3()}
                                      </Slider>
                                    </div>
                                



                          


                                </div>












            </div>

        </div>













        <div
          className='shareIconDiv'
          onClick={() => {
            navigator.clipboard.writeText(window.location.href)
            setShareLinkCopied(true)
            setTimeout(() => {
              setShareLinkCopied(false)
            }, 2000)
          }}
        >
          <img src={shareIcon} alt='' />
        </div>


        <div className='listingDetails'>
            <p className='listingName'>
              {car.name}  Ksh &nbsp;
              {car.offer
                ? car.discountedPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : car.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </p>
            {/* <p className='listingLocation'>{listing.location}</p> */}
            <p className='listingType'>
              {car.sold === true ? 'Sold' : 'For Sale'}
            </p>
            {car.offer && (
              <p className='discountPrice'>
                Ksh {parseInt(car.regularPrice) - parseInt(car.discountedPrice)} discount
              </p>
            )}

       <div>  
          
           <p className='listingLocationTitle'>Vehicle Overview</p> 
           



              <div >  

                                          <div>
                                                    <div>

                                                    <div className='categoryListingInfoDiv '>
                                                            <p className='categoryListingInfoText'>
                                                              Make
                                                            </p>
                                                            <p className='categoryListingInfoText'>
                                                              {car.make }
                                                            </p>
                                                        </div>

                                                        <div className='categoryListingInfoDiv '>
                                                            <p className='categoryListingInfoText'>
                                                              Model
                                                            </p>
                                                            <p className='categoryListingInfoText'>
                                                              {car.model }
                                                            </p>
                                                        </div>

                                                      <div className='categoryListingInfoDiv '>
                                                            <p className='categoryListingInfoText'>
                                                              Year
                                                            </p>
                                                            <p className='categoryListingInfoText'>
                                                              {car.year }
                                                            </p>
                                                        </div>

                                                        <div className='categoryListingInfoDiv'>
                                                            <p className='categoryListingInfoText'>
                                                            Exterior Color
                                                            </p>
                                                            <p className='categoryListingInfoText'>
                                                              {car.exteriorColor}
                                                            </p>
                                                        </div>

                                                      <div className='categoryListingInfoDiv'>
                                                            <p className='categoryListingInfoText'>
                                                            Interior Trim
                                                            </p>
                                                            <p className='categoryListingInfoText'>
                                                              {car.interiorTrim }
                                                            </p>
                                                      </div>

                                                  </div>




              
                                                  <div>

                                                          <div className='categoryListingInfoDiv '>
                                                                <p className='categoryListingInfoText'>
                                                                Body Type
                                                                </p>
                                                                <p className='categoryListingInfoText'>
                                                                  {car.bodyType }
                                                                </p>
                                                            </div>

                                                            <div className='categoryListingInfoDiv'>
                                                                <p className='categoryListingInfoText'>
                                                                Fuel Type
                                                                </p>
                                                                <p className='categoryListingInfoText'>
                                                                  {car.fuelType}
                                                                </p>
                                                            </div>

                                                          <div className='categoryListingInfoDiv'>
                                                                <p className='categoryListingInfoText'>
                                                                Engine Capacity
                                                                </p>
                                                                <p className='categoryListingInfoText'>
                                                                  {car.engineCapacity }
                                                                </p>
                                                          </div>

                                                          <div className='categoryListingInfoDiv '>
                                                                    <p className='categoryListingInfoText'>
                                                                    Gearbox
                                                                    </p>
                                                                    <p className='categoryListingInfoText'>
                                                                      {car.gearbox }
                                                                    </p>
                                                                </div>

                                                        </div>




                                                      
                                                  </div>   

                                          </div>


           

                </div>









      <p className='listingLocationTitle'>Vehicle Details</p> 

              
        <ul className='listingDetailsList'>
          <li>{car.vdOverview}</li>
          <li>{car.vd1}</li>
          <li>{car.vd2}</li>
          <li>{car.vd3}</li>
          <li>{car.vd4}</li>
          <li>{car.vd5}</li>
        </ul>











        </div>

   
  </main>
  )
}

export default Car