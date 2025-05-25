export function CreateTeacher() {
  return (
    <div
      className="modal fade"
      id="create-teacher-modal"
      tabIndex={-1}
      aria-labelledby="create-teacher-modal-label"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title fs-5" id="create-teacher-modal-label">
              <h1>Invite Teacher</h1>
              <p>
                Send an invitation to a new teacher to join the school platform.
              </p>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="">
              <label>Name</label>
              <input className="form-control" placeholder="Full name" />
            </div>
            <div className="">
              <label>Email</label>
              <input className="form-control" placeholder="email@example.com" />
            </div>
            <div className="">
              <label>Subject</label>
              <input className="form-control" placeholder="Subject to teach" />
            </div>
            <div className="">
              <label>Class</label>
              <select className="form-select">
                {["Class 1", "Class 2", "Class 3"].map((el) => (
                  <option key={el}>Class 1</option>
                ))}
              </select>
            </div>
            <div className="">
              <label>Phone</label>
              <input className="form-control" placeholder="(555) 123-2300" />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary cancel"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button type="button" className="btn btn-primary">
              Send invitation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
