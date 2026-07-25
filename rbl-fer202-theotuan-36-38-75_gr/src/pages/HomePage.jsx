import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import Banner from "../components/Banner";
import BrandCard from "../components/BrandCard";
import CarGrid from "../components/CarGrid";
import SectionWrapper from "../components/SectionWrapper";
import TechProwess from "../components/TechProwess";
import ShowroomIntro from "../components/ShowroomIntro";
import carService from "../services/carService";

function HomePage() {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleSelectCar = (car) => {
    console.log("Selected car:", car);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [carsData, brandsData] = await Promise.all([
          carService.getCars(),
          carService.getBrands(),
        ]);

        setCars(carsData);
        setBrands(brandsData);
      } catch (error) {
        setError(error.customMessage || error.message || "Không thể tải dữ liệu trang chủ.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "grid",
          placeItems: "center",
          backgroundColor: "#0d0d0d",
          color: "#f5f5f5",
        }}
      >
        Loading homepage...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: "70vh",
          display: "grid",
          placeItems: "center",
          backgroundColor: "#0d0d0d",
          color: "#f5f5f5",
        }}
      >
        {error}
      </div>
    );
  }

  const normalizedCars = cars.map((car) => ({
    ...car,
    image: car.imageUrl,
  }));

  const normalizedBrands = brands.map((brand) => ({
    ...brand,
    logo: brand.logoUrl,
  }));

  const featuredCars = normalizedCars
    .filter((car) => car.isFeatured)
    .slice(0, 6);

  const featuredBrands = normalizedBrands.slice(0, 6);

  return (
    <>
      {/* SECTION 1: CAR BANNER CAROUSEL */}
      {featuredCars && featuredCars.length > 0 && <Banner cars={featuredCars} />}

      {/* SECTION 2: OFFICIAL BRAND PARTNERS */}
      <SectionWrapper title="OFFICIAL BRANDS" subtitle="PARTNERS">
        <section
          style={{
            backgroundColor: "#0d0d0d",
            padding: "2rem 0 2rem",
          }}
        >
          <Container>
            <Row className="g-3 justify-content-center">
              {featuredBrands.map((brand, i) => (
                <Col key={brand.id} xs={6} md={4} lg={2} className={`reveal-el delay-${(i % 6) * 100 + 200}`}>
                  <Link to={`/cars?search=${encodeURIComponent(brand.name)}`} style={{ textDecoration: 'none' }}>
                    <BrandCard brand={brand} />
                  </Link>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      </SectionWrapper>

      {/* SECTION 3: FEATURED VEHICLES GRID */}
      <CarGrid cars={normalizedCars} onSelectCar={handleSelectCar} />

      {/* SECTION 4: TECH PROWESS SPECIFICATIONS */}
      {normalizedCars && normalizedCars.length > 0 && (
        <TechProwess specs={normalizedCars[0]} />
      )}

      {/* SECTION 5: SHOWROOM INTRODUCTION */}
      <ShowroomIntro />
    </>
  );
}

export default HomePage;