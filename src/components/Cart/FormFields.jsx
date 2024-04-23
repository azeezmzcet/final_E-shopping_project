
import React from "react";
import { Input } from "@material-tailwind/react";

const FormFields = ({ formData, handleInputChange }) => {
    return (
        <div className="p-3  sm:grid gap-y-1  md:grid gap-y-4  xl:grid gap-y-6  ">
            <Input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required 
                label="Name" 
            />
            <Input
                type="number"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                label="Phone Number" 
            />
            <Input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                required
                label="Address" 
            />
        </div>
    );
};

export default FormFields;
