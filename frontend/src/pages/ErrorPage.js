import React from 'react';

function ErrorPage() {
    return (
        <div style={{position:"absolute",top:"40%",left:"40%"}}>
            <div style={{fontSize:"50px"}}>Sayfa Bulunamadı</div>
            <h4>Page is not found | 404 Error </h4>
        </div>
    );
}

export default ErrorPage;