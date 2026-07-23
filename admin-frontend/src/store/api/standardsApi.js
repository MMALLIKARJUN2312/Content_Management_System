import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
  credentials: 'include',
});

// Retries transient/network/5xx failures with backoff; bails immediately on
// 4xx (validation, not-found, conflict, etc. won't be fixed by retrying),
// and redirects to /login on session expiry.
const baseQueryWithRetry = retry(
  async (args, api, extraOptions) => {
    const result = await rawBaseQuery(args, api, extraOptions);

    if (result.error) {
      const status = result.error.status;

      if (status === 401 && typeof window !== 'undefined' && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }

      if (typeof status === 'number' && status >= 400 && status < 500) {
        retry.fail(result.error);
      }
    }

    return result;
  },
  { maxRetries: 2 },
);

export const standardsApi = createApi({
  reducerPath: 'standardsApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Standard', 'Version'],
  endpoints: (builder) => ({
    getAdminStats: builder.query({
      query: () => '/admin/stats',
      transformResponse: (res) => res.data,
      providesTags: ['Standard', 'Version'],
    }),
    getAdminStandards: builder.query({
      query: () => '/admin/standards',
      transformResponse: (res) => res.data.standards,
      providesTags: ['Standard'],
    }),
    createStandard: builder.mutation({
      query: (body) => ({ url: '/admin/standards', method: 'POST', body }),
      invalidatesTags: ['Standard'],
    }),
    updateStandard: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/admin/standards/${id}`, method: 'PATCH', body }),
      invalidatesTags: ['Standard'],
    }),
    deleteStandard: builder.mutation({
      query: (id) => ({ url: `/admin/standards/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Standard'],
    }),

    getStandardVersions: builder.query({
      query: (standardId) => `/admin/standards/${standardId}/versions`,
      transformResponse: (res) => res.data,
      providesTags: ['Version'],
    }),
    createVersion: builder.mutation({
      query: ({ standardId, versionNumber }) => ({
        url: `/admin/standards/${standardId}/versions`,
        method: 'POST',
        body: { versionNumber },
      }),
      invalidatesTags: ['Version', 'Standard'],
    }),
    getVersion: builder.query({
      query: (versionId) => `/admin/versions/${versionId}`,
      transformResponse: (res) => res.data.version,
      providesTags: ['Version'],
    }),
    updateSections: builder.mutation({
      query: ({ versionId, sections }) => ({
        url: `/admin/versions/${versionId}/sections`,
        method: 'PATCH',
        body: { sections },
      }),
      invalidatesTags: ['Version'],
    }),
    transitionVersion: builder.mutation({
      query: ({ versionId, ...body }) => ({
        url: `/admin/versions/${versionId}/transition`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Version', 'Standard'],
    }),
    deleteVersion: builder.mutation({
      query: (versionId) => ({ url: `/admin/versions/${versionId}`, method: 'DELETE' }),
      invalidatesTags: ['Version', 'Standard'],
    }),
  }),
});

export const {
  useGetAdminStatsQuery,
  useGetAdminStandardsQuery,
  useCreateStandardMutation,
  useUpdateStandardMutation,
  useDeleteStandardMutation,
  useGetStandardVersionsQuery,
  useCreateVersionMutation,
  useGetVersionQuery,
  useUpdateSectionsMutation,
  useTransitionVersionMutation,
  useDeleteVersionMutation,
} = standardsApi;
