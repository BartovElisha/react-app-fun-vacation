import Joi from "joi";
import { useState } from "react";
import { IVacation } from "./Vacations";

function AddForm() {
    const [date, setDate] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [price, setPrice] = useState<number>(1);
    const [error, setError] = useState<string>('');

    function clearFields() {
        setDate('');
        setLocation('');
        setPrice(1);
    }

    function addVacation(value: IVacation) {
        fetch('http://localhost:3000/vacations/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value)
        })
            .then(response => response.json())
            .then(json => {
                // setVacations(json);
                console.log(json);
            })
    }

    function handleClick() {
        const schema = Joi.object().keys({
            date: Joi.string().required().min(3),
            location: Joi.string().required().min(3),
            price: Joi.number().required().min(1)
        });

        const { error, value } = schema.validate({
            date,
            location,
            price
        });

        if (error) {
            setError(error.message);
            return;
        }

        setError('');
        clearFields();
        addVacation(value);
    }

    return (
        <>
            <div className="bg-light d-flex p-4 align-items-center">
                <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="form-control"
                    type="text"
                    placeholder="Date"
                />

                <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="form-control"
                    type="text"
                    placeholder="Location"
                />

                <input
                    value={price}
                    onChange={(e) => setPrice(+e.target.value)}
                    className="form-control"
                    type="number"
                    placeholder="Price"
                />

                <button
                    onClick={handleClick}
                    className="btn btn-info ms-3"
                >
                    Add
                </button>
            </div>

            {
                error &&
                <div className="text-danger">
                    {error}
                </div>
            }
        </>
    );
}

export default AddForm;