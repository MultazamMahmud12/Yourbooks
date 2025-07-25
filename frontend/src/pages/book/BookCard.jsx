import { FiShoppingCart } from "react-icons/fi";
import PropTypes from "prop-types";
import getImgUrl from "../../utils/getImgURL";

const BookCard = ({ book }) => {
  return (
    <div className="w-full h-full rounded-lg shadow-md p-4 bg-white dark:bg-gray-900 transition-shadow duration-300 flex flex-col">
      <div className="flex-grow">
        <div className="h-48 flex justify-center items-center mb-4 overflow-hidden rounded-md">
          <img
            src={getImgUrl(book.coverImage)}
            alt={book.title}
            className="object-contain max-h-full hover:scale-105 transition-transform duration-200"
          />
        </div>
        <h3 className="text-lg font-semibold mb-2">{book.title || "Book Title"}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
          {book.description || "Book Description"}
        </p>
        <p className="font-medium mb-4">
          ${book.newPrice}
          <span className="line-through font-normal ml-2">${book.oldPrice || 100}</span>
        </p>
      </div>
      <button className="btn-primary px-6 py-2 space-x-1 flex items-center justify-center gap-1 mt-auto">
        <FiShoppingCart />
        <span>Add to Cart</span>
      </button>
    </div>
  );
};

BookCard.propTypes = {
  book: PropTypes.object.isRequired,
};

export default BookCard;
