


import { useEffect,  useState } from 'react'
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
import audi  from '../assets/stockPagePhotos/audi-r82.jpg'






function PreviouslySold() {

  const [cars, setCars] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedListing, setLastFetchedListing] = useState(null)






  useEffect(() => {
    // setSelectSearchResults(null)
    const fetchCars = async () => {
      try {

        // Get reference
        const carsRef = collection(db, 'cars')

        // Create a query
        const q = query(
          carsRef,
          where('sold', '==', true),
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
        where('sold', '==', true),
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





  return (
    <div className='category'>

      <div className='main-div-select-search-background'  >   

              <div className='select-search-div-background-photo' style={{"backgroundImage": "url(" +audi+ ") "}}>

              <div style={{textAlign:'center', paddingTop:'8.7%'}}>
                      <p style={{fontSize:'2.0rem', color:'white', fontWeight:'bold', letterSpacing: '0.2rem'}}>Previously Sold</p>
                      </div>

              </div>


      </div>

      <div className='main-div-select-search-background-on-mobile'  >


        <div className='select-search-div-background-photo-on-mobile' style={{"backgroundImage": "url(" +audi+ ") ", }}>

        <div style={{textAlign:'center', paddingTop:'34%'}}>
                      <p style={{fontSize:'1.4rem', color:'white', fontWeight:'bold', letterSpacing: '0.2rem'}}>Previously Sold</p>
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
                        {/* {console.log(cars)} */}
                    
                        
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
  )
}

export default PreviouslySold