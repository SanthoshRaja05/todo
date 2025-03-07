import React from 'react';
import '../css/Home.css'; // Import the custom CSS

function Home() {
  return (
    <div className="home-container container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 shadow-sm">
            <h2 className="text-center mb-3">Welcome to the ToDo List</h2>
            <p className="text-center mb-0">
              Login or Register to create your own ToDo list and stay organized!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
