import React from "react";
import aboutImage from "../assets/images/about.webp";
import "../styles/about.css";

function About() {
  return (
    <div className="about container-fluid">
      <header className="aboutHeader" aria-label="About SMarket">
        <img src={aboutImage} alt="Overview of SMarket services" />
        <h3>About SMarket</h3>
        <p>Shop with Purpose, Shop with Heart</p>
      </header>
      <section className="aboutContent">
        <p>
          Welcome to SMarket, your ultimate destination for humanitarian online
          shopping, where convenience meets compassion and innovation. Our
          platform has been meticulously crafted to cater to all your shopping
          needs, providing a wide-ranging selection of products that span
          categories such as electronics, fashion, home essentials, beauty, and
          wellness, all supported by verified sellers.
        </p>
        <p>
          At SMarket, we understand that a seamless shopping experience is key
          to customer satisfaction. This is why we've designed an intuitive
          interface that allows you to easily navigate our extensive catalog,
          manage your profile, track your orders, and access dedicated customer
          support.
        </p>
        <p>
          Our mission extends beyond just selling products; we strive to
          redefine what it means to shop online. We prioritize creating a
          marketplace that is accessible, reliable, and enjoyable, ensuring that
          you have access to the latest trends and timeless essentials without
          sacrificing quality or affordability. Most importantly, we are
          committed to making a positive impact in our communities and
          supporting humanitarian initiatives through our platform.
        </p>
        <main>
          <article>
            <h4>Our Core Values</h4>
            <p>
              At SMarket, our principal value is the humanitarian aspect of our
              project. We believe in fostering a community where compassion and
              support for one another are at the heart of everything we do. In
              addition to this, we support creativity and entrepreneurship,
              allowing users to develop their own projects and become more than
              just buyers.
            </p>
          </article>
          <article>
            <h4>Our Journey</h4>
            <p>
              SMarket began with a simple vision: to make online shopping
              accessible and enjoyable for everyone, while making a positive
              impact in our communities. From a small store to a comprehensive
              marketplace, our journey has been fueled by innovation and a
              commitment to humanitarian values. We are dedicated to supporting
              our community and fostering connections between our customers and
              sellers.
            </p>
          </article>
          <article>
            <h4>Challenges and Community Engagement</h4>
            <p>
              At SMarket, we engage our community through fun challenges and
              games that encourage creativity and interaction. Whether it's a
              monthly contest for the best product review or a treasure hunt
              within our platform, we believe shopping should be both rewarding
              and enjoyable.
            </p>
            <p>
              By participating in these activities, you can connect with other
              members, win rewards, and enhance your shopping experience. Our
              challenges not only bring excitement but also foster a sense of
              belonging within the SMarket community.
            </p>
          </article>
          <article>
            <h4>Your Own Projects</h4>
            <p>
              Joining the SMarket community means more than just shopping; it's
              about bringing your ideas to life. We encourage users to take
              initiative and develop their own projects within our platform.
              Whether launching a new product line, creating promotional
              campaigns, or collaborating with other users, you have the
              opportunity to shape your own experience and make a real impact.
            </p>
            <p>
              With our resources and support, you can turn your ideas into
              reality, building a project that reflects your passion and
              creativity. Together, let's create a marketplace that thrives on
              innovation, collaboration, and humanitarian values.
            </p>
          </article>
        </main>
        <article>
          <h4>Why Choose SMarket?</h4>
          <ul>
            
            <li>
              <strong>Diverse Product Selection:</strong> With thousands of
              items across categories, you'll find exactly what you need, from
              essentials to unique gifts.
            </li>
            <li>
              <strong>Intuitive Shopping Experience:</strong> Our website is
              designed for smooth and enjoyable browsing.
            </li>
            <li>
              <strong>Secure Transactions:</strong> Robust measures protect your
              information and ensure secure payments.
            </li>
            <li>
              <strong>Prompt Delivery:</strong> Trusted logistics ensure timely
              order processing and delivery.
            </li>
            <li>
              <strong>Outstanding Customer Support:</strong> Our team is here to
              assist you with any questions or feedback.
            </li>
            <li>
              <strong>Innovative Features:</strong> Enjoy advanced filtering,
              user reviews, and personalized shopping.
            </li>
            <li>
              <strong>Loyalty Programs and Discounts:</strong> Take advantage of
              our loyalty programs and promotions.
            </li>
          </ul>
        </article>
      </section>
      <footer className="aboutFooter">
        <p>
          Thank you for choosing SMarket. Together, let's create a better
          shopping experience, supporting humanitarian initiatives, and make a positive
          impact in our communities!
        </p>
      </footer>
    </div>
  );
}

export default About;