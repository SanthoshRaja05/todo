import React from 'react';
import '../css/Home.css'; // Import your custom CSS

function Home() {
  return (
    <div>
      {/* Main Content */}
      <div className="home-container container mt-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-10">
            <div className="card p-4 shadow-lg">
              <div className="card-body text-center">
                <h1 className="card-title mb-3">Welcome to Your Personal ToDo List</h1>
                <p className="card-text mb-4">
                  Organize your tasks, set reminders, and stay on top of your schedule with our simple yet powerful ToDo app.
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <a href="/login" className="btn btn-primary">Login</a>
                  <a href="/register" className="btn btn-primary">Register</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-light mt-5 py-3 shadow-sm">
        <div className="container text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} ToDo App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
