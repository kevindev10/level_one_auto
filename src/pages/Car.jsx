import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
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



function Car() {

  const [car, setCar] = useState(null)
  const [loading, setLoading] = useState(true)
  const [shareLinkCopied, setShareLinkCopied] = useState(false)

  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()




  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };












  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'cars', params.carId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setCar(docSnap.data())
        console.log(docSnap.data())
        setLoading(false)
      }
    }

    fetchListing()
  }, [navigate, params.carId])

  if (loading) {
    return <Spinner />
  }


  return (
    <main>

<Slider {...settings}>
      {console.log(car.imageUrls)}
      <div>
        <h3><img src={car.imageUrls[0]} alt="" /></h3>
      </div>
      <div>
        <h3><img src={car.imageUrls[1]} alt="" /></h3>
      </div>
      <div>
        <h3><img src={car.imageUrls[2]} alt="" /></h3>
      </div>
      <div>
        <h3><img src={car.imageUrls[3]} alt="" /></h3>
      </div>
      <div>
        <h3><img src={car.imageUrls[4]} alt="" /></h3>
      </div>
      <div>
        <h3><img src={car.imageUrls[5]} alt="" /></h3>
      </div>
      <div>
        <h3><img src={car.imageUrls[6]} alt="" /></h3>
      </div>
    </Slider>

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