import { useState } from "react";
import { Offer, data } from "../../data/offers";

enum SortDirection {
    asc = "asc",   // A-Z
    desc = "desc"  // Z-A
}

function OffersTable() {

    // States
    const [offers,setOffers] = useState<Array<Offer>>(data);
    const [search,setSearch] = useState<string>('');
    const [sort,setSort] = useState<SortDirection>(SortDirection.asc);

    function priceFormat(value: number):string {
        return `${value}$`
    }

    function handleSort(value: string) {
        // 1. Convert from string to SortDirection enum type
        const direction = value as SortDirection;
        setSort(direction);
    }

    return (
        <>
            <div className="d-flex px-4 w-50 my-5 bg-light">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search"
                    className="form-control me-4"
                />
                <select
                    className="form-select"
                    value={sort}
                    onChange={((e) => handleSort(e.target.value))}
                >
                    <option>Location A-Z</option>
                    <option>Location Z-A</option>
                </select>
            </div>

            {
                offers.length === 0 &&
                <div className="text-danger m-5">
                    Error: No offers are avalible.
                </div>
            }
            {
                offers.length > 0 &&
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
                            offers.map((offer:Offer) => 
                                <tr key={offer.id}>
                                    <td>{offer.date}</td>
                                    <td>{offer.location}</td>
                                    <td>{priceFormat(offer.price)}</td>
                                </tr>        
                            )
                        }
                    </tbody>
                </table>           
            }
        </>
    );
}

export default OffersTable;