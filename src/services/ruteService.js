import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const getRutas = async () => {
  const token = localStorage.getItem("token");
  
  const response = await axios.get(`${apiUrl}/api/rutas`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  
  return response.data;
};