import { useEffect, useRef, useState } from 'react'
//import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
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

import mainHome from '../assets/homepagePhotos/mainHome.jpg'
import { margin } from '@mui/system';





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


 // Clear select ref function

  const clearSelectRef = () =>{
    selectRef.current.clearValue()
    selectRef1.current.clearValue()
    selectRef2.current.clearValue()
  }



 
 // Modal Config wit Material UI

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    height: "90%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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
         // where('sold', '==', false),
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
        // where('sold', '==', false),
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
          console.log(error)
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
          console.log(error)
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
          console.log(error)
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
          console.log(error)
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
                    
            {selectSearchResults && (
              <ul className='categoryListings'>
                {/* {console.log(cars)} */}
                {selectSearchResults.map((car) => (

                  <CarItem
                    car={car.data}
                    id={car.id}
                    key={car.id}
                  />
                ))}
              </ul>
            )}

          </Box>
        </Fade>
      </Modal>
    </div>















        <div className='main-div-select-search-background'  >

          

          <div className='select-search-div-background-photo' style={{"backgroundImage": "url(" +audi+ ") ", }}>




                                          
                        <div  style={{display: 'flex' , justifyContent:'space-around', paddingTop:'8.7%', }}>
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




                                
              <div  style={{paddingTop:'16.7%'}} >

                  <div style={{display:'flex', justifyContent:'space-around'}}>

                      <div  style={{ width :'44%'}}>
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
                
                      <div  style={{width :'44%'}}> 
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

                  </div>

         
                  <div style={{display:'flex', justifyContent:'space-around'}}>

                      <div  style={{ width :'44%',}}>
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
                <main style={{ display:'flex', justifyContent:'center' }}>
              
            
              

                          



                            <ul style={{display:'flex',  flexWrap:'wrap', listStyle:'none', paddingTop:'2.5%', width:'100%', paddingleft:'2.5%', paddingRight:'2.5%', paddingBottom:'2.5%'}} >
                              {/* {console.log(cars)} */}
                           
                              
                              {cars.map((car) => (
                            
                            <div  style={{flex:'33.33%', width:'100%', marginBottom:'2.5%', paddingLeft:'2.5%', paddingRight:'2.5%' }}>

                                <CarItem
                               
                                  car={car.data}
                                  id={car.id}
                                  key={car.id}
                                />

                            </div>
                              
                              ))}
                            </ul>






                
                  
             
       
       
       
       
       
       
                </main>
       
                <br />
                <br />
                {lastFetchedListing && (
                  <p className='loadMore' onClick={onFetchMoreListings}>
                    Load More
                  </p>
                )}
              </>

            ): ( <p>No Cars In Stock</p>)
         
       


      )

      
      }







                
              </div>


        </div>















        <ul style={{listStyle:'none' }} >
          <Link to='/stock' >

            

          <li style={{width:'29.5%', height:'80%', padding:'1.5%' }}>
            <img src={mainHome} alt="car1"  width='100%' height='240px' style={{objectFit:'cover'}}/>
            <h3 style={{paddingTop:'5.5%',  fontSize:'1.4rem'}}>McLaren 600LT T V8 Spider</h3>
            <p style={{paddingTop:'2.5%'}}>Elite Paint - Chicane Grey with Alcantara Carbon Black / Graphite</p>

            <div style={{display:'flex', justifyContent:'space-between', backgroundColor:'rgb(211,211,211)' , padding:'2.5%' ,
          marginBottom:'1.5%'   }}>
                <p style={{margin:'auto', marginLeft:'1.5%'}}>Year</p>
                <p style={{margin:'auto', marginRight:'1.5%'}}>2022</p>
            </div>


            <div style={{display:'flex', justifyContent:'space-between', paddingTop:'1.5%', paddingBottom:'1.5%',
          paddingLeft:'2.5%', paddingRight:'2.5%' }}>
                <p style={{margin:'auto', marginLeft:'1.5%'}}>Mileage</p>
                <p style={{margin:'auto', marginRight:'1.5%'}}>10500</p>
            </div>


            <div style={{display:'flex', justifyContent:'space-between', backgroundColor:'rgb(211,211,211)' , padding:'2.5%' ,
          marginBottom:'1.5%'   }}>
                <p style={{margin:'auto', marginLeft:'1.5%'}}>Gearbox</p>
                <p style={{margin:'auto', marginRight:'1.5%'}}>Automatic</p>
            </div>

            <div style={{textAlign:'right', paddingTop:'1.5%', paddingBottom:'1.5%',}}>
              <p style={{fontSize:'1.4rem', fontWeight:'bold', color:'rgb(128,0,0)' }}>£154,280</p>
            </div>
        

          </li>
          
          </Link>





        </ul>


  









    </div>
  );
}

export default Stock;
