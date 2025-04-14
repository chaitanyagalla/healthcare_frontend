import axios from "axios";
import { useEffect,  } from "react";
import DoctorCard from "../components/ui/DoctorCard";
import { useStore } from "../store/Context.jsx";

//GETTING DOCTORS LIST FROM THE BACKEND
const Doctor = () => {
    const { doctors, setDoctors } = useStore();

  const getDoctors = async () => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/patient/availableDoctors`
      );
      setDoctors(response.data.doctorsList);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 mt-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-12">
          Meet Our Trusted Doctors
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {doctors.map((doctor) => (
           <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
  
};

export default Doctor;
