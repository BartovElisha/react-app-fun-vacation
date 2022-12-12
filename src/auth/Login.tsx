import Joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Title from "../components/Title";
import { postRequest } from "../services/apiService";
import { setToken } from "./tokenMenagment";

interface ILoginData {
    email: string;
    password: string;
}

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    function submit() {
        const schema = Joi.object().keys({
            email: Joi.string().required().min(6).max(255).email({ tlds: { allow: false } }),
            password: Joi.string().required().min(6).max(30)
        });

        const { error, value } = schema.validate({
            email,
            password
        });

        if (error) {
            // setError(error.message);
            console.log(error.message);
            return;
        }

        login(value);
    }

    function login(data: ILoginData) {
        const res = postRequest(
            'users/login',
            data,
            false
        );
        if (!res) return;

        res.then(response => response.json())
            .then(json => {
                if(json.error) {
                    toast.error(json.error, {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                            }    
                        );
                    return;
                }  
                toast.success(`User ${json.name} succsessifully Loged In`,{
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                })                              
                setToken(json.token);
                localStorage.setItem('admin', json.isAdmin)
                navigate('/vacations');
            })
    }    

    return (
        <>
            <div className="p-3 form-max-w w-50 m-auto">
                <Title 
                    main="Login"
                    sub=""
                />   
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
                    Login
                </button>
            </div>
        </>
    );
}

export default Login;