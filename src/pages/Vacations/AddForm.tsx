import Joi from "joi";
import { useState } from "react";
import { postRequest } from "../../services/apiService";
import { IVacation } from "./Vacations";

interface Props {
    addVacation: Function;
}

function AddForm({ addVacation }: Props) {
    const [date, setDate] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [price, setPrice] = useState<number>(1);
    const [error, setError] = useState<string>('');

    function clearFields() {
        setDate('');
        setLocation('');
        setPrice(1);
    }

    function fetchVacation(value: IVacation) {
        const res = postRequest(
            'vacations/',
            value
        );
        if (!res) return;

        res.then(response => response.json())
            .then(json => {
                addVacation(json);
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
        fetchVacation(value);
    }

    return (
        <>
            <div className="bg-light d-flex p-4 align-items-center">
                <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="form-control me-3"
                    type="text"
                    placeholder="Date"
                />

                <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="form-control me-3"
                    type="text"
                    placeholder="Location"
                />

                <input
                    value={price}
                    onChange={(e) => setPrice(+e.target.value)}
                    className="form-control me-3"
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