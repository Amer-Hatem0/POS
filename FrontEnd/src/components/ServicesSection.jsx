 
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '@/lib/axios';
import {
  Code,
  Laptop,
  Palette,
  Cloud,
  Database,
  Shield,
  Server,
  MessageCircle,
  Monitor,
} from 'lucide-react';

// Service icons mapping
const serviceIcons = {
  Code,
  Laptop,
  Palette,
  Cloud,
  Database,
  Shield,
  Server,
  MessageCircle,
  Monitor,
};

const getServiceIcon = (title, titleAr) => {
  const combinedTitle = `${title.toLowerCase()} ${titleAr?.toLowerCase() || ''}`;

  if (combinedTitle.includes('development') || combinedTitle.includes('تطوير')) {
    return serviceIcons.Code;
  }
  if (combinedTitle.includes('web') || combinedTitle.includes('ويب') || combinedTitle.includes('موقع')) {
    return serviceIcons.Laptop;
  }
  if (combinedTitle.includes('design') || combinedTitle.includes('تصميم')) {
    return serviceIcons.Palette;
  }
  if (combinedTitle.includes('cloud') || combinedTitle.includes('سحابة')) {
    return serviceIcons.Cloud;
  }
  if (combinedTitle.includes('database') || combinedTitle.includes('بيانات')) {
    return serviceIcons.Database;
  }
  if (combinedTitle.includes('security') || combinedTitle.includes('أمان')) {
    return serviceIcons.Shield;
  }
  if (combinedTitle.includes('hosting') || combinedTitle.includes('استضافة')) {
    return serviceIcons.Server;
  }
  if (combinedTitle.includes('support') || combinedTitle.includes('دعم')) {
    return serviceIcons.MessageCircle;
  }

  return serviceIcons.Monitor;
};

const ServicesSection = () => {
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      const res = await api.get('/service');
      // Filter visible services and limit to the first 3
      const visibleServices = res.data.filter((service) => service.isVisible);
      setServices(visibleServices.slice(0, 3));
    } catch (err) {
      console.error('Failed to fetch services', err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <section id="services" className="py-5 bg-light">
      <div className="container" data-aos="fade-up" data-aos-delay={100}>
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold">Our Featured Services</h2>
          <p className="lead text-muted">Discover how we can help you achieve your goals.</p>
        </div>

        <div className="row justify-content-center g-4">
          {services.map((service, index) => {
            const IconComponent = getServiceIcon(service.title, service.titleAr);
            return (
              <div key={service.id} className="col-lg-4 col-md-6">
                <div
                  className="card h-100 border-0 shadow-lg rounded-4 p-4 text-center transition-transform hover-scale"
                  data-aos="fade-up"
                  data-aos-delay={200 + index * 100}
                >
                  <div className="card-body">
                    <div className="icon-box mb-4 mx-auto bg-primary1 text-white rounded-circle d-flex align-items-center justify-content-center">
                      {service.iconUrl ? (
                        <img
                          src={service.iconUrl}
                          alt={service.title}
                          className="img-fluid"
                          style={{ width: '48px', height: '48px' }}
                        />
                      ) : (
                        <IconComponent size={48} />
                      )}
                    </div>
                    <h5 className="card-title fw-bold mb-2">{service.title}</h5>
                    <p className="card-text text-muted">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* More Services Button */}
        <div className="text-center mt-5">
          <Link to="/services" className="btn btn-outline-primary btn-lg rounded-pill bg-primary1 px-5">
            More Services
          </Link>
        </div>
      </div>

      <style jsx>{`
        .icon-box {
          width: 80px;
          height: 80px;
        }
        .transition-transform {
          transition: transform 0.3s ease-in-out;
        }
        .hover-scale:hover {
          transform: translateY(-10px);
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;


