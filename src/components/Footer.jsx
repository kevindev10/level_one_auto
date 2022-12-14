
import React from 'react'
import './Footer.css'
import {Link} from 'react-router-dom'

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';







function Footer() {
  return (
    <footer className='footer'>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
        bgcolor="text.primary"
        color="white"
       
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box className ='footer-heading'>Quick Links</Box>
              <Box>
                <Link to="/"  onClick={() => window.scrollTo(0, 0)} color="inherit" className ='footer-navlinks'  underline="none" >
                  Home
                </Link>
              </Box>
              <Box>
                <Link to="/stock"  onClick={() => window.scrollTo(0, 0)} color="inherit" className ='footer-navlinks'  underline="none">
                  Stock
                </Link>
              </Box>
              <Box>
                <Link to="/previously-sold"   onClick={() => window.scrollTo(0, 0)} color="inherit" className ='footer-navlinks'  underline="none">
                  Previously Sold
                </Link>
              </Box>
              <Box>
                <Link to="/sell-your-car"  onClick={() => window.scrollTo(0, 0)} color="inherit" className ='footer-navlinks'  underline="none">
                  Sell Your Car
                </Link>
              </Box>
              <Box>
                <Link to="/frequently-asked-questions"  onClick={() => window.scrollTo(0, 0)} color="inherit" className ='footer-navlinks'  underline="none">
                  Frequently Asked Questions
                </Link>
              </Box>
              <Box>
                <Link to="/contact-us"  onClick={() => window.scrollTo(0, 0)}  color="inherit" className ='footer-navlinks'  underline="none">
                  Contact Us
                </Link>
              </Box>
            </Grid>




            <Grid item xs={12} sm={4}>
              <Box className ='footer-heading'>Get In touch</Box>
              <div className='footerSocialIconsFlexDivs'>
                  <div className='footerSocialIconsFlexDivsOnMobile'>
              <Box>
                  <a href="tel:+000000000" className='social-navlinks'>
                  <i className="fas fa-phone-alt fa-3x footer-phone"></i>
                  </a>
              </Box>
              <Box>
                <a href="mailto:leveloneauto@mail.com" target="blank" rel="noreferrer" className='social-navlinks'>
                 <i className="fas fa-envelope  fa-3x footer-email"></i>
                </a>
              </Box>

              <Box>
                 <a href="https://web.facebook.com/" target="blank" rel="noreferrer" className='social-navlinks' aria-label="Facebook link" >	<i className=" fab fa-facebook-square fa-3x footer-social-facebook"></i></a>
              </Box>
               </div>


                <div>

              <Box>
                 <a href="https://twitter.com/" target="blank" rel="noreferrer" className='social-navlinks' aria-label=" Twitter link">   <i className="fab fa-twitter-square  fa-3x  footer-social-twitter"></i> </a>

              </Box>

              <Box >
                  <a href='https://www.instagram.com/?hl=en' target="blank" rel="noreferrer"       className='social-navlinks'>
                      <i className="fab fa-instagram-square fa-3x  footer-social-instagram"></i>
                  </a>
              
              </Box>

              <Box>
              <a href="https://wa.me/message/" target="blank" rel="noreferrer" className='social-navlinks' aria-label="WhatsApp chat link">	<i className=" fab fa-whatsapp-square fa-3x   footer-social-whatsapp"></i> </a>

              </Box>
               </div>
 
              </div>
              

             
            </Grid>




            <Grid item xs={12} sm={4}>
              <Box className ='footer-heading'>Company Info</Box>
              <Box>
                <Link href="/" color="inherit" className ='footer-navlinks'  underline="none">
                  Terms $ Conditions
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit" className ='footer-navlinks'  underline="none">
                  Privacy Policy
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit" className ='footer-navlinks'  underline="none">
                  Our History
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            Level One Auto &reg; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  )
}

export default Footer