import { useEffect, useState } from "react";
import BookCard from "../book/BookCard";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { Pagination, Navigation, Autoplay } from "swiper/modules";

const categories = [
  "Choose a genre",
  "Business",
  "Adventure",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Romance",
  "Horror",
  "Non-Fiction",
];

const Topsale = () => {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");

  useEffect(() => {
    fetch("books.json")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  const filteredBooks =
    selectedCategory === "Choose a genre"
      ? books
      : books.filter(
          (book) =>
            book.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="py-10 max-w-screen-2xl mx-auto px-4">
      <h2
        className="text-3xl font-secondary mb-6 font-bold"
        style={{ color: "var(--color-text)" }}
      >
        Top Sale
      </h2>

      {/* Category filtering */}
      <div className="mb-8">
        <select
          name="category"
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-48 p-2.5 text-sm rounded-lg focus:outline-none focus:ring-2 font-secondary mb-6"
          style={{
            backgroundColor: "var(--color-bg)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text)",
            "--tw-ring-color": "var(--color-accent)",
          }}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

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
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
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
    </div>
  );
};

export default Topsale;
