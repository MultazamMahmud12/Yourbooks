import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
    MdEdit, 
    MdDelete, 
    MdAdd, 
    MdSearch, 
    MdFilterList,
    MdVisibility,
    MdClose,
    MdCheck,
    MdWarning
} from 'react-icons/md';
import axios from 'axios';
import getBaseUrl from '../utils/getbaseUrl';

const Managebooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, book: null });
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });

    // Fetch all books from API
    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.get(`${getBaseUrl()}/api/books`);
            
            if (response.data.success) {
                setBooks(response.data.data || response.data.books || []);
            } else {
                setError('Failed to fetch books');
            }
        } catch (err) {
            console.error('Error fetching books:', err);
            setError('Error fetching books. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Delete book function
    const handleDeleteBook = async (bookId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`${getBaseUrl()}/api/books/${bookId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                // Remove book from state
                setBooks(books.filter(book => book._id !== bookId));
                showNotification('Book deleted successfully!', 'success');
                setDeleteModal({ isOpen: false, book: null });
            } else {
                showNotification('Failed to delete book', 'error');
            }
        } catch (err) {
            console.error('Error deleting book:', err);
            showNotification('Error deleting book. Please try again.', 'error');
        }
    };

    // Show notification
    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => {
            setNotification({ show: false, message: '', type: '' });
        }, 3000);
    };

    // Filter books based on search and category
    const filteredBooks = books.filter(book => {
        const matchesSearch = book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            book.description?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesCategory = selectedCategory === '' || book.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });

    // Get unique categories for filter
    const categories = [...new Set(books.map(book => book.category).filter(Boolean))];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500"></div>
                <span className="ml-4 text-xl text-gray-600">Loading books...</span>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Notification */}
            {notification.show && (
                <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center ${
                    notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}>
                    {notification.type === 'success' ? (
                        <MdCheck className="h-5 w-5 mr-2" />
                    ) : (
                        <MdWarning className="h-5 w-5 mr-2" />
                    )}
                    {notification.message}
                </div>
            )}

            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Books</h1>
                        <p className="text-gray-600">Manage your bookstore inventory</p>
                    </div>
                    <NavLink
                        to="/dashboard/add-new-book"
                        className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition-colors"
                    >
                        <MdAdd className="h-5 w-5 mr-2" />
                        Add New Book
                    </NavLink>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search Input */}
                    <div className="relative">
                        <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search books..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="relative">
                        <MdFilterList className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="">All Categories</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    {/* Results Count */}
                    <div className="flex items-center text-gray-600">
                        <span className="font-medium">
                            {filteredBooks.length} of {books.length} books
                        </span>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                    {error}
                </div>
            )}

            {/* Books Grid */}
            {filteredBooks.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                    <div className="text-gray-400 mb-4">
                        <MdSearch className="h-16 w-16 mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No books found</h3>
                    <p className="text-gray-600 mb-6">
                        {searchTerm || selectedCategory 
                            ? "Try adjusting your search or filter criteria"
                            : "Start by adding your first book to the inventory"
                        }
                    </p>
                    <NavLink
                        to="/dashboard/add-new-book"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center transition-colors"
                    >
                        <MdAdd className="h-5 w-5 mr-2" />
                        Add Your First Book
                    </NavLink>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredBooks.map((book) => (
                        <div key={book._id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow border border-gray-200">
                            {/* Book Cover */}
                            <div className="aspect-[3/4] bg-gray-100 rounded-t-lg overflow-hidden">
                                {book.coverImage ? (
                                    <img
                                        src={book.coverImage}
                                        alt={book.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = '/placeholder-book.png';
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <div className="text-center">
                                            <div className="text-4xl mb-2">📚</div>
                                            <div className="text-sm">No Image</div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Book Details */}
                            <div className="p-4">
                                <div className="mb-3">
                                    <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-2">
                                        {book.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-1">by {book.author}</p>
                                    <p className="text-gray-500 text-xs">{book.category}</p>
                                </div>

                                {/* Price and Stock */}
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <span className="text-lg font-bold text-indigo-600">
                                            ${book.newPrice || book.price}
                                        </span>
                                        {book.oldPrice && (
                                            <span className="text-sm text-gray-500 line-through ml-2">
                                                ${book.oldPrice}
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-600">Stock</div>
                                        <div className={`font-semibold ${
                                            (book.stock || 0) > 10 ? 'text-green-600' :
                                            (book.stock || 0) > 0 ? 'text-yellow-600' : 'text-red-600'
                                        }`}>
                                            {book.stock || 0}
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-2">
                                    <NavLink
                                        to={`/books/${book._id}`}
                                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center transition-colors"
                                    >
                                        <MdVisibility className="h-4 w-4 mr-1" />
                                        View
                                    </NavLink>
                                    <NavLink
                                        to={`/dashboard/edit-book/${book._id}`}
                                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center transition-colors"
                                    >
                                        <MdEdit className="h-4 w-4 mr-1" />
                                        Edit
                                    </NavLink>
                                    <button
                                        onClick={() => setDeleteModal({ isOpen: true, book })}
                                        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center transition-colors"
                                    >
                                        <MdDelete className="h-4 w-4 mr-1" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteModal.isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <MdWarning className="h-6 w-6 text-red-600" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            Delete Book
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to delete "{deleteModal.book?.title}"? This action cannot be undone.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    onClick={() => handleDeleteBook(deleteModal.book._id)}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setDeleteModal({ isOpen: false, book: null })}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Managebooks;