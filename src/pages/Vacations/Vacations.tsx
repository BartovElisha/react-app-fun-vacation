import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../../components/Title";
import { getRequest } from "../../services/apiService";
import { priceFormat } from "../../utils/utils";
import AddForm from "./AddForm";

export interface IVacation {
    _id: number;
    date: string;
    location: string;
    price: number;    
}

function Vacations() {
    const [vacations,setVacations] = useState<Array<IVacation>>([]);

    function getVacations() {
        const res = getRequest('vacations');  // With token verification
        if(!res) return;
        
        res.then(responce => responce.json())
        .then(json => {
            setVacations(json);
        });
    }

    // Hook useEffect, Run getVacation only ones time then page loaded
    useEffect(getVacations,[]);

    function addVacation(newVacation: IVacation) {
        const updated =[...vacations];
        updated.push(newVacation);
        setVacations(updated);
    }

    function delVacation(vacation: IVacation) {
        fetch(`http://localhost:3000/vacations/${vacation._id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(json => {
                const updated = [...vacations].filter(
                    vacationItem => vacationItem._id !== vacation._id
                );

                setVacations(updated);
            })
    }

    return (
        <>
            <Title 
                main="Vacations"
                sub="manage vacation packages"
            />
            {
                vacations.length === 0 &&
                <div
                    className="alert alert-info m-5"
                    >No Vacations
                </div>
            }

            <AddForm 
                addVacation={addVacation}
            />

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th className="w-25">Date</th>
                        <th className="w-25">Location</th>
                        <th className="w-50">Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        vacations.map(vacation => 
                            <tr key={vacation._id}>
                                <td>{vacation.date}</td>
                                <td>{vacation.location}</td>
                                <td>{priceFormat(vacation.price)}</td>
                                <td className="d-flex">
                                    <Link 
                                        to={`/edit/${vacation._id}`}
                                        className="btn btn-default"
                                    >
                                        <i className="bi-pen"></i>
                                    </Link>
                                    <button 
                                        className="btn btn-default"
                                        onClick={() => delVacation(vacation)}
                                    >
                                        <i className="bi-trash"></i>
                                    </button>
                                </td>
                            </tr>        
                        )
                    }
                </tbody>
            </table>              
        </>
    );
}

export default Vacations;