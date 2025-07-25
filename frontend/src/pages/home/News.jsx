import news1 from "../../assets/News/news-1.png";
import news2 from "../../assets/News/news-2.png";
import news3 from "../../assets/News/news-3.png";
import news4 from "../../assets/News/news-4.png";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router";

const news = [
  {
    id: 1,
    title: "Climate Summit Calls for Action",
    description:
      "World leaders discuss urgent strategies to combat climate change.",
    image: news1,
  },
  {
    id: 2,
    title: "AI Technology Breakthrough",
    description:
      "New AI advancements expected to transform major industries.",
    image: news2,
  },
  {
    id: 3,
    title: "Space Mission to Distant Galaxies",
    description:
      "NASA reveals plans for exploring the outer reaches of space.",
    image: news3,
  },
  {
    id: 4,
    title: "Markets Reach Record Highs",
    description:
      "Global stock markets rise amid signs of economic recovery.",
    image: news4,
  },
];

const News = () => {
  return (
    <div className="py-10 max-w-screen-2xl mx-auto px-4">
      <h2
        className="text-3xl font-secondary mb-6 font-bold"
        style={{ color: "var(--color-text)" }}
      >
        Latest News
      </h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {news.map((item) => (
          <SwiperSlide key={item.id}>
           <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
           <div className="py-4">
           <Link to="/">
           <h3 className="text-lg font-medium hover:text-blue-500 mb-4"> {item.title} </h3>  
           
           </Link>
           <div className="w-12 h-[4px] bg-primary mb-5"></div>
           <p className="text-sm text-gray-600 mb-4">{item.description}</p>
           
           </div>
           <div>
           <img src={item.image} alt={item.title} className="h-32 w-full object-cover rounded-md mb-3" />
           </div>

           </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default News;
