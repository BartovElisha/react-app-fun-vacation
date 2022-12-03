import { useEffect, useState } from "react";
import Title from "../../components/Title";
import { priceFormat } from "../../utils/utils";

interface IVacation {
    _id: number;
    date: string;
    location: string;
    price: number;    
}

function Vacations() {
    const [vacations,setVacations] = useState<Array<IVacation>>([]);

    function getVacations() {
        fetch('http://localhost:3000/vacations/')
        .then(responce => responce.json())
        .then(json => {
            setVacations(json);
        });
    }

    // Hook useEffect, Run getVacation only ones time then page loaded
    useEffect(getVacations,[]);

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
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th className="w-25">Date</th>
                        <th className="w-25">Location</th>
                        <th className="w-50">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        vacations.map(vacation => 
                            <tr key={vacation._id}>
                                <td>{vacation.date}</td>
                                <td>{vacation.location}</td>
                                <td>{priceFormat(vacation.price)}</td>
                            </tr>        
                        )
                    }
                </tbody>
            </table>              
        </>
    );
}

export default Vacations;