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

import {EmailShareButton, FacebookShareButton, TwitterShareButton, WhatsappShareButton} from "react-share";
import {EmailIcon, FacebookIcon, TwitterIcon, WhatsappIcon,  PinterestIcon, LinkedinIcon} from "react-share";
import ContactForm from '../components/ContactForm'




import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Fade from '@mui/material/Fade';





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

  const [open, setOpen] = useState(false);




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
             
                                  <img src={imageUrl} alt={car.title} className='car-page-slider-image-on-mobile'  width='620px' height='413px'  style={{objectFit:'cover', maxWidth:'100%'}}/>


                             
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
                 
                                  
                                      <img  src={imageUrl} alt={car.title}  width='295px'  height='201px'  style={{objectFit:'cover', maxWidth:'100%', marginLeft:'-2.7%'}} />


                </div>

      })


   


}












// Share Url

const shareUrl = window.location.href;







 // Enquire Modal styling 

const style2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80%",
  height: "95%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 0,
  overflowY: "auto"
};



// Enqire  Modal  methods
// const handleOpen = () => setOpen(true);
const handleClose = () =>{
  setOpen(false)
  window.location.reload()
} ;





  return (
    <main
    className='car-page-main-div'
     style={{padding:'2.5%', }} 
     >






        <div>

          
         
        <div  >

        <div className='car-page-flex-title' style={{display:'flex', justifyContent:'space-between'}} >
            <h3 className='car-page-title-heading' style={{fontSize:'1.45rem', fontWeight:'bold', }}>{car.title}</h3>
            <h3 className='car-page-title-price-desktop' style={{fontSize:'1.6rem', fontWeight:'bold'
                    , color:'maroon'}} >Ksh&nbsp; {car.discountedPrice?  car.discountedPrice.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',') : car.regularPrice.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h3>

        </div>

        <div className='car-page-title-description' style={{fontSize:'1.1rem', fontWeight:'100', marginBottom:'1.5%' }}>
          <p>{car.description}</p>
        </div>

        <div  className='car-page-title-price-mobile'>
        <h3  className='car-page-title-price-mobile-font' style={{fontSize:'1.6rem', fontWeight:'bold'
                    , color:'maroon'}} >Ksh&nbsp; {car.discountedPrice?  car.discountedPrice.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',') : car.regularPrice.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h3>

        </div>

        </div>

  


            <div
            
             >


                            
                            

                            <div className='car-page-flex-main-sliders' style={{display:'flex' ,   height:'31.5rem' , justifyContent:'space-around' , }}>
                               

                                         
                                 
                                    <div className='car-page-slider-on-mobile' style={{width:'18.438rem', height:'12.563rem' }}>
                                     
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
                                

                                
                                  
                                    <div className='car-page-div-slick-slider' style={{width:'38.75rem', height:'14.313rem' ,  marginLeft:'1.5vw', marginRight:'1.5vw'  }} >
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
                                


                                 
                                 
                                    <div className='car-page-slider-on-mobile' style={{width:'18.438rem', height:'12.563rem',   }}>
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
















































<div className='share-contact-enquire-print-main' style={{backgroundColor:'black', color:'white' , padding:'2.5%'}}>

      <div className='share-contact-enquire-print'  style={{display:'flex', justifyContent:"space-between"}}>



                  <div className='share-contactUs'>


                          <div className='share-main' >

                            <div className='share' style={{display:'flex', }}>
                                <p className="Share-this-vehicle" style={{fontSize: "1.0rem", lineHeight: "30px", marginRight:'2.5%' }}>Share this vehicle </p>
                                <span className=''>
                                <FacebookShareButton className='' url={shareUrl} quote={'Level One Auto'} >
                                    <FacebookIcon size ={30} round={true} style={{marginRight:'2.5%'}}/>
                                </FacebookShareButton>&nbsp;&nbsp;&nbsp;

                                <TwitterShareButton className=''  url={shareUrl} quote={'Level One Auto'}>
                                    <TwitterIcon size ={30} round={true}/>
                                </TwitterShareButton>&nbsp;&nbsp;&nbsp;

                                <WhatsappShareButton className=''  url={shareUrl} quote={'Level One Auto'}>
                                    <WhatsappIcon size ={30} round={true}/>
                                </WhatsappShareButton>&nbsp;&nbsp;&nbsp;

                                <EmailShareButton className=''  url={shareUrl} quote={'Level One Auto'} >
                                    <EmailIcon size ={30} round={true}/>
                                </EmailShareButton>&nbsp;&nbsp;&nbsp;  
                                </span> 
                            </div>

                              <div className='car-page-contactus' style={{display:'flex', marginTop:'1.5%'  }}>
                                <div className='car-page-call-us'  style={{display:'flex', }}> 
                                  <p className='car-page-call-us-paragraph'>Call Us : </p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
                                  <a href="tel:+000000000" className='car-page-call-us-paragraph'>
                                    <i className="fas fa-phone-alt fa-1x " style={{fontSize:'150%', color:'gray' ,  }}></i>
                                  </a>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p className='car-page-call-us-paragraph'>0000 000 000 </p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
                                </div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    
                                <div className='car-page-email-us'  style={{display:'flex', }}> 
                                <p className='car-page-call-us-paragraph'>Email Us : </p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
                                  <a href="mailto:leveloneauto@email.com" target="blank" rel="noreferrer" className='car-page-call-us-paragraph'>
                                    <i className="fas fa-envelope  fa-1x footer-email" style={{fontSize:'150%'}}></i>
                                  </a>
                                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p className='car-page-call-us-paragraph'>leveloneauto@email.com</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
                                </div>

                              </div>



                          </div>



                  </div>                         






                  <div className='enquire-print' style={{display:'flex', width:'40%', justifyContent:'space-around' }}>

                      <div   className='enquire-main'>

                        <div >






                                  <Button 
                                    variant="contained"
                                    // onClick={handleOpen}

                                    onClick={() =>{
                                      setTimeout(() =>{
                                        setOpen(true) 
                                      }, 500)
                                    }}
                                    style={{'backgroundColor':'black', 'color':'white', 'fontSize':'1.0rem', 'padding':'10px 50px 10px 50px',  border:'4px solid maroon', letterSpacing:'0.15rem'}} 
                                    className='enquire-button-on-mobile'

                                   
                                  >
                                    Enqiure
                                  </Button>
                                  <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                  >
                                    <Fade in={open}>
                                      <Box sx={style2} className='modal-size-on-mobile'>







                                      {open === true &&

                                        <div style={{textAlign:'right'}}>
                                            <IconButton
                                              aria-label="close"
                                                onClick={handleClose}
                                                sx={{
                                                  position: '',
                                                  zIndex: '1800 !important',
                                              
                                                
                                                  // color: (theme) => theme.palette.error.light,
                                                  
                                                }}
                                                style={{ marginTop:'2.5%', marginRight:'2.5%' }}
                                                className=''
                                              >
                                            <CloseIcon
                                            sx={{  color:'black' }}
                                            style={{fontSize:'2.5rem'}}
                                            className='modal-x-icon-on-mobile'
                                            />
                                            </IconButton>


                                          </div>

                                        } 






                                      <ContactForm car={car} carUrl={window.location.href} />
                                      </Box>
                                    </Fade>
                                  </Modal>





                         </div>

                      

                      </div>

                      <div className='print-main' >
                                          <Button
                                             variant="contained"
                                             style={{'backgroundColor':'black', 'color':'white', 'fontSize':'1.0rem', 'padding':'10px 50px 10px 50px',  border:'4px solid maroon', letterSpacing:'0.15rem',}} 
                                             className='print-button-on-mobile'
                                             onClick={() => window.print()}
                                          >
                                            
                                            Print Details
                                            
                                          </Button>
                      </div> 



                  </div>




      </div>



</div>








 







   

 













































{/* 
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
        </div> */}


        <div  className='listingDetails' >
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