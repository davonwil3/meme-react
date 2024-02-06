import React from "react";
import Navbar from "./components/navbar";
import "./styles.css";
import { useForm } from "react-hook-form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const auth = getAuth();

    const signUpUser = (data) => {
        const { email, password } = data;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Handle successful account creation
                const user = userCredential.user;
            })
            .catch((error) => {
                // Handle errors
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };

    return (
        <div>
            <Navbar />
            <div className="signup-home">
                <h1 style={{color : 'white'}}>Sign Up</h1>
                <div id="sign-up" style={{marginBottom: "70px"}}>
                    <form className='signup-form' onSubmit={handleSubmit(signUpUser)}>
                        <label htmlFor="email" style={{marginTop: '30px'}}>Email:</label><br />
                        <input 
                            type="text" 
                            id="email" 
                            {...register("email", { required: true })} 
                        />
                        {errors.email && <span>This field is required</span>}
                        
                        <label htmlFor="password" style={{marginTop: '30px'}}>Password:</label><br />
                        <input 
                            type="password" 
                            id="password" 
                            {...register("password", { required: true })} 
                        />
                        {errors.password && <span>This field is required</span>}<br /><br />
                        
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
