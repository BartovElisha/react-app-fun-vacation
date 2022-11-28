import { useState } from "react";
import Title from "../../components/Title";
import { Offer, data } from "../../data/offers";

function Orders() {

    const [vacation,setVacation] = useState<string>('');
    const [name,setName] = useState<string>('');
    const [email,setEmail] = useState<string>('');
    const [agree,setAgree] = useState<boolean>(false);

    return (
        <>
            <Title 
                main="Order Now"
                sub="quikly order for my vacation"
            />
            {
                data.length > 0 &&
                <main className="p-5">
                    <h4 className="mb-3">Billing address</h4>
                    <form className="needs-validation">
                        <div className="row g-3">
                            <div className="col-12">
                                <label className="form-label">
                                    Vacation Package
                                </label>
                                <select className="form-select">
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
                                    onClick={() => setAgree(!agree)}
                                />
                                <label className="form-check-label">
                                    I agree to terms...
                                </label>
                            </div>
                            <button
                                className="w-100 btn btn-primary btn-lg mt-4" type="submit"
                            >
                                Continue to checkout
                            </button>
                        </div>
                    </form>
                </main>
            }
        </>
    );
}

export default Orders;