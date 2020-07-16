import React, {useState} from "react";

function Contacts() {
    const [message, setMessage] = useState('hello');
    return (
        <div>
            {{ message }}
        </div>
    )
}

export default Contacts