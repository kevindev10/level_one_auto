import React from 'react'
import './Home.css'
import Footer from '../components/Footer'
import BannerSliderHome from  '../components/bannerSliderHome/BannerSliderHome'
import mainHome from '../assets/homepagePhotos/mainHome.jpg'
import homeX from '../assets/homepagePhotos/homeX.jpg'





function Home() {
  return (
    <>
       <article className='bannerSliderHome'>
          <BannerSliderHome/>
       </article>
       <main > 

        <div className='firstDivAfterSLider'>
          <article className='firstArticleInFirstDiv'> 
              <h1 className='firstArticleInFirstDivH1'>Welcome to Level One Auto</h1> <br/> 
              <div className='firstArticleInFirstDivParagraph'>
              <p>Established over 15 years ago, <strong>Level One Auto</strong> is a family-run business and one that prides itself on looking after its customers.</p><br/>
              <p>We stock a wide range of nearly new and used cars to suit all budgets and lifestyles. No matter what type of car you’re looking for, we’re bound to have the right one for you.</p>
              <p><br/>
              Our aim is to make the purchase of your next car as simple and straightforward as possible. If you’re looking to sell your current car, we also provide a part exchange service where we offer you the best possible price in just a few easy step
              </p><br/>
              <p>So, if you have a question about a specific car, don’t see what you are looking for, want to arrange a test-drive, talk about finance or part-exchanging your car then either give us a call or complete the online enquiry form and one of our team will be happy to help you.</p> <br/> 


              </div>
             
           
          </article>

          <section className='firstSectionInFirstDiv'>
            <div className='mainphotoInFirstSection'>
              <img src={mainHome} alt="main car yard view" width='100%'  style={{paddingBottom: '2.5%'}}/>
              <img src={homeX} alt="car yard view one" width='100%'  style={{paddingBottom: '2.5%'}}  />
              
            
            </div>
            
          
       
            
        

       
           
       
          
         </section>

        </div>

        









   
       </main>

       <Footer/>
    </>
   
  )
}

export default Home