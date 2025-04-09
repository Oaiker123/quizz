const User = () => {
    return (
      <div className="container">
        <h1 className="text-center mt-5">User Page</h1>
        <div className="row mt-4">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Welcome, User!</h5>
                <p className="card-text">
                  This is your user dashboard where you can manage your profile,
                  view your quizzes, and more.
                </p>
                <a href="#" className="btn btn-primary">
                  Go to Dashboard
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default User;