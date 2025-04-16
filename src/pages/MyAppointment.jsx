import { useEffect, useState } from "react";
import { Calendar, Clock, Trash2 } from "lucide-react";
import axioInstance from "../config/axiosConfig";

const MyAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [cancelingSlotId, setCancelingSlotId] = useState(null);
  const [error, setError] = useState(null);

  // FETCH APPOINTMENTS WHEN THE COMPONENT MOUNTS
  useEffect(() => {
    const fetchAppointments = async () => {
      setError(null);
      try {
        const response = await axioInstance.get(
          "/api/v1/patient/myAppointments"
        );
        console.log(response.data.appointments);
        setAppointments(response.data.appointments);
      } catch (error) {
        console.error("Error fetching appointments", error);
        setError("Failed to load your appointments. Please try again later.");
      }
    };
    fetchAppointments();
  }, []);

//   CANCEL AN APPOINTMENT
  const handleCancel = async (doctorId, slotId) => {
    setCancelingSlotId(slotId);

    try {
      await axioInstance.post("/api/v1/patient/cancelAppointment", {
        doctorId,
        slotId,
      });
      setAppointments((prev) => prev.filter((appt) => appt.slotId !== slotId));
    } catch (error) {
      console.log("Error canceling Appointment", error);
      setError("Failed to cancel your appointment. Please try again later.");
    } finally {
      setCancelingSlotId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-15 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        My Appointments
      </h1>
      {error && (
        <div className="text-center text-red-500 mb-4">
          <p>{error}</p>
        </div>
      )}

      {appointments.length === 0 ? (
        <p className="text-center text-gray-600">No Appointments booked.</p>
      ) : (
        <div className="max-w-3xl mx-auto grid gap-6">
          {appointments.map((appt) => (
            <div
              key={appt.slotId}
              className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  Dr. {appt.doctorName}
                </h2>
                <p>
                  <Calendar size={16} /> {appt.date}
                </p>
                <p>
                  <Clock size={16} />
                  {appt.time}
                </p>
              </div>
              <button
                onClick={() => handleCancel(appt.doctorId, appt.slotId)}
                disabled={cancelingSlotId === appt.slotId}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold ${
                  cancelingSlotId === appt.slotId
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                <Trash2 size={18} /> Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointment;
