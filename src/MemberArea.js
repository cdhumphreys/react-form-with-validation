import React from 'react';

const MemberArea = ({onLogout}) => {
    return (
        <div>
            <h2>Member Area</h2>
            <button className="button button--primary" onClick={onLogout}>Log Out</button>
        </div>
    );
}

export default MemberArea;