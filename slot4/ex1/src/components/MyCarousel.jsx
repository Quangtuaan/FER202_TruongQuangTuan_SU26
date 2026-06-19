import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyCarousel({ banners }) {
    return (
        <div>
            <Carousel>
                {/* Dùng ? để an toàn và sửa lại toàn bộ tên biến cho khớp */}
                {banners?.map((banner) => (
                    <Carousel.Item key={banner.id}>
                        <img
                            className="d-block w-100"
                            src={banner.imageUrl} 
                            alt={banner.title}
                        />
                        <Carousel.Caption>
                            <h3>{banner.title}</h3>
                            <p>{banner.description}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default MyCarousel;