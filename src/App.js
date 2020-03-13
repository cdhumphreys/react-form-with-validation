import React, { useState } from 'react';

import MemberArea from './MemberArea';
import AuthenticationForm from './AuthenticationForm';


const App = () => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [users, setUsers] = useState([]);

    function onSignUp({email, password}) {
        // Register User
        const userAlreadyExists = users.some(u => u.email === email);
        if (!userAlreadyExists) {
            setUsers([...users, {email, password}]);
            setUserLoggedIn(true);
        }
    }

    function onLogin({email, password}) {
        // Login if user matches details
        const correctUserDetails = users.find(u => u.email === email && u.password === password);
        if (correctUserDetails) {
            setUserLoggedIn(true);
        }
    }

    function onLogout() {
        setUserLoggedIn(false);
    }

    return (
        <div className="app">
            {userLoggedIn ? 
                <MemberArea onLogout={onLogout} /> :
                <AuthenticationForm onSignUp={onSignUp} onLogin={onLogin}/>
            }
        </div>
    );
};

export default App;