import { useEffect, useState } from 'react'
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










function Stock() {


  const [cars, setCars] = useState(null)
  const [loading, setLoading] = useState(true)
  //const [lastFetchedListing, setLastFetchedListing] = useState(null)

 // const params = useParams()

  useEffect(() => {
    const fetchCars = async () => {
      try {
        // Get reference
        const carsRef = collection(db, 'cars')

        // Create a query
        const q = query(
          carsRef,
          where('sold', '==', false),
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





  return (
    <div className='category'>
      <header>
        <p className='pageHeader'>
          STOCK
        </p>
      </header>

      {loading ? (
        <Spinner />
      ) : cars && cars.length > 0 ? (
        <>
          <main>
            <ul className='categoryListings'>
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
      ) : (
        <p>No Cars In Stock</p>
      )}
    </div>
  );
}

export default Stock;
