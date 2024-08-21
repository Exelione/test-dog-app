import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface Dog {
    id: string,
    url: string,
    breeds: {
        name: string,
        temperament: string
    }[]
}
export const dogApi = createApi({
    reducerPath: 'dogApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.thedogapi.com/v1/',
        prepareHeaders: (headers) => {
            headers.set('x-api-key',  'live_n2dk7y6TOjnWcu4xIcO8Jo7TFkaon6gfxY5SxoKytwsLQDWXdxfn05Y3PH2YJPqK');
            return headers;
        },
    }),
    keepUnusedDataFor: 60,
    endpoints: (builder) => ({
        getDogs: builder.query<Dog[], number>({
            query: (limit = 12) => `images/search?limit=${limit}`
        }),
    }),
})
export const { useGetDogsQuery } = dogApi;