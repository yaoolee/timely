import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./ServicePage.css";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import { serviceVisuals, defaultVisual } from "../../utils/serviceAssets";

/* const dummyServices = [
  {
    id: 1,
    title: "Coding",
    duration: "60 mins",
    price: 500,
    serviceInfo:
      "Timely provides a very simple scheduling for students to connect with tutors. Instead of back-and-forth emails or messages, everything happens in one place.",
    instructorName: "Jacob Jones",
    instructorTitle: "Lead Developer",
    imageSrc: "/src/assets/coding.png",
    instructorImageSrc: "/instructors/instructor-1.png",
    bgColor: "rgba(30, 144, 255, 0.2)",
  },
  {
    id: 2,
    title: "Design",
    duration: "40 mins",
    price: 200,
    serviceInfo:
      "Timely provides a very simple scheduling for students to connect with tutors. Instead of back-and-forth emails or messages, everything happens in one place.",
    instructorName: "Jacob Jones",
    instructorTitle: "Lead Designer",
    imageSrc: "/src/assets/design.png",
    instructorImageSrc: "/instructors/instructor-2.png",
    bgColor: "rgba(255, 127, 80, 0.2)",
  },
  {
    id: 3,
    title: "Business",
    duration: "30 mins",
    price: 100,
    serviceInfo:
      "Timely provides a very simple scheduling for students to connect with tutors. Instead of back-and-forth emails or messages, everything happens in one place.",
    instructorName: "Jacob Jones",
    instructorTitle: "Consultant",
    imageSrc: "/src/assets/business.png",
    instructorImageSrc: "/instructors/instructor-3.png",
    bgColor: "rgba(169, 168, 246, 0.3)",
  },
  {
    id: 4,
    title: "Math",
    duration: "45 mins",
    price: 350,
    serviceInfo:
      "Timely provides a very simple scheduling for students to connect with tutors. Instead of back-and-forth emails or messages, everything happens in one place.",
    instructorName: "Jacob Jones",
    instructorTitle: "Mathematician",
    imageSrc: "/src/assets/math.png",
    instructorImageSrc: "/instructors/instructor-4.png",
    bgColor: "rgba(204, 180, 255, 0.3)",
  },
  {
    id: 5,
    title: "Craft",
    duration: "60 mins",
    price: 550,
    serviceInfo:
      "Timely provides a very simple scheduling for students to connect with tutors. Instead of back-and-forth emails or messages, everything happens in one place.",
    instructorName: "Jacob Jones",
    instructorTitle: "Lead Developer",
    imageSrc: "/src/assets/business.png",
    instructorImageSrc: "/instructors/instructor-1.png",
    bgColor: "rgba(30, 144, 255, 0.2)",
  },
  {
    id: 6,
    title: "Singing",
    duration: "60 mins",
    price: 400,
    serviceInfo:
      "Timely provides a very simple scheduling for students to connect with tutors. Instead of back-and-forth emails or messages, everything happens in one place.",
    instructorName: "Justin B",
    instructorTitle: "Singer",
    imageSrc: "/src/assets/design.png",
    instructorImageSrc: "/instructors/instructor-2.png",
    bgColor: "rgba(30, 144, 255, 0.2)",
  },
]; */

const ServicePage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:5050/api/services");
        setServices(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) return <p>Loading services...</p>;
  if (error) return <p>{error}</p>;

  /* return (
    <div className="service-page">
      <Header />

      <main className="service-content">
        <div className="container">
          <h1 className="service-title">Services available</h1>

          <div className="service-grid">
            {}
            {dummyServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  ); */
return (
    <div className="service-page">
      <Header />

      <main className="service-content">
        <div className="container">
          <h1 className="service-title">Services Available</h1>

          <div className="service-grid">
            {services.map((service) => {
              const visuals = serviceVisuals[service.name] || defaultVisual;
              return (
                <ServiceCard
                  key={service._id}
                  service={{
                    title: service.name,
                    duration: `${service.duration} mins`,
                    price: service.price,
                    serviceInfo: service.description,
                    instructorName: service.instructorName,
                    instructorTitle: service.instructorTitle,
                    imageSrc: visuals.imageSrc,
                    instructorImageSrc: visuals.instructorImageSrc,
                    bgColor: visuals.bgColor,
                  }}
                />
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServicePage;
