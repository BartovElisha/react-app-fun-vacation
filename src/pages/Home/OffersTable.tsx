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
    const [sortLocation,setSortLocation] = useState<SortDirection>(SortDirection.asc);
    const [sortPrice,setSortPrice] = useState<SortDirection>(SortDirection.asc);

    function priceFormat(value: number):string {
        return `${value}$`
    }

    function handleLocationSort(value: string) {
        // 1. Convert from string to SortDirection enum type
        const direction = value as SortDirection;
        setSortLocation(direction);

        // 2. Sort by Location A-Z or Z-A 
        let result = [...data];
        if(direction === SortDirection.desc) {
            result.sort((a,b) => 
                a.location > b.location ? -1 : a.location < b.location ? 1 : 0
            );
        }
        else {  // Default sort = A-Z
            result.sort((a,b) => 
                a.location < b.location ? -1 : a.location > b.location ? 1 : 0
            );
        }  
        
        // 3. Update State offers Array 
        setOffers(result);
    }

    function handlePriceSort(value: string) {
        // 1. Convert from string to SortDirection enum type
        const direction = value as SortDirection;
        setSortPrice(direction);

        // 2. Sort by Price A-Z or Z-A 
        let result = [...data];
        if(direction === SortDirection.desc) {
            result.sort((a,b) => 
                a.price > b.price ? -1 : a.price < b.price ? 1 : 0
            );
        }
        else {  // Default sort = A-Z
            result.sort((a,b) => 
                a.price < b.price ? -1 : a.price > b.price ? 1 : 0
            );
        }  
        
        // 3. Update State offers Array 
        setOffers(result);
    }    

    function handleSearch(value: string) {
        // 1. Update form input value
        setSearch(value);

        // 2. Convert value to lowerCase
        const term = value.toLowerCase();

        // 3. Copy data to result
        let result = [...data];

        // 4. filter result by term
        if(term.length > 0) {
            result = [...data].filter(offer => 
                offer.location.toLowerCase().includes(term)
            );
        }

        // 5. Update State offers Array
        setOffers(result);
    }

    return (
        <>
            <div className="d-flex px-4 w-50 my-5 bg-light">
                <input
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    type="text"
                    placeholder="Search Location"
                    className="form-control me-4"
                />
                <select
                    className="form-select me-4 text-muted"
                    value={sortLocation}
                    onChange={((e) => handleLocationSort(e.target.value))}
                >
                    <option value={SortDirection.asc}>Location A-Z</option>
                    <option value={SortDirection.desc}>Location Z-A</option>
                </select>
                <select
                    className="form-select me-4 text-muted"
                    value={sortPrice}
                    onChange={((e) => handlePriceSort(e.target.value))}
                >
                    <option value={SortDirection.asc}>Price Low to High</option>
                    <option value={SortDirection.desc}>Price High to Low</option>
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