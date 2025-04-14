import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const patientSignUp = async (formData) => {
    const payload = {
        ...formData,
        age: Number(formData.age),
    };
    const response = await axios.post(`${API_BASE_URL}/api/v1/patient/signup`, payload)
    return response.data;
}