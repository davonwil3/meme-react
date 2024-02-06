import React from 'react';
import Navbar from './components/navbar';
import './styles.css';
import { useForm } from 'react-hook-form';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function SignIn() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const auth = getAuth();
    const navigate = useNavigate();

    const onSubmit = data => {
        const { email, password } = data;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Handle successful sign in
                const user = userCredential.user;
                navigate('/home');
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
                <h1 style={{color : 'white'}}>Sign In</h1>
                <div id="sign-in" style={{marginBottom: "70px"}}>
                    <form className='signin-form' onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="email">Email:</label><br />
                        <input {...register("email", { required: true })} type="text" id="email" name="email" /><br />
                        {errors.email && <span>This field is required</span>}
                        <label htmlFor="password" style={{marginTop: '30px'}}>Password:</label><br />
                        <input {...register("password", { required: true })} type="password" id="password" name="password" /><br /><br />
                        {errors.password && <span>This field is required</span>}
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
