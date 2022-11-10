import { useEffect, useRef, useState } from 'react'
//import { useParams } from 'react-router-dom'
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
import Button from '@mui/material/Button';






function Stock() {


  const [cars, setCars] = useState(null)
  const [loading, setLoading] = useState(true)
  //const [lastFetchedListing, setLastFetchedListing] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [selectedOption3, setSelectedOption3] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectSearchResults, setSelectSearchResults] = useState(null)

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
          limit(10)
        )

        // Execute query
        const querySnap = await getDocs(q)

        // const lastVisible = querySnap.docs[querySnap.docs.length - 1]
        // setLastFetchedListing(lastVisible)

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

  // // Pagination / Load More
  // const onFetchMoreListings = async () => {
  //   try {
  //     // Get reference
  //     const listingsRef = collection(db, 'listings')

  //     // Create a query
  //     const q = query(
  //       listingsRef,
  //       where('type', '==', params.categoryName),
  //       orderBy('timestamp', 'desc'),
  //       startAfter(lastFetchedListing),
  //       limit(10)
  //     )

  //     // Execute query
  //     const querySnap = await getDocs(q)

  //     const lastVisible = querySnap.docs[querySnap.docs.length - 1]
  //     setLastFetchedListing(lastVisible)

  //     const listings = []

  //     querySnap.forEach((doc) => {
  //       return listings.push({
  //         id: doc.id,
  //         data: doc.data(),
  //       })
  //     })

  //     setListings((prevState) => [...prevState, ...listings])
  //     setLoading(false)
  //   } catch (error) {
  //     toast.error('Could not fetch listings')
  //   }
  //}














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
  
          // const lastVisible = querySnap.docs[querySnap.docs.length - 1]
          // setLastFetchedListing(lastVisible)
  
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
  
          // const lastVisible = querySnap.docs[querySnap.docs.length - 1]
          // setLastFetchedListing(lastVisible)
  
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
  
          // const lastVisible = querySnap.docs[querySnap.docs.length - 1]
          // setLastFetchedListing(lastVisible)
  
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
  
          // const lastVisible = querySnap.docs[querySnap.docs.length - 1]
          // setLastFetchedListing(lastVisible)
  
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
      <header>
        <p className='pageHeader'>
          STOCK
        </p>
      </header>



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










  
      



















      <div style={{display: 'flex', padding: '1.5%', marginBottom:'5%'  }}>
                  <div  style={{padding: '2.5%', width :'25%'}}>
                    <label className='formLabel'>Make</label>
                    <Select
                      ref= {selectRef}
                      defaultValue={selectedOption}
                      onChange={setSelectedOption}
                      options={makes}
                      required
                    
                    />
                  </div>
              
                  <div  style={{padding: '2.5%', width :'25%'}}> 
                    <label className='formLabel'>Min Price &nbsp; Ksh: </label>
                    <Select
                      ref= {selectRef1}
                      defaultValue={selectedOption}
                      onChange={setSelectedOption2}
                      options={minPrice}
                      required
                  />
       
                </div>
                <div  style={{padding: '2.5%', width :'25%' }}>
                  <label className='formLabel'>Max Price &nbsp; Ksh: </label>
                    <Select
                    ref= {selectRef2}
                    defaultValue={selectedOption}
                    onChange={setSelectedOption3}
                    options={maxPrice}
                    required
                  />
                </div>
       
                <button  onClick={handleSelectSearchSubmit}  style={{padding: '0.6%', width :'20%', height:'4%', marginTop:'5.6%' , fontSize:'17px', backgroundColor:'grey'}}  >
                  Search
                </button>
             
              
       
                </div>


   


      {loading ?(
         <Spinner />
      ):(
           
            cars && cars.length > 0 ? (
              <>
                <main>
              
            
       
       
                  
                  <ul className='categoryListings'>
                    {/* {console.log(cars)} */}
                    {cars.map((car) => (
                   
                      <CarItem
                        car={car.data}
                        id={car.id}
                        key={car.id}
                      />
                    ))}
                  </ul>
       
       
       
       
       
       
                </main>
       
                <br />
                <br />
                {/* {lastFetchedListing && (
                  <p className='loadMore' onClick={onFetchMoreListings}>
                    Load More
                  </p>
                )} */}
              </>

            ): ( <p>No Cars In Stock</p>)
         
       


      )

      
      }








    </div>
  );
}

export default Stock;
