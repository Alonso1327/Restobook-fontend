import { useNavigate } from 'react-router-dom';

let navigate;

export const setNavigate = (nav) => {
  navigate = nav;
};

export const customFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);

    if (response.status === 401) {
      if (navigate) {
        navigate('/login');
      } else {
        console.error('Navigate function not set. Unable to redirect to login.');
      }
      throw new Error('Unauthorized. Redirecting to login.');
    }

    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
