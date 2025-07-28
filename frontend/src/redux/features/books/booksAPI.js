import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import  getBaseUrl  from '../../../utils/getbaseUrl';

const baseQuery = fetchBaseQuery({
    baseUrl : `${getBaseUrl()}/api/books`,
    credentials: 'include',
    prepareHeaders : (Headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            Headers.set('authorization', `Bearer ${token}`);
        }
        return Headers;
    },
})

const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery,
    tagTypes: ['Books'],
    endpoints: (builder) => ({
        fetchAllBooks: builder.query({
            query: () => '/',
            providesTags: ['Books'],
           
        }),
        fetchBookbyId: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: 'Books', id }],
        }),
          //POST /create-book - Create a new book
        addBook: builder.mutation({
            query: (newBook) => ({
                url: '/create-book',
                method: 'POST',
                body: newBook,
            }),
            invalidatesTags: ['Books'], // Refetch all books after adding
        }),

          // ✅ PUT /edit/:id - Update a book
        updateBook: builder.mutation({
            query: ({ id, ...updatedBook }) => ({
                url: `/edit/${id}`,
                method: 'PUT',
                body: updatedBook,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Books', id },
                'Books'
            ],
        }),
         // ✅ DELETE /:id - Delete a book
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Books'], // Refetch all books after deleting
        }),


    })
})


export const { 
    useFetchAllBooksQuery,
    useFetchBookbyIdQuery,
    useAddBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation
} = booksApi;

export default booksApi;