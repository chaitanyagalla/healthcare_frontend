import { useState } from "react";
import { doctorSignUp } from "../services/doctorAuth.services.js";
import FormInput from "../components/ui/FormInput";
import { useStore } from "../store/Context.jsx";

const DoctorSignUp = () => {
    const { doctors} = useStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    specialization: "",
    experience: "",
    contactNumber: "",
    age: "",
  });

  console.log(doctors)
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }));
    setErrors((prev) => ({...prev, [name]: ""}))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setApiError("");
    setSuccessMessage("");
    try {
      const data = await doctorSignUp(formData);
      console.log(data);
    if (data?.message) {
        setSuccessMessage(data.message);
      }

      localStorage.setItem("token", data.token);
    //   navigate("/");
    } catch (error) {
      console.log("Full error:", error);

      if (error.response?.data?.errors?.length > 0) {
        const zodErrors = {};
        error.response.data.errors.forEach((err) => {
          zodErrors[err.path[0]] = err.message;
        });
        setErrors(zodErrors);
      }

      if (error.response?.data?.message) {
        setApiError(error.response.data.message);
      } else if (!error.response?.data?.errors) {
        setApiError("Something went wrong");
      }
    }
  };
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Doctor Sign Up</h2>

      <form onSubmit={handleSubmit} noValidate>
        <FormInput
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />

        <FormInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${
              errors.gender ? "border-red-500" : "border-gray-300"
            } rounded-r-md`}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1"> {errors.gender} </p>
          )}
        </div>

        <FormInput
          label="Age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          error={errors.age}
        />

        <FormInput
          label="Specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          error={errors.specialization}
        />

        <FormInput
          label="Experience (in years)"
          name="experience"
          type="number"
          value={formData.experience}
          onChange={handleChange}
          error={errors.experience}
        />
        <FormInput
          label="Contact Number"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          error={errors.contactNumber}
        />

        {apiError && <p className="text-red-500 text-sm mt-3">{apiError}</p>
        }
        {successMessage && (
          <p className="text-green-500 text-sm mt-3">{successMessage}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition "
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default DoctorSignUp;
