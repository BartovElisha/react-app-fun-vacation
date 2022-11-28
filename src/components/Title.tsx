interface Props {
    main: string;
    sub: string;
}

function Title({main,sub}: Props) {
    return ( 
        <h2 className="text-center my-3">
            {main}
            <br />
            <small className="text-muted">
                {sub}
            </small>
        </h2>
    );
}

export default Title;