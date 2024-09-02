// utils/payloadAPI.ts
const API_URL = process.env.NEXT_PUBLIC_SITE_URL;

export const fetchPayloadData = async (endpoint: string) => {
  const response = await fetch(`${API_URL}/api/${endpoint}?depth=1`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};
