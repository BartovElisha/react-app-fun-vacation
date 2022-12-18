interface Props {
    children: React.ReactNode;
}

function Panel({ children }: Props) {
    return (
        <div className="card m-3">
            <div className="card-body">
                {children}
            </div>
        </div>
    );
}

export default Panel;