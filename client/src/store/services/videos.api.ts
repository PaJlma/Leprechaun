import { IPreparedVideo } from "@/types/interfaces/video.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const videosApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/videos" }),
  endpoints: (builder) => ({
    getAll: builder.query<IPreparedVideo[], void>({
      query: () => "/",
    }),

    getById: builder.query<IPreparedVideo, string>({
      query: (id) => `/${id}`,
    })
  }),
});

export const { useGetAllQuery, useGetByIdQuery } = videosApi;
