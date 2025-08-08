import { useState } from "react";
import { Link } from "react-router-dom"; // ✅ Add this import
import BookCard from "../book/BookCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksAPI";

const categories = [
  "Choose a genre",
  "business",
  "adventure",
  "science fiction",
  "fantasy",
  "mystery",
  "romance",
  "horror",
  "non-fiction",
];

const Topsale = () => {
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");
  
  // ✅ Add proper error handling and loading states
  const { 
    data: booksResponse = [], 
    error, 
    isLoading,
    isSuccess 
  } = useFetchAllBooksQuery();
  
  // ✅ Handle different response formats
  let books = [];
  if (Array.isArray(booksResponse)) {
    books = booksResponse;
  } else if (booksResponse && booksResponse.books) {
    books = booksResponse.books;
  } else if (booksResponse && booksResponse.data) {
    books = booksResponse.data;
  }

  //  Filter books with better error handling
  const filteredBooks = selectedCategory === "Choose a genre"
    ? books
    : books.filter((book) => {
        if (!book || !book.category) return false;
        return book.category.toLowerCase() === selectedCategory.toLowerCase();
      });

  console.log("Selected category:", selectedCategory);
  console.log("Filtered books length:", filteredBooks.length);

  //  Show loading state
  if (isLoading) {
    return (
      <div className="py-10 max-w-screen-2xl mx-auto px-4">
        <h2 className="text-3xl font-secondary mb-6 font-bold" style={{ color: "var(--color-text)" }}>
          Top Sale
        </h2>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg">Loading books...</p>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Show error state
  if (error) {
    return (
      <div className="py-10 max-w-screen-2xl mx-auto px-4">
        <h2 className="text-3xl font-secondary mb-6 font-bold" style={{ color: "var(--color-text)" }}>
          Top Sale
        </h2>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-lg text-red-500 mb-4">
              Error loading books: {error.message || "Something went wrong"}
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-screen-2xl mx-auto px-4">
      <h2
        className="text-3xl font-secondary mb-6 font-bold"
        style={{ color: "var(--color-text)" }}
      >
        Top Sale
      </h2>

      <div className="mb-8">
        {/* Category selector */}
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
              {category === "Choose a genre" ? category : category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>

        {/* ✅ Conditional rendering for books */}
        {filteredBooks.length > 0 ? (
          <Swiper
            slidesPerView={Math.min(1, filteredBooks.length)}
            spaceBetween={20}
            loop={filteredBooks.length > 3}
            grabCursor={true}
            autoplay={filteredBooks.length > 1 ? {
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            } : false}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={filteredBooks.length > 1}
            speed={800}
            effect="slide"
            breakpoints={{
              320: {
                slidesPerView: Math.min(1, filteredBooks.length),
                spaceBetween: 10,
              },
              480: {
                slidesPerView: Math.min(1.5, filteredBooks.length),
                spaceBetween: 15,
              },
              640: {
                slidesPerView: Math.min(2, filteredBooks.length),
                spaceBetween: 20,
              },
              768: {
                slidesPerView: Math.min(2.5, filteredBooks.length),
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: Math.min(3.5, filteredBooks.length),
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: Math.min(4.5, filteredBooks.length),
                spaceBetween: 35,
              },
              1536: {
                slidesPerView: Math.min(5, filteredBooks.length),
                spaceBetween: 40,
              },
            }}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper"
          >
            {filteredBooks.map((book, index) => (
              <SwiperSlide key={book._id || book.id || index} className="h-full">
                {/* ✅ Wrap BookCard with Link to book details */}
                
                  <div className="h-full">
                    <BookCard book={book} />
                  </div>
              
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          // ✅ Better empty state
          <div className="flex flex-col justify-center items-center h-64 bg-gray-50 rounded-lg">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <p className="text-lg font-secondary" style={{ color: "var(--color-text-light)" }}>
                {selectedCategory === "Choose a genre" 
                  ? "No books available" 
                  : `No books found in "${selectedCategory}" category`
                }
              </p>
              {selectedCategory !== "Choose a genre" && (
                <button
                  onClick={() => setSelectedCategory("Choose a genre")}
                  className="mt-3 px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Show All Books
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topsale;