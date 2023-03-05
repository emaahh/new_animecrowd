
import React from 'react';

export default function Footer() {
  return (

        <footer id="footer-large">
            
            <div className="footer-container">
                
                <div className="footer-informazioni">
                    <div>
                    <h1 style={{fontFamily: 'Work Sans, sans-serif', cursor: 'pointer', textShadow: 'rgba(255, 255, 255, 0.8) 0px 0px 20px',}}>ANIME<a style={{color: 'rgb(220 135 255)', textShadow: 'rgba(220, 135, 255, 0.8) 0px 0px 20px',}}>CROWD</a></h1>
                    </div>
                    
                    
                
                   
                    <br/>
                    <a target="_blank" href="/legal/privacy">Privacy policy</a> | <a target="_blank" href="/legal/terms">Terms</a>
                    
                
                </div>	

                <div className='footer-menu'>
                    <div className="large_txt color-secondary">Social</div>
                    <br/>
                    <a href='https://www.tiktok.com/@dumbotakudevvvv'>TikTok</a><br/> 
                </div>
                
               
                <div className="footer-contatti">
                    <div className="large_txt color-secondary">Contatti</div>
                    <br/>
                    <a href="mailto:animecrowdinfo@gmail.com">Email</a><br/>
                    <a href='https://t.me/AnimeCrowd'>Gruppo Telegram</a><br/> 
                </div>

                


                <div className="floatstop"></div>
                
                <div className="avvertenze-legali">
                    <p>
                    All files on this site are the property of their respective and rightful owners.
                    In case of copyright infringement, please directly send a mail to animecrowdinfo@gmail.com
                    </p>
                </div>			
                
            </div> 

            <style >{`
            
            input:focus, button:focus {outline:0;}

           

           

           

            ul li{ 
                list-style:none;
            }

           

            /* -----------------contenitore e contenuto ------------------ */

            .contenitore .contenuto{
                max-width:1200px;
                margin:auto;
                padding: 70px 10px;
                padding-bottom: 70px;
            }

            /* -----------------footer html-----------------*/

            #footer-large a{
                color:rgb(220, 135, 255); /* seconday color*/
            }

            #footer-large a:hover{
                color:#FFADA6; /* light seconday color*/	
            }

            #footer-large .credits {
                max-width:300px;
                margin:auto;
            }

            #footer-large .credits a img {
            -o-transition: opacity .2 ease-in;
            -ms-transition: opacity .2s ease-in;
            -moz-transition: opacity .2s ease-in;
            -webkit-transition: opacity .2s ease-in;
            transition: opacity .2s ease
            }

            #footer-large .credits a img:hover {
                opacity:0.6;
            }

            #footer-large .social-cont .social-list {
                list-style-type: none;
                margin: 0 auto;
                padding: 10px 0;
            }

            #footer-large .social-cont .social-list > li {
                margin: 8px 8px 8px 0;
                display: inline-block;
                vertical-align: top;
                height: 32px;
                width: 32px;
                border-radius: 6em;
                background-color:#F0776C; /* secondary-color*/
            }

            #footer-large .social-cont .social-list li img {
                width: 32px
            }

            #footer-large .social-cont .social-list > li:hover {
            background:#black; /* light seconday color*/		
            }

            /* -----------------footer-large------------------ */
            #footer-large{
                width: 100%;
                border-top: 1px solid rgba(225, 225, 225, 0);
                padding-top: 20px;
                background-color: black;/* primary color*/
                color: #fff;
            }

            #footer-large p{
                line-height: normal;
            }

            #footer-large .footer-informazioni{
                padding: 0 0 15px 0;
                border-bottom: 1px solid black;
                border-left: 10px solid black;
                border-right: 10px solid black;/* primary color*/
                -moz-box-sizing: border-box;
                -webkit-box-sizing: border-box;
                -ms-box-sizing: border-box;
                box-sizing: border-box;
                border-top: 1px solid #black;
            }

            #footer-large .footer-menu{
                padding: 15px 0;
                border-bottom: 1px solid black;
                    border-left: 10px solid black;/* primary color*/
                border-right: 10px solid black;/* primary color*/
                -moz-box-sizing: border-box;
                -webkit-box-sizing: border-box;
                -ms-box-sizing: border-box;
                box-sizing: border-box;
                line-height: 1.5em;
                
            }

            #footer-large .footer-contatti{
                padding: 15px 0;
                border-left: 10px solid black;/* primary color*/
                border-right: 10px solid black;/* primary color*/
                -moz-box-sizing: border-box;
                -webkit-box-sizing: border-box;
                -ms-box-sizing: border-box;
                box-sizing: border-box;
            }

            .avvertenze-legali p {
                font-size: 12px;
                line-height: 18px;
                margin: 10px 10px 0 10px;
                text-align: justify;
                border-top: 1px solid #black; /* light seconday color*/;
                padding: 26px 0;
                border-bottom: 1px solid #black;
                display: inline-block;
            }

            .credits {
                text-align: center;
                padding-top: 24px;
                padding-bottom: 50px;
                font-size: 14px;
            }
                
            @media screen and (min-width: 672px){

            #footer-large .footer-informazioni{
                padding: 0 0 15px 0;
                border-bottom: none;
                border-left: 10px solid black;
                border-right: 10px solid black;/* primary color*/
                -moz-box-sizing: border-box;
                -webkit-box-sizing: border-box;
                -ms-box-sizing: border-box;
                box-sizing: border-box;
            }
                
            #footer-large{
                display:inline-block;	
            }
                
            #footer-large .footer-menu{
                width: 50%;
                float: left;
                border-bottom: none;
                border-top: 1px solid #black;
            }

            #footer-large .footer-contatti{
                width: 50%;
                float: left;
                border-bottom: none;
                border-top: 1px solid #black;
            }
                
            }

            @media screen and (min-width: 1280px){
                
            #footer-large{
                display:inline-block;
            }
                
            #footer-large .footer-container{
                    max-width: 1300px;
                    margin: auto;
            }

            #footer-large .footer-informazioni{
                width: 50%;
                float: left;
                border-bottom: none;
            }

            #footer-large .footer-menu{
                width: 25%;
                float: left;
            }

            #footer-large .footer-contatti{
                width: 25%;
                float: left;
            }
                
            }
            `}</style>
        </footer>   
    
  );
}