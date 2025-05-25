import { CreateTeacher } from "../components/create-teacher";

export function Teachers() {
  return (
    <div className="teachers psa_d_page">
      <div className="header_">
        <h2 className="title">Teachers</h2>
        <button
          className="button"
          data-bs-toggle="modal"
          data-bs-target="#create-teacher-modal"
        >
          Invite Teacher
        </button>
      </div>
      <div className="teachers-table table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Class</th>
              <th scope="col">Subject</th>
              <th scope="col">Phone</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 3, 3, 5, 6].map((_, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td> John Doe</td>
                <td>john.doe@example.com</td>
                <td>Class 1</td>
                <td>Mathematics</td>
                <td>123-456-7890</td>
                <td>
                  <span className="custom-status">Active</span>
                </td>
                <td className="actions">
                  <span className="edit">Edit</span>
                  <span className="deactivate">Deactivate</span>
                  <span className="delete">Delete</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <CreateTeacher />
      </div>
    </div>
  );
}
