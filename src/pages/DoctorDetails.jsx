import { useParams,useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Mail, Phone, Calendar, User, Briefcase } from "lucide-react";
import SlotCard from "../components/ui/SlotCard";
import axioInstance from "../config/axiosConfig";


const DoctorDetails = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loadingSlotId, setLoadingSlotId] = useState(null);

  const navigate = useNavigate();

  // FETCHING DOCTOR DETAILS
  useEffect(() => {
    const getDoctorDetails = async () => {
      try {
        
        const response = await axioInstance.get(`/api/v1/doctor/getSpecificDoctor/${doctorId}`);
        setDoctor(response.data);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    getDoctorDetails();
  }, [doctorId]);

  // HANDLE BOOKING SLOT
  const handleBookSlot = async (slotId) => {
    setLoadingSlotId(slotId);
    
    try {
      const payload = {
        doctorId,
        slotId,
      };

      await axioInstance.post("/api/v1/patient/bookAppointment", payload);

      // UPDATE DOCTOR STATE
      setDoctor((prev) => ({
        ...prev,
        availableSlots: prev.availableSlots.map((slot) =>
          slot._id === slotId ? { ...slot, isBooked: true } : slot
        ),
      }));

      navigate("/myAppointments")

    } catch (error) {
      console.error("Error booking slot:", error);
    } finally {
      setLoadingSlotId(null); // 
    }
  };

  // SHOW LOADING SCREEN WHILE DOCTOR DATA IS BEING FETCHED
  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading doctor details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-500 via-white to-purple-500 py-12 px-4">
      <div className="bg-white rounded-3xl  shadow-xl w-full max-w-3xl p-8 space-y-6">

        {/* DOCTOR INFO */}
        <div className="flex flex-col  sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Dr. {doctor.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 text-sm">
              <p className="flex text-center gap-2">
                <User size={16} className="text-blue-500" />
                Gender:{" "}
                <span className="font-medium capitalize">{doctor.gender}</span>
              </p>
              <p className="flex items-center gap-2">
                <Briefcase size={16} className="text-purple-500" />
                Specialization:{" "}
                <span className="font-medium">{doctor.specialization}</span>
              </p>
              <p className="flex items-center gap-2">
                <Calendar size={16} className="text-green-500" />
                Experience:{" "}
                <span className="font-medium">{doctor.experience} yrs</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} className="text-yellow-500" />
                Email: <span className="font-medium">{doctor.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} className="text-red-500" />
                Phone:{" "}
                <span className="font-medium">{doctor.contactNumber}</span>
              </p>
            </div>
          </div>
        </div>

        {/* AVAILABLE SLOTS */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Available Slots
          </h3>

          {doctor.availableSlots?.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {doctor.availableSlots.map((slot) => (
                <div key={slot._id} className="space-y-2">
                  <SlotCard slot={slot} />
                  {!slot.isBooked && (
                    <button
                      onClick={() => handleBookSlot(slot._id)}
                      disabled={loadingSlotId === slot._id}
                      className={`w-full py-2 px-4 rounded-lg text-white font-semibold ${
                        loadingSlotId === slot._id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                    >
                      {loadingSlotId === slot._id ? "Booking..." : "Book Now"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No available slots</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
