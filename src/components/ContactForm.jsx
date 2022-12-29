
import React from 'react'
import mc20 from '../assets/photos/maserati-mc20.jpg'
import CompanyLogo from '../assets/Logos/Logo.jpg'
import { Form, Field } from "react-final-form";
import Button from '@mui/material/Button';





const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const required = value => (value ? undefined : "*Required");
const mustBeNumber = value => (isNaN(value) ? "Must be a number" : undefined);

const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);






function ContactForm({car, carUrl}) {


 const handleSubmit = async values =>{
  await sleep(300);
      // values.email,
      // values.phone,
      // values.message,
      // values.name,

     // carName,
    // carDescription,
     // carUrl,


      console.log(car)

    console.log( values.email, values.phone, values.message,  values.name, car.title, car.description, carUrl )

  };





  return (
    <div style={{padding:'2.5%'}}>


        <div style={{textAlign:'center'}}>
          <h3>Vehicle Enquiries</h3>
        </div>


        <div style={{ display:'flex' }}>

            <div style={{width:'35%'}}>
                <p>{car.title}</p>
                <p>{car.description}</p>
                <div>
                  <img src={car.imageUrls[0]} alt="Maserati mc20" width='173px'  height='115px' style={{objectFit:'cover'}}/>
                </div>
                <div style={{display:'flex', }}>
                  <img src={CompanyLogo} alt="Company Logo"  width='104px' style={{objectFit:'cover'}}/>
                </div>
              

            </div>


            <div style={{width:'65%'}}>
           









                          
            <article  style={{'backgroundColor':'#FBFBFB'}} >
                                              <main >

                                              <span> Name </span><span style={{color:'red'}}> * </span>
                                                  <Form
                                                
                                                onSubmit={handleSubmit}
                                                render={({ handleSubmit, reset, submitting, pristine, values }) => (
                                                  <form   onSubmit={handleSubmit}>
                                                

																									

                                              
                                                    <Field name="name" validate={required}  >
                                                      {({ input, meta }) => (
                                                        <div >
                            
                                                          <label
                                                          htmlFor="yourName"
                                                          style={{'color':'#3F1717',  'fontSize':'1.0rem'}}>
                                                         
                                                          </label>
                            
                                                          <input {...input} 
                                                          type="text" 
                                                          
                                                          
                                                          style={{ 'fontSize':'1.0rem'}}
                                                          />
                                                          {meta.error && meta.touched && <span className='meta-era'>{meta.error}</span>}
                                                        </div>
                                                      )}
                                                    </Field>
                            
                                                    <span>Email </span><span style={{color:'red'}}> * </span>
                                                    <Field name="email" validate={required}  >
                                                      {({ input, meta }) => (
                                                        <div>
                            
                                                          <label 
                                                          htmlFor="email-address" 
                                                          style={{'color':'#3F1717',  'fontSize':'1.0rem'}}>
                                                          
                                                          </label>
                            
                                                          <input {...input} 
                                                          type="text" 
                                                          
                                                          
                                                          />
                                                          {meta.error && meta.touched && <span className='meta-era'>{meta.error}</span>}
                                                        </div>
                                                      )}
                                                    </Field>
                                                    
                            
                            
                            
                                                    <span>Phone Number</span> <span style={{color:'red'}}> * </span>      
                                                  <Field  name="phone" validate={composeValidators(required, mustBeNumber)}
                                                  >
                            
                                                    {({ input, meta }) => (
                                                      <div  >
                            
                                                        <label
                                                        
                                                        htmlFor="phone"
                                                        style={{'color':'#3F1717',  'fontSize':'1.0rem'}}>
                                                      
                                                        </label>
                                                        <input {...input}
                                                        type="text" 
                                                        
                                                      
                                                        />
                                                        {meta.error && meta.touched && <span className='meta-era'>{meta.error}</span>}
                                                      </div>
                                                    )}
                                                  </Field>





                                                  <span>Message</span> <span style={{color:'red'}}> * </span>
                                                  <Field name="message" validate={required}>
                                                    {({ input, meta }) => (
                                                      <div   >
                            
                                                        <label 
                                                        htmlFor="message" 
                                                        style={{'color':'#3F1717',  'fontSize':'1.0rem'}}>
                                                       
                                                        </label>
                                                      <textarea {...input}
                                                        type="text"
                                                        placeholder="Your message"
                                                       
                                                        rows="15" 
                                                        cols="50" />
                                                        {meta.error && meta.touched && <span className='meta-era'>{meta.error}</span>}
                                                      </div>
                                                    )}
                                                  </Field>
                      
                            
                            
                                                
                                               

                      
                      
                      
                                                  
                                                  <p  style={{ 'fontSize':'1.0rem'}}>* Fill in all details before sending.</p>
                                                  {/* <h2 ref={this.myRef}   style={{'fontSize':'1.0rem'}}>{this.state.apiResponseMessage}</h2>	 */}
                                                  
                                                  {/* <div   >
                                                      <ReCAPTCHA
                                                        key="normal-recaptcha"
                                                        size="normal"
                                                        sitekey="6LegIIMcAAAAAOC219gt52xjBR1lzsdDDHTyzP4o"
                                                        onChange={this.onReCaptureChange}
                                                        ref={e => (this.captcha = e)}
                                                        theme="dark"
                                                      />
                      
                                                  </div> */}
                                                      
                                                  
                                                
                      
                      
                                
                                                      <div >
                                                        <Button variant="contained"  
                                                        type="submit"
                                                        disabled={submitting}
                                                        className='button-links-on-mobile ' 
                                                        style={{'backgroundColor':'black', 'color':'white', 'fontSize':'1.0rem', 'padding':'10px 30px 10px 30px', }} 
                                                        >

                                                          {/* {this.state.loading && <i class="fas fa-spinner fa-spin fa-2x ph3"></i>}
                                                          {this.state.loading && <span>SENDING......</span>}
                                                          {!this.state.loading && <span>SEND</span>} */}

                                                          Send

                                                        </Button>
                                                        
                                                      </div>
                                                      
                                                          </form>
                                                        )}
                                                     />
                                                  </main>
                                    </article>












            </div>
      
    
        </div>
   
    </div>
  )
}

export default ContactForm