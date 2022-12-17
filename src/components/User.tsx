interface Props {
    userName: string;
}

function User({userName}: Props) {
    if(!userName) return null;

    return (  
        <div>
            Hello {userName}
        </div>
    );
}

export default User;