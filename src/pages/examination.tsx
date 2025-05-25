export function Examination() {
  return (
    <div className="examination psa_d_page">
      <div className="header_">
        <h2 className="title">Examination</h2>
        <button className="button">
          <i className="bi bi-plus-lg"></i>
          New Examination
        </button>
      </div>
      <div className="filters">
        <div className="form-filter">
          <label>Subject</label>
          <select className="form-select">
            <option selected>All Subjects</option>
            <option>Mathematics</option>
            <option>English</option>
            <option>Science</option>
          </select>
        </div>
        <div className="form-filter">
          <label>Class</label>
          <select className="form-select">
            <option selected>All Classes</option>
            <option>Mathematics</option>
            <option>English</option>
            <option>Science</option>
          </select>
        </div>
        <div className="form-filter">
          <label>Status</label>
          <select className="form-select">
            <option selected>All Status</option>
            <option>Mathematics</option>
            <option>English</option>
            <option>Science</option>
          </select>
        </div>
        <div className="form-filter">
          <label>Term</label>
          <select className="form-select">
            <option selected>All Terms</option>
            <option>Mathematics</option>
            <option>English</option>
            <option>Science</option>
          </select>
        </div>
      </div>
      <div className="examination-table table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Class</th>
              <th>Teacher</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1, 3, 3, 5, 6].map((_, index) => (
              <tr key={index}>
                <td>
                  <h3>Mathematics</h3>
                  <p>First Term - 2023/2024</p>
                </td>
                <td>Grade 10</td>
                <td>John Smith</td>
                <td>June 14, 2020</td>
                <td>
                  <span className="custom-status">Active</span>
                </td>
                <td className="actions">
                  <button className="button">Set Questions</button>
                  <button className="button">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
