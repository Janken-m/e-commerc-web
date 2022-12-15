import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().token;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("Authorization", `${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Products", "User", "Category", "orders"],
  endpoints: (builder) => ({
    //Products
    GetProducts: builder.query({
      query: () => "/products",
      providesTags: ["Products"],
    }),
    GetSingelProduct: builder.query({
      query: (id) => `/products/${id}`,
      invalidatesTags: ["Products"],
    }),
    RemoveProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    AddProduct: builder.mutation({
      query: (data) => {
        const { _id, ...product } = data;
        return {
          url: "/products",
          method: "POST",
          body: product,
        };
      },
      invalidatesTags: ["Products"],
    }),
    EditProduct: builder.mutation({
      query: (data) => {
        const { _id, ...body } = data;

        return {
          url: `/products/${_id}`,
          method: "PUT",
          body: body,
        };
      },
      invalidatesTags: ["Products"],
    }),
    EditFavProduct: builder.mutation({
      query: (data) => {
        const { _id, ...body } = data;
        return {
          url: `/products/${_id}`,
          method: "PUT",
          body: body,
        };
      },
      invalidatesTags: ["Products"],
    }),
    //user
    SigninUpUser: builder.mutation({
      query: (data) => ({
        url: "/user/signup",
        method: "POST",
        body: data,
      }),
      providesTags: ["User"],
    }),
    SignIn: builder.mutation({
      query: (data) => ({
        url: "/user/signin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    //Category
    GetCategories: builder.query({
      query: () => "/category",
      providesTags: ["Category"],
    }),
    //orders
    GetOrders: builder.query({
      query: () => ({
        url: "/orders",
        headers: {
          // token: user.getJwt(),
        },
      }),
      providesTags: ["orders"],
    }),
    GetIncome: builder.query({
      query: () => "/orders/income",
      invalidatesTags: ["orders"],
    }),
  }),
});

export const { useSigninUpUserMutation, useSignInMutation } = Api;
