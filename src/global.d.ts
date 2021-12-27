/// <reference types="@sveltejs/kit" />

interface ImportMetaEnv {
  VITE_PUBLIC_SANITY_PROJECT_ID: string;
  VITE_PUBLIC_SANITY_DATASET: string;
  VITE_PUBLIC_SANITY_API_VERSION: string;
}

type Fetch = (input: RequestInfo, init?: RequestInit) => Promise<Response>;