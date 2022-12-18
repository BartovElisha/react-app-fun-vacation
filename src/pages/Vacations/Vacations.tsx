import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Panel from "../../components/Panel";
import Title from "../../components/Title";
import { deleteRequest, getRequest } from "../../services/apiService";
import AddForm from "./AddForm";
import TableRows from "./TableRows";

export interface IVacation {
    _id: number;
    date: string;
    location: string;
    price: number;    
}

export const VacationContext = createContext<Array<IVacation>>([]);

function Vacations() {
    const [vacations,setVacations] = useState<Array<IVacation>>([]);

    function getVacations() {
        const res = getRequest('vacations');
        if (!res) return;

        res.then(response => response.json())
            .then(json => {
                setVacations(json);
            })
    }

    // Hook useEffect, Run getVacation only ones time then page loaded
    useEffect(getVacations,[]);

    function addVacation(newVacation: IVacation) {
        const updated =[...vacations];
        updated.push(newVacation);
        setVacations(updated);
    }

    function delVacation(vacation: IVacation) {
        const res = deleteRequest(
            `vacations/${vacation._id}`
        );
        if (!res) return;

        res.then(response => response.json())
            .then(json => {
                const updated = [...vacations].filter(
                    vacationItem => vacationItem._id !== vacation._id
                );
                
                toast.info(`Vacation ${json.location} was deleted`,{
                    position: "top-left",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                }); 
                setVacations(updated);
            })
    }

    return (
        <VacationContext.Provider value={vacations}>
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

            <Panel>
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
                            <TableRows 
                                delVacation={delVacation}
                            />
                        }
                    </tbody>
                </table>   
            </Panel> 
        </VacationContext.Provider>          
    );
}

export default Vacations;