import { useState, useEffect } from 'react'
import { getAuth, updateProfile  } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'

import { IoCarSportSharp } from "react-icons/io5";






function Admin() {
  
  const auth = getAuth()
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  const [changeDetails, setChangeDetails] = useState(false)

  
  const { name, email } = formData

  const navigate = useNavigate()





  
  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }




  
  const onSubmit = async () => {
    
    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name in fb
        await updateProfile(auth.currentUser, {
          displayName: name,
        })

        // Update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name,
        })
      }
    } catch (error) {
      console.log(error)
      toast.error('Could not update profile details')
    }
  }




  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }











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
        <p
          className='changePersonalDetails'
          onClick={() => {
            changeDetails && onSubmit()
            setChangeDetails((prevState) => !prevState)
          }}
        >
          {changeDetails ? 'done' : 'change'}
        </p>
      </div>

      <div className='profileCard'>
        <form>
          <input
            type='text'
            id='name'
            className={!changeDetails ? 'profileName' : 'profileNameActive'}
            disabled={!changeDetails}
            value={name}
            onChange={onChange}
          />
          <input
            type='text'
            id='email'
            className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
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
{/* 
      {!loading && listings?.length > 0 && (
        <>
          <p className='listingText'>Your Listings</p>
          <ul className='listingsList'>
            {listings.map((listing) => (
              <ListingItem
                key={listing.id}
                listing={listing.data}
                id={listing.id}
                onDelete={() => onDelete(listing.id)}
                onEdit={() => onEdit(listing.id)}
              />
            ))}
          </ul>
        </>
      )}  */}
    </main>
  </div>
  )
}

export default Admin