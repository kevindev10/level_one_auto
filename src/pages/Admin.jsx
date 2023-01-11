import { useState, useEffect } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { 
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
  getCountFromServer
 } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import { IoCarSportSharp } from "react-icons/io5";
import CarItem from '../components/CarItem'



import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { async } from '@firebase/util'






function Admin() {
  
  const auth = getAuth()
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  const [loading, setLoading] = useState(true)
  const [cars, setCars] = useState(null)
  const [changeDetails, setChangeDetails] = useState(false)
  const { name, email } = formData
  const [value, setValue] = useState(0);
  const [ collectionCount, setCollectionCount] = useState(0)
  const [ totalCarsForSale, setTotalCarsForSale] = useState(0)
  const [ totalCarsSold, setTotalCarsSold ] = useState(0)
  const [featuredVehicle, setFeaturedVehicle] = useState(null)



  const navigate = useNavigate()





  
  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }




  
  // const onSubmit = async () => {
    
  //   try {
  //     if (auth.currentUser.displayName !== name) {
  //       // Update display name in fb
  //       await updateProfile(auth.currentUser, {
  //         displayName: name,
  //       })

  //       // Update in firestore
  //       const userRef = doc(db, 'users', auth.currentUser.uid)
  //       await updateDoc(userRef, {
  //         name,
  //       })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     toast.error('Could not update profile details')
  //   }
  // }



  // Fetch car listings

  useEffect(() => {
    const fetchUserListings = async () => {
      const carsRef = collection(db, 'cars')

      const q = query(
        carsRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      )

      const querySnap = await getDocs(q)

      let cars= []

      querySnap.forEach((doc) => {
        return cars.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setCars(cars)
      setLoading(false)
    }

    fetchUserListings()
  }, [auth.currentUser.uid])




// On Cnange function

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }


// On Cnange function
  const onDelete = async (carId) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteDoc(doc(db, 'cars', carId))
      const updatedCars = cars.filter(
        (car) => car.id !== carId
      )
      setCars(updatedCars)
      toast.success('Successfully Deleted Car listing!')
    }
  }

  const onEdit = (carId) => navigate(`/edit-car/${carId}`)








 // Tabs for Material Ui

 
