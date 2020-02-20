import React, { useState } from 'react';

import MemberArea from './MemberArea';
import AuthenticationForm from './AuthenticationForm';


const App = () => {
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    const users = [];

    function onRegister(userDetails) {
        // Register User
        const userAlreadyExists = users.some(u => u.username === userDetails.username);
        if (!userAlreadyExists) {
            users.push({username: userDetails.username, password: userDetails.password});
            setUserLoggedIn(true);
        }
    }

    function onLogin(userDetails) {
        // Login if user matches details
        const correctUserDetails = users.find(u => u.username === userDetails.username && u.password === userDetails.password);
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
                <MemberArea /> :
                <AuthenticationForm onRegister={onRegister} onLogin={onLogin} onLogout={onLogout}/>
            }
        </div>
    );
};

export default App;