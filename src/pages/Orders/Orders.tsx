import Joi from "joi";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Title from "../../components/Title";
import { Offer, data } from "../../data/offers";

function Orders() {

    // States
    const [vacation,setVacation] = useState<string>('');
    const [name,setName] = useState<string>('');
    const [email,setEmail] = useState<string>('');
    const [agree,setAgree] = useState<boolean>(false);
    const [error,setError] = useState<string>('');

    function crearFields() {
        setVacation('');
        setName('');
        setEmail('');
        setAgree(false);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();  // Cancel the default action of the form to reload

        const schema = Joi.object().keys({
            vacation: Joi.string().required(),
            name: Joi.string().required().min(2),
            email: Joi.string().allow(null,'').optional().email({ tlds: {allow: false}}),
            agree: Joi.boolean().required().equal(true)
        });

        const { error } = schema.validate({
            vacation,
            name,
            email,
            agree
        });

        if(error) {
            setError(error.message);
            return;
        }

        // Clear error state if all inputs are valid
        setError('');

        toast.success("Success ! Continue to checkout...");
        crearFields();
    }

    return (
        <>
            <Title 
                main="Order Now"
                sub="quikly order for my vacation"
            />
            {
                data.length > 0 &&
                <main className="p-5">
                    <h4 className="mb-3">Order Details</h4>
                    <form className="needs-validation">
                        <div className="row g-3">
                            <div className="col-12">
                                <label className="form-label">
                                    Vacation Package
                                </label>
                                <select 
                                    name="vacation"
                                    className="form-select"
                                    value={vacation}
                                    onChange={(e) => setVacation(e.target.value)}
                                    >
                                    <option>
                                        Please Select
                                    </option>
                                    {
                                        data.length > 0 && 
                                        data.map((offer:Offer) =>
                                            <option
                                                key={offer.id}
                                                value={offer.id}
                                            >
                                                {offer.location}
                                            </option>
                                        )
                                    }
                                </select>
                            </div>
                            <div className="col-12">
                                <label className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}                                    
                                />
                            </div>
                            <div className="col-12">
                                <label className="form-label">
                                    Email
                                    <span className="text-muted">(Optional)</span>
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-check mt-4">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={agree}
                                    onChange={() => setAgree(!agree)}
                                />
                                <label className="form-check-label">
                                    I agree to terms...
                                </label>
                            </div>
                            <button
                                className="w-100 btn btn-primary btn-lg mt-4" 
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Continue to checkout
                            </button>
                            {
                                // Print error message if inputs are not valid...
                                error &&
                                <div className="text-danger">
                                    {error}
                                </div>
                            }
                        </div>
                    </form>
                </main>
            }
        </>
    );
}

export default Orders;