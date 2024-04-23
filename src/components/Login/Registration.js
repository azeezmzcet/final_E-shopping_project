import React, { useState } from "react";
import { Button, Card, CardHeader, CardBody, CardFooter, Typography, Input } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { register } from "../../features/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const initialState = {
        name: "",
        password: "",
        email: "",
        
    };
    const [values, setValues] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = () => {
        // Check if any of the fields are empty
        if (!values.name || !values.email || !values.password) {
            
            // If any field is empty, prevent form submission
            alert("Please fill in all fields");
            return;
        }
    
        // Dispatch the register action
        dispatch(register(values));
        
        // Navigate to the login page after successful registration
        navigate("/login");
    };
    return (
        <div className="grid grid-cols-1 items-center justify-items-center h-screen">
            <Card className="w-96">
                <CardHeader variant="gradient" color="blue" className="mb-4 grid h-28 place-items-center">
                    <Typography variant="h3" color="white">
                        Register
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                <Input label="E-mail" size="lg" type="email" name="email" value={values.email} onChange={handleChange} />
                    <Input label="UserName" size="lg" type="text" name="name" value={values.name} onChange={handleChange} />
                    <Input label="Password" size="lg" type="password" name="password" value={values.password} onChange={handleChange} />
                   
                </CardBody>
                <CardFooter className="pt-0">
                    <Button variant="gradient" fullWidth onClick={handleSubmit}>
                        Register
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Registration;
