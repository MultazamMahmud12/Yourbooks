import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/getbaseUrl';

const ordersApi = createApi({
    reducerPath: "ordersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/orders`,
        credentials: "include",
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            headers.set("content-type", "application/json");
            return headers;
        },
    }),
    tagTypes: ["Orders"],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: "/",
                method: "POST",
                body: newOrder,
            }),
            invalidatesTags: ["Orders"],
        }),
        
        // ✅ Fix syntax: remove extra parentheses
        getOrdersByEmail: builder.query({
            query: (email) => ({
                url: `/email/${email}`,
                method: "GET",
            }),
            providesTags: ["Orders"],
        }),
    }),
});

export const { 
    useCreateOrderMutation, 
    useGetOrdersByEmailQuery 
} = ordersApi;

export default ordersApi;