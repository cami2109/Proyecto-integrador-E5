import React from "react"
import "../App.css"


const Footer = () => {
  return (
    <div className="footer">
       {/* <p>nuestras redes:</p> */}
      <div className="socials">
        <a href="#instagram">
          <img src="Img/icons8-instagram-50.png" alt="insta"  />
        </a>
        <a href="#linkedin">
          <img src="Img/icons8-linkedin-50.png" alt="linkedin" />
        </a>
        <a href="#twitter">
          <img src="Img/icons8-twitterx-50.png" alt="insta" />
        </a>
        <a href="#twitter">
          <img src="Img/icons8-tiktok-50.png" alt="insta" />
        </a>
        {/* <a href="#twitter">Twitter</a>
        <a href="#instagram">Instagram</a> */}
      </div>
    </div>


    // <div className="footer">
    //   <div className="socials">
    //     <a href="#facebook">
    //       <img src="/Img/logo fbook.PNG"
    //       alt="Facebook"/>
    //     </a>
    //     <a href="#twitter">
    //     <img src="/Img/logo twitter.PNG"
    //       alt="Twitter"/>
    //     </a>
    //     <a href="#instagram">
    //     <img src="/Img/logo ig.PNG"
    //       alt="Instagram"/>
    //     </a>
    //   </div>
    // </div>
  );
};
export default Footer
