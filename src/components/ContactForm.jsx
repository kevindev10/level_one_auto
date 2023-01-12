
import { useState, useRef } from 'react';
import CompanyLogo from '../assets/Logos/Logo.jpg'
import { Form, Field } from "react-final-form";
import Button from '@mui/material/Button';
import ReCAPTCHA from "react-google-recaptcha";
import './ContactForm.css'






const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const required = value => (value ? undefined : "*Required");
const mustBeNumber = value => (isNaN(value) ? "Must be a number" : undefined);

const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);






function ContactForm({car, carUrl}) {

  const [reCaptcha, setRecaptcha] = useState('')
  const [loading, setLoading] = useState(false)
  const [apiResponseMessage, setApiResponseMessage] = useState('')
  const [sent, setSent] = useState(false)


  let captchaRef = useRef();
  let captchaMsgResRef = useRef();
  let captchaMsgResRef2 = useRef();



  const  onReCaptureChange = (value) =>{
      setRecaptcha(value)
	
	}






 const handleSubmit = async values =>{
  await sleep(300);


    setLoading(true)
    fetch('http://192.168.100.4:3001/contactUs', {
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
      
      email: values.email,
      phone: values.phone,
      message: values.message,
      yourName: values.name,
      carTitle: car.title,
      carDescription: car.description,
      carUrl: carUrl,
	    captcha:reCaptcha
      
     
      })
    })

    .then(response =>response.json())

    .then(data => {
     
      setLoading(false)
      if (data.success===false){
        setSent(false)
       setApiResponseMessage(data.msg)
        

       captchaMsgResRef.current.scrollIntoView({ behavior: 'smooth',block: 'center',	inline: 'center'})
 
       
     }else if(data.success===true){
      setSent(true)
      setApiResponseMessage(data.msg)
       
        setTimeout(() =>{
          captchaMsgResRef2.current.scrollIntoView({ behavior: 'smooth',block: 'center',	inline: 'center'})
        }, 500)
   
    }
    
    })


    //   console.log(car)

    // console.log( values.email, values.phone, values.message,  values.name, car.title, car.description, carUrl, reCaptcha )





     captchaRef.reset();

  };





  return (
    <div style={{paddingLeft:'2.5%', paddingRight:'2.5%', paddingBottom:'2.5%'}}>


        <div style={{textAlign:'center', fontSize:'1.6rem', marginBottom:'2.5%'}} className='contact-form-page-heading-on-mobile'>
          <h3>Vehicle Enquiries</h3>
        </div>


        <div style={{ display:'flex' }}  className='contact-form-main-flex'>

            <div style={{width:'35%',  paddingRight:'2.5%'}} className='contact-form-car-section-main'>
                <p style={{fontWeight:'bold', fontSize:'1.1rem'}} className='contact-form-page-title-on-mobile'>{car.title}</p>
                <p className='contact-form-page-description-on-mobile'>{car.description}</p>
                <div style={{
                   width:'19.94vw', marginTop:'2.5%' , marginBottom:'2.5%' }} className='contact-form-page-image-div-on-mobile'>
                  <img src={car.imageUrls[0]} alt="Maserati mc20"   style={{objectFit:'cover', maxWidth:'100%' }} className='contact-form-page-image-on-mobile'/>
                </div>
          
                <div style={{ width:'11.94vw', }} className='contact-form-page-logo-div-on-mobile'>
                  <img src={CompanyLogo} alt="Company Logo"    style={{objectFit:'cover',maxWidth:'100%' }}/>
                </div>
              
  
               

            </div>


            <div style={{width:'65%', marginLeft:'2.5%'}}  className='contact-form-form-section-main'>
           




            { !sent ?
               (




                          
                  <article  style={{'backgroundColor':'#FBFBFB', padding:'5.5%', }} className='contact-form-form-section-bgcolor' >
                                                    <main >

                                                    <span style={{paddingLeft:'2.5%', marginTop:'2.5%'}} className='form-label-on-mobile'> Name </span><span style={{color:'red', fontWeight:'bold'}}  className='form-label-on-mobile'> * </span>
                                                        <Form
                                                      
                                                      onSubmit={handleSubmit}
                                                      render={({ handleSubmit, reset, submitting, pristine, values }) => (
                                                        <form   onSubmit={handleSubmit}>
                                                      

                                                        

                                                    
                                                          <Field name="name" validate={required}  >
                                                            {({ input, meta }) => (
                                                              <div  style={{paddingLeft:'2.5%', paddingRight:'2.5%', paddingTop:'1.0%', paddingBottom:'2.5%'}} className='form-field-div-padding-on-mobile'>
                                  
                                                                <label
                                                                htmlFor="yourName"
                                                                style={{'color':'#3F1717',  'fontSize':'1.0rem'}}>
                                                              
                                                                </label>
                                  
                                                                <input {...input} 
                                                                type="text" 
                                                                
                                                                className='input-box-styling'
                                                                style={{ 'fontSize':'1.0rem', width:'80%', padding:'2.0%', boxShadow: '4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )'}}
                                                                />
                                                                {meta.error && meta.touched && <span className='meta-era'>{meta.error}</span>}
                                                              </div>
                                                            )}
                                                          </Field>
                                  
                                                          <span style={{paddingLeft:'2.5%', marginTop:'2.5%'}} className='form-label-on-mobile'>Email </span><span style={{color:'red', fontWeight:'bold'}} className='form-label-on-mobile'> * </span>
                                                          <Field name="email" validate={required}  >
                                                            {({ input, meta }) => (
                                                              <div style={{paddingLeft:'2.5%', paddingRight:'2.5%', paddingTop:'1.0%', paddingBottom:'2.5%'}} className='form-field-div-padding-on-mobile'>
                                  
                                                                <label 
                                                                htmlFor="email-address" 
                                                                style={{'color':'#3F1717',  'fontSize':'1.0rem'}}>
                                                                
                                                                </label>
                                  
                                                                <input {...input} 
                                                                type="text" 
                                                                className='input-box-styling'
                                                                style={{ 'fontSize':'1.0rem', width:'80%', padding:'2.0%', boxShadow: '4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )'}}
                                                                
                                                                />
                                                                {meta.error && meta.touched && <span className='meta-era'>{meta.error}</span>}
                                                              </div>
                                                            )}
                                                          </Field>
                                                          
                                  
                                  
                                  
                                                          <span style={{paddingLeft:'2.5%', marginTop:'2.5%'}} className='form-label-on-mobile'>Phone Number</span> <span style={{color:'red', fontWeight:'bold'}} className='form-label-on-mobile'> * </span>      
                                                        <Field  name="phone" validate={composeValidators(required, mustBeNumber)}
                                                        >
                                  
                                                          {({ input, meta }) => (
                                                            <div style={{paddingLeft:'2.5%', paddingRight:'2.5%', paddingTop:'1.0%', paddingBottom:'2.5%'}} className='form-field-div-padding-on-mobile' >
                                  
                                                              <label
                                                              
                                                              htmlFor="phone"
                                                              style={{'color':'#3F1717',  'fontSize':'1.0rem'}}>
                                                            
                                                              </label>
                                                              <input {...input}
                                                              type="text" 
                                                              className='input-box-styling'
                                                              style={{ 'fontSize':'1.0rem', width:'80%', padding:'2.0%', boxShadow: '4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )'}}
                                                            
                                                              />
                                                              {meta.error && meta.touched && <span className='meta-era'>{meta.error}</span>}
                                                            </div>
                                                          )}
                                                        </Field>





                                                        <span style={{paddingLeft:'2.5%', marginTop:'2.5%'}} className='form-label-on-mobile'>Message</span> <span style={{color:'red', fontWeight:'bold'}} className='form-label-on-mobile'> * </span>
                                                        <Field name="message" validate={required} >
                                                          {({ input, meta }) => (
                                                            <div  style={{paddingLeft:'2.5%', paddingRight:'2.5%', paddingTop:'1.0%', paddingBottom:'2.5%'}} className='form-field-div-padding-on-mobile'>
                                  
                                                              <label 
                                                              htmlFor="message" 
                                                              style={{'color':'#3F1717',  'fontSize':'1.0rem'}}>
                                                            
                                                              </label>
                                                            <textarea {...input}
                                                             
                                                              type="text"
                                                              placeholder="Your message"
                                                              className='input-box-styling'
                                                              style={{ 'fontSize':'1.0rem', width:'80%', padding:'2.0%', boxShadow: '4px 4px 8px 0px rgba( 0, 0, 0, 0.2 )'}}
                                                              rows="10" 
                                                              cols="50" />
                                                              {meta.error && meta.touched && <span className='meta-era'>{meta.error}</span>}
                                                            </div>
                                                          )}
                                                        </Field>
                            
                                  
                                  
                                                      
                                                    

                            
                            
                            
                                                        
                                                        <p  style={{ 'fontSize':'1.0rem', paddingLeft:'2.5%', marginTop:'2.5%', color:'red',fontWeight:'bold' }}>* Fill in all details before sending.</p>
                                                        <h2 ref={captchaMsgResRef}   style={{'fontSize':'1.0rem', paddingLeft:'2.5%', marginTop:'2.5%', color:'orange',fontWeight:'bold'}}>{apiResponseMessage}</h2>	
                                                        
                                                        <div style={{  paddingLeft:'2.5%', marginTop:'2.5%'}} className='reCaptcha-on-mobile' >
                                                            <ReCAPTCHA
                                                              key="normal-recaptcha"
                                                              size="normal"
                                                              sitekey="6LegIIMcAAAAAOC219gt52xjBR1lzsdDDHTyzP4o"
                                                              onChange={onReCaptureChange}
                                                              ref={e => (captchaRef = e)}
                                                              theme="dark"
                                                            />
                            
                                                        </div>
                                                            
                                                        
                                                      
                            
                            
                                      
                                                            <div style={{  paddingLeft:'2.5%', marginTop:'2.5%'}}>
                                                              <Button variant="contained"  
                                                              type="submit"
                                                              disabled={submitting}
                                                              className='button-links-on-mobile ' 
                                                              style={{'backgroundColor':'black', 'color':'white', 'fontSize':'1.0rem', 'padding':'10px 30px 10px 30px', }} 
                                                              >

                                                                {loading && <i className="fas fa-spinner fa-spin fa-2x "></i>}
                                                                {loading && <span>SENDING......</span>}
                                                                {!loading && <span>SEND</span>}

                                                              

                                                              </Button>
                                                              
                                                            </div>
                                                            
                                                                </form>
                                                              )}
                                                          />
                                                        </main>
                  </article>




                ):
               (
                  

                   
                  <div style={{'backgroundColor':'#FBFBFB', padding:'5.5%'}}>
                      <div style={{paddingLeft:'2.5%', paddingRight:'2.5%', paddingTop:'1.0%', paddingBottom:'2.5%'}}>
                      <h2 ref={captchaMsgResRef2}   style={{'fontSize':'1.2rem', color:'orange',fontWeight:'bold'}}>{apiResponseMessage}</h2>
                      </div >
                    
                      <div style={{paddingLeft:'2.5%', paddingRight:'2.5%', paddingTop:'1.0%', paddingBottom:'2.5%'}}>
                        <Button  variant="contained"
                      
                        style={{'backgroundColor':'black', 'color':'white', 'fontSize':'1.0rem', 'padding':'10px 30px 10px 30px', }}
                        onClick={()=> window.location.reload()}
                        >
                        SEND NEW ENQUIRY
                        </Button>

                      </div>
                      
                            
                
                  </div>	

          
                 


                  
       






              )}


                    






            </div>
      
    
        </div>
   
    </div>
  )
}

export default ContactForm