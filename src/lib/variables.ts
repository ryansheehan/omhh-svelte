export const variables = {
  sanity: {
    projectId: import.meta.env.VITE_PUBLIC_SANITY_PROJECT_ID || 'no-project-id',
    dataset: import.meta.env.VITE_PUBLIC_SANITY_DATASET || 'development',
    version: import.meta.env.VITE_PUBLIC_SANITY_API_VERSION || 'v1',
  },
  convertkit: {
    url: import.meta.env.VITE_CONVERTKIT_API_URL || 'https://google.com',
    api_key: import.meta.env.VITE_CONVERTKIT_API_KEY || 'no-api-key',
    form: {
      recipe: import.meta.env.VITE_CONVERTKIT_FORM_RECIPE || "0000000",
    }
  }
};