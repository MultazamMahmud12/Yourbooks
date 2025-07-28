import { useParams } from 'react-router-dom';
import { useFetchBookbyIdQuery } from '../../redux/features/books/booksAPI';
import { getImgUrl } from '../../utils/getImgUrl'; 

const BookDetails = () => {
  const { id } = useParams();
  console.log("Book ID from URL:", id);
  
  const { data: book, error, isLoading } = useFetchBookbyIdQuery(id);
 //console.log("Fetched book data:", book);
  // ✅ Debug what we're getting
  console.log("Book data:", book);
  console.log("Cover image:", book?.coverImage);

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Book not found</div>;

  // ✅ Properly handle image URL
  const getBookImage = () => {
    if (book?.coverImage) {
      // If coverImage contains a filename, use getImgUrl
      if (!book.coverImage.startsWith('http')) {
        return getImgUrl(book.coverImage);
      }
      // If it's already a full URL, use it directly
      return book.coverImage;
    }
    // Fallback to default image
    return getImgUrl('default-book.png');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex gap-6">
        <div className="flex-shrink-0">
          <img 
            src={getBookImage()} 
            alt={book?.title || "Book cover"}
            className="w-48 h-64 object-cover rounded shadow-lg"
            onError={(e) => {
              // ✅ Fallback if image fails to load
              console.log("Image failed to load, using fallback");
              e.target.src = getImgUrl('default-book.png');
            }}
            onLoad={() => {
              console.log("Image loaded successfully:", getBookImage());
            }}
          />
          {/* ✅ Debug info - remove in production */}
          <div className="text-xs text-gray-500 mt-2">
            <p>Original: {book?.coverImage}</p>
            <p>Resolved: {getBookImage()}</p>
          </div>
        </div>
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{book?.title}</h1>
          <p className="text-gray-600 mb-4">{book?.author}</p>
          <p className="text-sm text-gray-500 mb-4 capitalize">{book?.category}</p>
          <p className="mb-4">{book?.description}</p>
          <div className="flex items-center gap-3 mb-4">
            {book?.oldPrice && (
              <span className="text-gray-500 line-through">${book.oldPrice}</span>
            )}
            <span className="text-2xl font-bold text-green-600">${book?.newPrice}</span>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;