import { useEffect, useRef, useState } from 'react'
import Footer from '../components/Footer'
//import { useParams } from 'react-router-dom'

import './Stock.css';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import CarItem from '../components/CarItem'
import Select from 'react-select';
import {makes, minPrice, maxPrice} from '../assets/carData'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import audi  from '../assets/stockPagePhotos/audi-r83.jpg'


import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';





function Stock() {


  const [cars, setCars] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedListing, setLastFetchedListing] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [selectedOption3, setSelectedOption3] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectSearchResults, setSelectSearchResults] = useState(null);


 


   // const params = useParams()


  const selectRef = useRef();
  const selectRef1 = useRef();
  const selectRef2 = useRef();

  const selectRefMobile = useRef();
  const selectRef1Mobile = useRef();
  const selectRef2Mobile = useRef();



 // Clear select ref function

  const clearSelectRef = () =>{
    selectRef.current.clearValue()
    selectRef1.current.clearValue()
    selectRef2.current.clearValue()
    selectRefMobile.current.clearValue()
    selectRef1Mobile.current.clearValue()
    selectRef2Mobile.current.clearValue()
  }



 
 // Modal Config wit Material UI

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    height: "95%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 0,
    overflowY: "auto"

  };


// handle Modal open and closs functions

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);






  useEffect(() => {
    setSelectSearchResults(null)
    const fetchCars = async () => {
      try {

        // Get reference
        const carsRef = collection(db, 'cars')

        // Create a query
        const q = query(
          carsRef,
         where('sold', '==', false),
          orderBy('timestamp', 'desc'),
          limit(3)
        )

        // Execute query
        const querySnap = await getDocs(q)

        const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        setLastFetchedListing(lastVisible)

        const cars = []

        querySnap.forEach((doc) => {
            return cars.push({
            id: doc.id,
            data: doc.data(),
         
          })
        })

        setCars(cars)
        setLoading(false)
       
      } catch (error) {
        toast.error( 'Could not fetch cars')
      }
    }

    fetchCars()
  }, [])



  // Pagination / Load More
  const onFetchMoreListings = async () => {
    try {
      // Get reference
      const carsRef = collection(db, 'cars')

      // Create a query
      const q = query(
        carsRef,
        where('sold', '==', false),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(3)
      )

      // Execute query
      const querySnap = await getDocs(q)

      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchedListing(lastVisible)

      const cars = []

      querySnap.forEach((doc) => {
        return cars.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setCars((prevState) => [...prevState, ...cars])
      setLoading(false)
    } catch (error) {
      toast.error('Could not fetch car listings')
    }
  }


  // Handle search component


  const handleSelectSearchSubmit = (e) => {


    if(selectedOption  &&  selectedOption2 &&  selectedOption3 ){

      const searchCars = async () => {
     
        try {
          // Get reference
          const carsRef = collection(db, 'cars')
  
          // Create a query
          const q = query(
          carsRef,
            where('make', '==', (selectedOption.value).toLowerCase()),
            where('regularPrice', '>=', parseInt(selectedOption2.value)),
            where('regularPrice', '<=', parseInt(selectedOption3.value)),
            orderBy('regularPrice', 'desc'),
            limit(10)
          )
  
          // Execute query
          const querySnap = await getDocs(q)
  
      
  
          const selectSearchCars = []
  
          querySnap.forEach((doc) => {
              return selectSearchCars.push({
              id: doc.id,
              data: doc.data(),
            
            })
          })
  
          if(selectSearchCars.length > 0) {
            setSelectSearchResults(selectSearchCars)
            setOpen(true)
                      
          }else{
            setSelectSearchResults(null)
            toast.error( 'No Car Found!')
          }
                  
           setLoading(false)
         
        } catch (error) {
        
          toast.error( 'Search Not Working!')
        }
      }
      
  
    searchCars()

    }else if(selectedOption2 &&  selectedOption3){

      const searchCars = async () => {
     
        try {
          // Get reference
          const carsRef = collection(db, 'cars')
  
          // Create a query
          const q = query(
            carsRef,
            where('regularPrice', '>=', parseInt(selectedOption2.value)),
            where('regularPrice', '<=', parseInt(selectedOption3.value)),
            orderBy('regularPrice', 'desc'),
            limit(10)
          )
  
          // Execute query
          const querySnap = await getDocs(q)
  
       
  
          const selectSearchCars = []
  
          querySnap.forEach((doc) => {
         
            return selectSearchCars.push({
              id: doc.id,
              data: doc.data(),
            
            })
          })
  
          if(selectSearchCars.length > 0) {
            setSelectSearchResults(selectSearchCars)
            setOpen(true)
          }else{
            setSelectSearchResults(null)
            toast.error( 'No Car Found!')
          }
                  
           setLoading(false)
         
        } catch (error) {
        
          toast.error( 'Search Not Working!')
        }
      }
      
  
    searchCars()

    }else if(selectedOption){

      const searchCars = async () => {
     
        try {
          // Get reference
          const carsRef = collection(db, 'cars')
  
          // Create a query
          const q = query(
            carsRef,
            where('make', '==', (selectedOption.value).toLowerCase()),
            orderBy('regularPrice', 'desc'),
            limit(10)
          )
  
          // Execute query
          const querySnap = await getDocs(q)
  
       
          const selectSearchCars = []
  
          querySnap.forEach((doc) => {
              return selectSearchCars.push({
              id: doc.id,
              data: doc.data(),
            
            })
          })
  
          if(selectSearchCars.length > 0) {
            setSelectSearchResults(selectSearchCars)
            setOpen(true)
          }else{
            setSelectSearchResults(null)
            toast.error( 'No Car Found!')
          }
                  
           setLoading(false)
         
        } catch (error) {
        
          toast.error( 'Search Not Working!')
        }
      }
      
  
    searchCars()

    }else if(selectedOption && selectedOption2){

      const searchCars = async () => {
     
        try {
          // Get reference
          const carsRef = collection(db, 'cars')
  
          // Create a query
          const q = query(
            carsRef,
            
            where('make', '==', (selectedOption.value).toLowerCase()),
            where('regularPrice', '>=', parseInt(selectedOption2.value)),
            orderBy('regularPrice', 'desc'),
            limit(10)
          )
  
          // Execute query
          const querySnap = await getDocs(q)
  
         
  
          const selectSearchCars = []
  
          querySnap.forEach((doc) => {
              return selectSearchCars.push({
              id: doc.id,
              data: doc.data(),
            
            })
          })
  
          if(selectSearchCars.length > 0) {
            setSelectSearchResults(selectSearchCars)
          }else{
            setSelectSearchResults(null)
            toast.error( 'No car found')
          }
           
        setLoading(false)
        
        } catch (error) {
         
          toast.error( 'Search Not Working')
        }
      }
      
  
      searchCars()

    }

  // Clear ref on submit
   clearSelectRef()
  
  }










  return (
    <div className='category'>
    



      <div>
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        
        <Fade in={open}>
          <Box sx={style}>
            {/* <div>
              <button onClick={handleClose}>X</button>
            </div>       */}

          
        


            {selectSearchResults && (
              <div className='stock-card-main ' style={{ display:'flex', justifyContent:'center' }}>
                  <ul className='stock-card-ul' style={{display:'flex',  flexWrap:'wrap', listStyle:'none', paddingTop:'2.5%', width:'100%', paddingBottom:'2.5%'}} >
                  
                    {selectSearchResults.map((car) => (
                        <div className='stock-card-div' key={car.id} style={{flex:'43.33%', width:'100%', marginBottom:'7.5%', paddingLeft:'7.5%', paddingRight:'7.5%',   maxWidth:'50%'}}>
                          <CarItem
                            car={car.data}
                            id={car.id}
                            key={car.id}
                          />
                        </div>
                    ))}
                  </ul>
              </div>
            )}

          </Box>
        </Fade>
     
      </Modal>

 
    </div>

      {open === true &&

        <div >
          <IconButton
            aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                zIndex: '1500 !important',
            
              
                // color: (theme) => theme.palette.error.light,
                
              }}
              style={{backgroundColor:'black', top:'3.9vh', right:'0.55%' }}
              className='modal-close-on-mobile'
            >
          <CloseIcon
          sx={{  color:'white' }}
          style={{fontSize:'2.0rem'}}
          />
          </IconButton>


        </div>
      
      }
          
     

















        <div className='main-div-select-search-background'  >

          

          <div className='select-search-div-background-photo' style={{"backgroundImage": "url(" +audi+ ") ", }}>
                      <div style={{textAlign:'center', paddingTop:'3.3%'}}>
                      <p style={{fontSize:'2.0rem', color:'white', fontWeight:'bold', letterSpacing: '0.2rem'}}>Our Stock</p>
                      </div>
                    

                                          
                        <div  style={{display: 'flex' , justifyContent:'space-around', paddingTop:'1.7%', }}>
                          <div  style={{ width :'20%'}}>
                            <label className='formLabel'></label>
                            <Select
                              ref= {selectRef}
                              defaultValue={selectedOption}
                              onChange={setSelectedOption}
                              options={makes}
                              required
                              placeholder='Make'
                            
                            />
                          </div>
                      
                          <div  style={{width :'20%'}}> 
                            <label className='formLabel'></label>
                            <Select
                              ref= {selectRef1}
                              defaultValue={selectedOption}
                              onChange={setSelectedOption2}
                              options={minPrice}
                              required
                              placeholder='Min Price &nbsp; Ksh:'
                          />
              
                          </div>
                          <div  style={{ width :'20%',}}>
                            <label className='formLabel'> </label>
                              <Select
                              ref= {selectRef2}
                              defaultValue={selectedOption}
                              onChange={setSelectedOption3}
                              options={maxPrice}
                              required
                              placeholder='Max Price &nbsp; Ksh:'
                             
                            />
                          </div>
                
                     
                      
                          <button className='select-search-button-stock-page' onClick={handleSelectSearchSubmit}  variant="contained"  style={{width:'20%', height:'38px', fontSize:'1.08rem',color:'grey', backgroundColor:'white', marginTop:'1.2%', borderRadius: '5px'}}>Search</button>
              
                        </div>




          </div>



        </div>

















        <div className='main-div-select-search-background-on-mobile'  >

          

<div className='select-search-div-background-photo-on-mobile' style={{"backgroundImage": "url(" +audi+ ") ", }}>

                      <div style={{textAlign:'center'}}>
                      <p style={{fontSize:'1.4rem', color:'white', fontWeight:'bold', letterSpacing: '0.2rem'}}>Our Stock</p>
                      </div>


                                
              <div  style={{  zIndex:'300'}} >

                  <div style={{display:'flex', justifyContent:'space-around'}}>

                      <div  style={{ width :'44%'}}>
                          <label className='formLabel'></label>
                          <Select
                            
                          
                            ref= {selectRefMobile}
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={makes}
                            required
                            placeholder='Make'
                          
                          />
                      </div>
                
                      <div  style={{width :'44%'}}> 
                          <label className='formLabel'></label>
                          <Select
                            ref= {selectRef1Mobile}
                            defaultValue={selectedOption}
                            onChange={setSelectedOption2}
                            options={minPrice}
                            required
                            placeholder='Min Price &nbsp; Ksh:'
                        />
      
                      </div>

                  </div>

         
                  <div style={{display:'flex', justifyContent:'space-around'}}>

                      <div  style={{ width :'44%',}}>
                          <label className='formLabel'> </label>
                            <Select
                            ref= {selectRef2Mobile}
                            defaultValue={selectedOption}
                            onChange={setSelectedOption3}
                            options={maxPrice}
                            required
                            placeholder='Max Price &nbsp; Ksh:'
                          
                          />
                      </div>
          

                  </div>


                    <div style={{display:'flex', justifyContent:'space-around'}}>

                       <button className='select-search-button-stock-page' onClick={handleSelectSearchSubmit}  variant="contained"  style={{width:'64%', height:'38px', fontSize:'1.08rem',color:'grey', backgroundColor:'white', marginTop:'4.2%', borderRadius: '5px'}}>Search</button>

                    </div>

              
           
            
               
    
              </div>




</div>



</div>
















        <div className='stock-main-content' style={{backgroundColor:'white'}}>

              <div>


                    
      {loading ?(
         <Spinner />
      ):(
           
            cars && cars.length > 0 ? (
              <>
                <main className='stock-card-main' style={{ display:'flex', justifyContent:'center' }}>
              
            
              

                          



                            <ul className='stock-card-ul' style={{display:'flex',  flexWrap:'wrap', listStyle:'none', paddingTop:'2.5%', width:'100%', paddingBottom:'2.5%'}} >
                            
                           
                              
                              {cars.map((car) => (
                            
                            <div className='stock-card-div' key={car.id} style={{flex:'33.33%', width:'100%', marginBottom:'2.5%', paddingLeft:'2.5%', paddingRight:'2.5%', maxWidth:'33.33%'}}>

                                <CarItem
                               
                                  car={car.data}
                                  id={car.id}
                                 
                                />

                            </div>
                              
                              ))}
                            </ul>






                
                  
             
       
       
       
       
       
       
                </main>
       
                <br />
                <br />
                {lastFetchedListing && (
                  <div className='div-btn-load-more-stock-card' style={{ paddingTop:'2.5%', paddingbottom:'2.5%'}}>
                      <div 
                       className='btn-load-more-stock-card  from-center-load-more-stock-card'
                       onClick={onFetchMoreListings}
                       style={{fontSize:'1.05rem'}}
                       >
                        Load More
                      </div>
                  </div>
                )}
              </>

            ): ( <p>No Cars In Stock</p>)
         
       


      )

      
      }







                
              </div>


        </div>













       





        <Footer/>



    </div>
  );
}

export default Stock;
