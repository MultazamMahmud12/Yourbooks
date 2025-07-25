import { useEffect, useState } from "react";


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { Pagination, Navigation, Autoplay } from "swiper/modules";
import BookCard from "../book/BookCard";
const Recommend = () => {
     const [books, setBooks] = useState([]);
     
    
      useEffect(() => {
        fetch("books.json")
          .then((res) => res.json())
          .then((data) => setBooks(data));
      }, []);
    
  return (
     <div className="py-10 max-w-screen-2xl mx-auto px-4">
      <h2
        className="text-3xl font-secondary mb-6 font-bold"
        style={{ color: "var(--color-text)" }}
      >
        Recommended Books
      </h2>
      <Swiper
                slidesPerView={1}
                spaceBetween={20}
                loop={true}
                grabCursor={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                navigation={true}
                speed={800}
                effect="slide"
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  480: {
                    slidesPerView: 1.5,
                    spaceBetween: 15,
                  },
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2.5,
                    spaceBetween: 25,
                  },
                  1024: {
                    slidesPerView: 3.5,
                    spaceBetween: 30,
                  },
                  1280: {
                    slidesPerView: 4.5,
                    spaceBetween: 35,
                  },
                  1536: {
                    slidesPerView: 5,
                    spaceBetween: 40,
                  },
                }}
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper"
              >
                {books.length > 0 ? (
                  books.map((book, index) => (
                    <SwiperSlide key={book._id || book.id || index} className="h-full">
                      <div className="h-full">
                        <BookCard book={book} />
                      </div>
                    </SwiperSlide>
                  ))
                ) : (
                  <div className="flex justify-center items-center h-64">
                    <p
                      className="text-lg font-secondary"
                      style={{ color: "var(--color-text-light)" }}
                    >
                      No books found in this category
                    </p>
                  </div>
                )}
              </Swiper>
      </div>
  )
}

export default Recommend
