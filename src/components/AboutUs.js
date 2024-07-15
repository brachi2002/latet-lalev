import React from 'react';
import './AboutUs.css';
import Navbar from './Navbar';
import AboutUs1 from './images/1.jpg';
import AboutUs2 from './images/2.jpg';
import AboutUs3 from './images/3.jpg';
import AboutUs4 from './images/4.jpg';




const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <div className="about-us">
        <div className="about-us-header">
          <h1>About Us</h1>
          <p>Our mission is to help those in need, providing support and love.</p>
        </div>

        <div className="about-us-content">
          <div className="about-us-section">
            
            <img src={AboutUs1} alt="Our Mission" />
            <div className="about-us-text">
              <h2>Our Mission</h2>
              <p>
              Since 1999, we have been helping new immigrants and handing out food baskets and shopping cards.
              New and second-hand clothes, support in finding a job (resumes, jobs), training (English / computers), subsidizing emotional treatments for children.
              </p>
            </div>
          </div>

          <div className="about-us-section">
            <img src="./images/your-image2.jpg" alt="Our Team" />
            <div className="about-us-text">
              <h2>Our Team</h2>
              <p>
                Our team is made up of dedicated professionals and volunteers who work tirelessly to provide support and care to those who need it most.
              </p>
            </div>
          </div>

          <div className="about-us-section">
            <img src="./images/your-image3.jpg" alt="Get Involved" />
            <div className="about-us-text">
              <h2>Get Involved</h2>
              <p>
                Join us in our mission to make a difference. Whether you want to volunteer, donate, or support us in other ways, your help is invaluable.
              </p>
            </div>
          </div>
        </div>

        <section className="image-section">
          <div className="image-item">
            <img src="image1_url" alt="Description 1" />
            <h3>מחלקות העמותה</h3>
          </div>
          <div className="image-item">
            <img src="image2_url" alt="Description 2" />
            <h3>Agreements</h3>
          </div>
          <div className="image-item">
            <img src="image3_url" alt="Description 3" />
            <h3>The rabbi of the association</h3>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
