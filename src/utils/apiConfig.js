import { customFetch } from "./customFetch";

const BASE_URL = "http://192.168.100.113/Restobook-API";

export const API_ENDPOINTS = {
  register: `${BASE_URL}/register`,
  login: `${BASE_URL}/login`,
  restaurant: restaurantId => `${BASE_URL}/restaurant/${restaurantId}`,
  restaurantsRegister: `${BASE_URL}/restaurants/register`
  // Add more endpoints as needed
};

export const getTablesByRestaurant = async restaurantId => {
  try {
    const response = await customFetch(
      `${BASE_URL}/restaurants/${restaurantId}`
    );
    if (!response.ok) {
      throw new Error(
        "Failed to fetch tables",
        `HTTP error! status: ${response.status}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching tables:", error);
    throw error;
  }
};

export const createTable = async (restaurantId, tableData) => {
  const response = await customFetch(
    `${BASE_URL}/restaurants/${restaurantId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tableData)
    }
  );
  if(!response.ok) {
    throw new Error(
      "Failed to create table",
      `HTTP error! status: ${response.status}`
    );
  }
  return await response.json();
};

export const deleteTable = async (restaurantId, tableId) => {
  const response = await customFetch(`${BASE_URL}/restaurants/${restaurantId}/${tableId}`, {
      method: 'DELETE',
  });
  if (!response.ok) {
      throw new Error('Failed to delete table');
  }
  return response.json();
};
