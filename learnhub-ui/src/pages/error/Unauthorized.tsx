export default function Unauthorized() {
    return (
        <div className="account-form">
            <div className="account-head" style={{ backgroundImage: "url(assets/images/background/bg2.jpg)" }}>
                <a href="/">
                    <img src="assets/images/logo-white-2.png" alt="" />
                </a>
            </div>
            <div className="account-form-inner">
                <div className="account-container">
                    <div className="error-page">
                        <h3>Access denied...</h3>
                        <h2 className="error-title">403</h2>
                        <h5>You don't have the permission to access this page</h5>
                        <div className="">
                            <a href="/" className="btn m-r5">
                                Preview
                            </a>
                            <a href="/" className="btn outline black">
                                Back To Home
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
