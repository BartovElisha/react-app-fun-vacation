import Title from "../../components/Title";
import OffersTable from "./OffersTable";

function Home() {
    return ( 
        <>
            <Title 
                main="Our Offers"
                sub="our packages from this month"
            />
            <OffersTable />
        </>
    );
}

export default Home