import { Link } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'
import './CarItem.css'


function CarItem({ car, id, onEdit, onDelete }) {
  return (

    <div>
  

            

            <li className='car-item-li-on-mobile' style={{ height:'80%', padding:'3%'}}>
            <div className='car-item-img-div-on-mobile' style={{width:'100%', height:'215px'}}>
              <img className='car-item-img-on-mobile' src={car.imageUrls[0]} alt={car.title}  width='100%' height='215px' style={{objectFit:'cover'}}/>
 

 
                       <div className=''></div>
                          <div className="centered1-stock-card">
                            <Link to={`/car/${id}`}>
                              <div className="btn-stock-card from-left-stock-card">More Details</div>
                            </Link>
                          </div>



            </div>
             {/* eslint-disable-next-line */}
              <div style={{height: 'auto !important', height: '77px', }}>
              <h3 style={{paddingTop:'5.5%', fontSize:'1.2rem', }}>{car.title}</h3>
              </div>
              
              {/* eslint-disable-next-line */}
              <div style={{height: 'auto !important', height: '57px',}}>
              <p>{car.description}</p>
              </div>



              <div style={{display:'flex', justifyContent:'space-between', backgroundColor:'rgb(211,211,211)' , padding:'2.5%' ,
            marginBottom:'1.5%'   }}>
                  <p style={{margin:'auto', marginLeft:'1.5%'}}>Year</p>
                  <p style={{margin:'auto', marginRight:'1.5%'}}>{car.year}</p>
              </div>


              <div style={{display:'flex', justifyContent:'space-between', paddingTop:'1.5%', paddingBottom:'1.5%',
            paddingLeft:'2.5%', paddingRight:'2.5%' }}>
                  <p style={{margin:'auto', marginLeft:'1.5%'}}>Engine Capacity</p>
                  <p style={{margin:'auto', marginRight:'1.5%'}}>{car.engineCapacity}</p>
              </div>


              <div style={{display:'flex', justifyContent:'space-between', backgroundColor:'rgb(211,211,211)' , padding:'2.5%' ,
            marginBottom:'1.5%'   }}>
                  <p style={{margin:'auto', marginLeft:'1.5%'}}>Gearbox</p>
                  <p style={{margin:'auto', marginRight:'1.5%'}}> {car.gearbox}</p>
              </div>

             
            {car.offer? 

                    <div style={{textAlign:'right', paddingTop:'1.5%', paddingBottom:'1.5%',}}>
                      <p  style={{fontSize:'1.05rem', fontWeight:'bold', color:'black'}}>
                      Was : &nbsp; 
                        <s >
                        Ksh &nbsp; 
                      { car.regularPrice
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </s>

                                  
                      </p>
                        
                      
                      <p style={{fontSize:'1.05rem', fontWeight:'bold', color:'rgb(128,0,0)' }}>
                      Now : &nbsp;Ksh &nbsp; 
                        { car.discountedPrice
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}

                      </p>

                    </div>
                    
                    
                    :
                    <div style={{textAlign:'right', paddingTop:'1.5%', paddingBottom:'1.5%',}}>
                            <p style={{fontSize:'1.05rem', fontWeight:'bold', color:'rgb(128,0,0)' }}>
                              Ksh &nbsp; 
                                { car.regularPrice
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}

                            </p>

                            {/* eslint-disable-next-line */}
                            <p style={{height: 'auto !important', height: '26px', }}></p>





                            
                    </div>
                

             }


            </li>


             {/* <div style={{display:'flex', justifyContent:' space-around', }}>
                <div style={{ display:'flex',justifyContent:' space-around', backgroundColor:'gray', padding:'3%', width:'95%'}}>
                    {onDelete && (
                    
                      <DeleteIcon
                        style ={{cursor:'pointer'}}
                        className=''
                        fill='rgb(231, 76,60)'
                        onClick={() => onDelete(car.id, car.name)}
                      />
                  
                    )}


          

                  {onEdit && <EditIcon style ={{cursor:'pointer', }} className='' onClick={() => onEdit(id)} />}

                </div>

              </div> */}





             
                    {onDelete && onEdit && (

                    <div style={{display:'flex', justifyContent:' space-around', marginBottom:'15%', }}>
                        <div style={{ display:'flex',justifyContent:' space-around', backgroundColor:'rgb(220,220,220)', padding:'3%', width:'95%', border:'1px solid orange '}}>
                          
                            <DeleteIcon
                              style ={{cursor:'pointer'}}
                              className=''
                              fill='rgb(231, 76,60)'
                              onClick={() => onDelete(car.id, car.name)}
                            />


                            <EditIcon 
                            style ={{cursor:'pointer', }} 
                            className=''
                            onClick={() => onEdit(id)}
                            />

                         </div>

                    </div>
                                      
                    )}


          

                

             











     </div>



















                










   
  )
}

export default CarItem
