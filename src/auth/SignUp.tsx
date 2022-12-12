import Joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import { postRequest } from "../services/apiService";

interface ISignupData {
    name: string;
    email: string;
    password: string;
}

function SignUp() {
    const navigate = useNavigate();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    function submit() {
        const schema = Joi.object().keys({
            name: Joi.string().required().min(2).max(256),
            email: Joi.string().required().min(6).max(255).email({ tlds: { allow: false } }),
            password: Joi.string().required().min(6).max(30)
        });

        const { error, value } = schema.validate({
            name,
            email,
            password
        });

        if (error) {
            // setError(error.message);
            console.log(error.message);
            return;
        }

        regiser(value);
    }

    function regiser(data: ISignupData) {
        const res = postRequest(
            'users/signup',
            data
        );
        if (!res) return;

        res.then(response => response.json())
            .then(json => {
                navigate('/login');
            })
    }

    return (
        <>
            <div className="p-3 form-max-w w-25 m-auto">
                <Title 
                    main="Sign Up"
                    sub="register to the application"
                />   
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    onClick={submit}
                    className="btn btn-primary btn-lg"
                >
                    Sign Up
                </button>
            </div>
        </>
    );
}

export default SignUp;