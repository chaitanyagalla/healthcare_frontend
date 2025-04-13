import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const doctorSignUp = async (formData) => {
    const payload = {
        ...formData,
        age: Number(formData.age),
        experience: Number(formData.experience)
    };
    const response = await axios.post(`${API_BASE_URL}/api/v1/doctor/signup`, payload)
    return response.data;
}