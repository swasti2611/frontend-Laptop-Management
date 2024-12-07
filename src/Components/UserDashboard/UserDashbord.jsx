<div className="container-fluid px-4">
  <div className="d-flex justify-content-between align-items-center flex-wrap">
    <h1>Home</h1>
    <SearchInput />
  </div>

  {/* Welcome Section */}
  <div className="bg-white rounded my-4 p-4 d-flex flex-column flex-md-row align-items-center">
    <div>
      <h1 className="fw-bold fs-2">Welcome Back {userName}!</h1>
      <h3 className="text-muted fs-5">You have a task assigned to finish today</h3>
    </div>
    <img
      src="https://i.pinimg.com/736x/10/f2/c7/10f2c780c7afe32ca9678d852e302843.jpg"
      alt="Welcome"
      className="img-fluid rounded mt-3 mt-md-0 ms-md-4"
      style={{ width: "300px", height: "auto", objectFit: "cover" }}
    />
  </div>

  {/* Request Section */}
  <div className="row g-3">
    <div className="col-12 col-lg-4">
      <div className="card shadow-sm h-100 bg-primary text-white">
        <div className="card-body">
          <h6>Request for a new laptop</h6>
          <p>Click here <i className="fa-regular fa-hand-point-down"></i></p>
          <Link to="/request-laptop" className="btn btn-info">
            Get New Laptop
          </Link>
        </div>
      </div>
    </div>
  </div>

  {/* Assigned Laptops Section */}
  <div className="row g-3 mt-4">
    {assignedLaptops.length > 0 ? (
      assignedLaptops.map((laptop) => (
        <div
          className="col-12 col-sm-6 col-md-4 col-lg-3"
          key={laptop.assignmentId}
        >
          <div className="card shadow-sm h-100">
            <img
              src="https://i.pinimg.com/736x/d0/70/07/d070075c1d5b8d094d43a36ea431d44c.jpg"
              alt="Laptop"
              className="card-img-top img-fluid rounded"
              style={{ objectFit: "cover", height: "160px" }}
            />
            <div className="card-body">
              <h5 className="card-title">{laptop.brand} - {laptop.model}</h5>
              <p className="card-text">
                <strong>Serial Number:</strong> {laptop.serialNumber}<br />
                <strong>Condition:</strong> {laptop.condition}
              </p>
              <button
                onClick={() => handleReport(laptop._id)}
                className="btn btn-info w-100"
              >
                Report
              </button>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-muted">No laptops assigned yet.</p>
    )}
  </div>
</div>
