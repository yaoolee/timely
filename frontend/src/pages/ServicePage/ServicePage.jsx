import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./ServicePage.css";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import { serviceVisuals, defaultVisual } from "../../utils/serviceAssets";

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
                    id: service._id,
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
