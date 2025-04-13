const FormInput = ({ label, type = "text", name, value, onChange, error }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-1 font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error} </p>}

     
    </div>
  );
};

export default FormInput;
