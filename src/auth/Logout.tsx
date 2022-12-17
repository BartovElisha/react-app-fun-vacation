interface Props {
    handler: Function;
}

function Logout({ handler }: Props) {
    return (
        <button
            onClick={(e) => handler()}
            className="btn btn-link nav-link"
            // className="btn btn-link nav-link text-dark"
        >
            LogOut
        </button>
    );
}

export default Logout;