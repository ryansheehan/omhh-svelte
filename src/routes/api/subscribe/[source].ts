import type { RequestHandler } from '@sveltejs/kit';
import { variables } from '$lib/variables';

interface ConvertKitSubscriber {
  first_name: string;
  email: string;
  api_key: string
}

export interface SubscribeResult {
  error?: string;
}

export interface SubscriberData {    
  email: string;
  name: string;
}

export interface RequestParams {
  source: string;
}

export const post: RequestHandler<RequestParams, SubscriberData> = async ({ params, body: subscriber }) => {
  const { email, name: first_name} = subscriber;
  const { url: apiUrl, api_key } = variables.convertkit;
  
  const convertKitSubscriber: ConvertKitSubscriber = {
    first_name,
    email,
    api_key
  }

  let formId = '';
  switch (params.source) {
    case 'recipe': formId = variables.convertkit.form.recipe; break;
  }

  const url = `${apiUrl}/forms/${formId}/subscribe`;
  const body = JSON.stringify(convertKitSubscriber);  
  const post: RequestInit = { 
    body,
    headers: {'Content-Type': 'application/json'},
    method: 'POST'
  }

  try {
    const response = await fetch(url, post);

    if(response.status >= 400) {
      const error = await response.json();
      console.error(error);      
      return { 
        status: response.status >= 500 ? 502 : 500,
        error: 'There was an error subscribing to the list'
       };
    }    
  } catch (error) { 
    console.error(error);   
    return { 
      status: 502,
      error: error.message 
    };
  }


  return {
    status: 200,
    body: { success: true }
  }
};