function TabPanel(props) {
  const { children, value, index, ...other } = props;
 
  return (
    
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'} >{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


// Fetch collection size count from firestore

useEffect(() =>{
  const collectionCount = async() =>{
      const coll = collection(db, "cars");
      const query_ = query(coll,  where('userRef', '==', auth.currentUser.uid));
      const snapshot = await getCountFromServer(query_);
      
      setCollectionCount(snapshot.data().count);
  }

  const totalCarsForSale = async() =>{
      
    const coll = collection(db, "cars");
    const query_ = query(coll, where('sold', '==', false), where('userRef', '==', auth.currentUser.uid));
    const snapshot = await getCountFromServer(query_);
    setTotalCarsForSale(snapshot.data().count);
      
  }
  const totalCarsSold = async() =>{
      
    const coll = collection(db, "cars");
    const query_ = query(coll, where('sold', '==', true), where('userRef', '==', auth.currentUser.uid));
    const snapshot = await getCountFromServer(query_);
    setTotalCarsSold(snapshot.data().count);
      
  }

 

  
  collectionCount()
  totalCarsForSale()
  totalCarsSold ()
  
})


// Fetch featured vehicle from firestore

useEffect(() =>{


 

    const getFeaturedVehicle = async() =>{
      try {
          const carsRef = collection(db, "cars");
          const q = query(
            carsRef,
            where('featuredVehicle', '==', true),
            where('userRef', '==', auth.currentUser.uid),
            orderBy('timestamp', 'desc')
            )
        
            const querySnap = await getDocs(q)
      
            let featuredCar= []
            querySnap.forEach((doc) => {
              return featuredCar.push({
                id: doc.id,
                data: doc.data(),
              })
            })
            
            setFeaturedVehicle(featuredCar)
            setLoading(false)
  
  
  
  
    
    
        } catch (error) {
         
        }
      } 

  getFeaturedVehicle()      
}, [auth.currentUser.uid])





  return (
    <div className='profile'>
    <header className='profileHeader'>
      <p className='pageHeader'>Admin</p>
      <button type='button' className='logOut' onClick={onLogout}>
        Logout
      </button>
    </header>

    <main>
      <div className='profileDetailsHeader'>
        <p className='profileDetailsText'>Personal Details</p>
        {/* <p
          className='changePersonalDetails'
          onClick={() => {
            changeDetails && onSubmit()
            setChangeDetails((prevState) => !prevState)
          }}
        >
          {changeDetails ? 'done' : 'change'}
        </p> */}
      </div>

      <div className='profileCard'>
        <form>
          <input
            type='text'
            id='name'
            //className={!changeDetails ? 'profileName' : 'profileNameActive'}
            className= 'profileNameActive'
           disabled={!changeDetails}
            value={name}
            onChange={onChange}
          />
          <input
            type='text'
            id='email'
           // className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
            className= 'profileEmailActive'
            disabled={!changeDetails}
            value={email}
            onChange={onChange}
          />
        </form>
      </div>

    <Link to='/add-car' className='createListing'>
        
        <IoCarSportSharp />
        <p>Add Car to stock</p>
        <img src={arrowRight} alt='arrow right' />
      </Link>

    





      <p className='pageHeader'>Total Cars: {collectionCount} </p>
      <p className='pageHeader'>Total Cars For Sale: {totalCarsForSale} </p>
      <p className='pageHeader'>Total Cars Sold: {totalCarsSold} </p>
      {/* <p className='pageHeader'>Featured Car: {featuredVehicle[0].data.title} </p> */}
      {featuredVehicle !== null && 
         <p className='pageHeader'>Featured Car: {featuredVehicle[0].data.title} </p>
      
      }



                <div>








                <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={value} onChange={(event, newValue) => {setValue(newValue)}} aria-label="basic tabs example">
                    <Tab label="For Sale" {...a11yProps(0)} />
                    <Tab label="Sold" {...a11yProps(1)} />
                    <Tab label="FEATURED" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  
                {!loading && cars?.length > 0 && (
                  
                  <main>

                      <div style={{fontSize :'1.6rem', textAlign:'center', color:'maroon', letterSpacing:'0.25rem'}}>
                           <p >Your Car Listings</p>
                      </div>
                  
                    <ul className='stock-card-ul' style={{display:'flex',  flexWrap:'wrap', listStyle:'none', paddingTop:'2.5%', width:'100%', paddingBottom:'2.5%'}} >
                      {cars.map((car) => (
                        car.data.sold === false && ! car.data.featuredVehicle &&
                        // car.data.featuredVehicle && car.data.featuredVehicle === true &&
                        <div className='stock-card-div' key={car.id} style={{flex:'33.33%', width:'100%', marginBottom:'2.5%', paddingLeft:'2.5%', paddingRight:'2.5%', maxWidth:'33.33%'}}>
                            <CarItem
                              key={car.id}
                              car={car.data}
                              id={car.id}
                              onDelete={() => onDelete(car.id)}
                              onEdit={() => onEdit(car.id)}
                            />
                        </div>
                      ))}
                    </ul>


                  </main>
                )} 


                </TabPanel>
                <TabPanel value={value} index={1}>
                 
                {!loading && cars?.length > 0 && (
     
                  <>
                      
                    <p className='listingText'>Your Car Listings</p>
                    <ul className='listingsList'>
                      {cars.map((car) => (
                        car.data.sold === true &&
                        <CarItem
                          key={car.id}
                          car={car.data}
                          id={car.id}
                          onDelete={() => onDelete(car.id)}
                          onEdit={() => onEdit(car.id)}
                        />
                      ))}
                    </ul>
                  </>
                )} 


                </TabPanel>




                <TabPanel value={value} index={2}>
                 
                 {!loading && cars?.length > 0 && (
      
                   <>
                       
                     <p className='listingText'>Your Car Listings</p>
                     <ul className='listingsList'>
                       {cars.map((car) => (
                        car.data.featuredVehicle && car.data.featuredVehicle === true &&
                     
                         <CarItem
                           key={car.id}
                           car={car.data}
                           id={car.id}
                          //  onDelete={() => onDelete(car.id)}
                           onEdit={() => onEdit(car.id)}
                         />
                       ))}
                     </ul>
                   </>
                 )} 
 
 
                 </TabPanel>     



     
              </Box>









                </div>

       
        
         
        


    </main>
  </div>
  )
}

export default Admin