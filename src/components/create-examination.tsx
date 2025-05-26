export function CreateExaminationModal() {
  const handleCreateExamination = () => {
    return (window.location.href = "/create-examination");
  };

  return (
    <div
      className='modal fade'
      id='create-examination-modal'
      tabIndex={-1}
      aria-labelledby='create-examination-modal-label'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <div
              className='modal-title fs-5'
              id='create-examination-modal-label'
            >
              <h1>Create New Examination</h1>
            </div>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <div className='flex'>
              <div className='form-group'>
                <label>Subject</label>
                <select className='form-control'>
                  <option selected defaultChecked>
                    Select Subject
                  </option>
                  <option>Mathematics</option>
                  <option>English</option>
                  <option>Physics</option>
                </select>
              </div>
              <div className='form-group'>
                <label>Class</label>
                <select className='form-control'>
                  <option selected defaultChecked>
                    Select Class
                  </option>
                  <option>Class 1</option>
                  <option>Class 2</option>
                  <option>Class 3</option>
                </select>
              </div>
            </div>
            <div className='flex'>
              <div className='form-group'>
                <label>Teacher</label>
                <input
                  placeholder='Joseph Collins'
                  className='form-control'
                  disabled
                />
              </div>
              <div className='form-group'>
                <label>Examination Date</label>
                <input
                  type='date'
                  className='form-control'
                  placeholder='Select Date'
                />
              </div>
            </div>
            <div className='flex'>
              <div className='form-group'>
                <label>Term</label>
                <select className='form-control'>
                  <option selected defaultChecked>
                    Select Term
                  </option>
                  <option>Term 1</option>
                  <option>Term 2</option>
                  <option>Term 3</option>
                </select>
              </div>
              <div className='form-group'>
                <label>Academic Session</label>
                <select className='form-control'>
                  <option selected defaultChecked>
                    Select Session
                  </option>
                  <option>2023/2024</option>
                  <option>2024/2025</option>
                  <option>2025/2026</option>
                </select>
              </div>
            </div>
            <div className='flex'>
              <div className='form-group'>
                <label>Total Marks</label>
                <input
                  className='form-control'
                  placeholder='Total Marks'
                  type='number'
                />
              </div>
              <div className='form-group'>
                <label>Duration (minutes)</label>
                <input
                  className='form-control'
                  placeholder='Duration'
                  type='number'
                />
              </div>
            </div>
            <div className='flex'>
              <div className='form-group'>
                <label>Instructions</label>
                <textarea
                  className='form-control'
                  placeholder='Answer all questions. Each question carries the marks indicated.'
                />
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary cancel'
              data-bs-dismiss='modal'
            >
              Cancel
            </button>
            <button
              type='button'
              className='btn btn-primary'
              onClick={handleCreateExamination}
            >
              Create Examination
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
