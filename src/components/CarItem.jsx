import { Link } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'

function CarItem({ car, id, onEdit, onDelete }) {
  return (
    <li className='categoryListing'>
      <Link
        to={`/Car/${id}`}
        className='categoryListingLink'
      >
         {console.log(car)}
        <img
         src={car.imageUrls[0]}
         
         alt={car.title}
          className='categoryListingImg'
        />

        <div className='categoryListingDetails'>
          <p className='categoryListingName'>{car.title}</p>
          <p className='categoryListingLocation'>{car.description}</p> <br/>
      
          <div className='categoryListingInfoDiv'>
              <p className='categoryListingInfoText'>
                Year
              </p>
              <p className='categoryListingInfoText'>
                {car.year }
              </p>
          </div>

          <div className='categoryListingInfoDiv'>
              <p className='categoryListingInfoText'>
              Engine Capacity
              </p>
              <p className='categoryListingInfoText'>
                {car.engineCapacity}
              </p>
          </div>
       
          <div className='categoryListingInfoDiv'>
              <p className='categoryListingInfoText'>
                Gearbox
              </p>
              <p className='categoryListingInfoText'>
                {car.gearbox }
              </p>
          </div>
         

          {car.offer? 
            <div>
              <p className='categoryListingPrice' style={{color:'red'}}>
              Was : &nbsp; 
                <s >
                Ksh &nbsp; 
              { car.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </s>

                          
              </p>
                
              
              <p className='categoryListingPrice'>
              Now : &nbsp;  Ksh &nbsp; 
                { car.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}

              </p>

            </div>
             
             
            :<p className='categoryListingPrice'>
              Ksh &nbsp; 
                { car.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}

             </p>
        }


        
          <p className='categoryListingPrice'>
            
            
          </p>

          
        </div>
      </Link>

      {onDelete && (
        <DeleteIcon
          className='removeIcon'
          fill='rgb(231, 76,60)'
          onClick={() => onDelete(car.id, car.name)}
        />
      )}

      {onEdit && <EditIcon className='editIcon' onClick={() => onEdit(id)} />}
    </li>
  )
}

export default CarItem
