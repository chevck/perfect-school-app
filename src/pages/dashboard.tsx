export function Dashboard() {
  return (
    <div className='dashboard psa_d_page'>
      <h2 className='title'>Dashboard</h2>
      <div className='card-set'>
        <div className='card_o'>
          <div className='card-content'>
            <h5>Total Students</h5>
            <h2>100</h2>
            <p className='metrics'>
              <span>4.3%</span> from last month
            </p>
          </div>
          <div className='card-icon-identifier'>
            <i className='bi bi-people'></i>
          </div>
        </div>
        <div className='card_o'>
          <div className='card-content'>
            <h5>Total Students</h5>
            <h2>100</h2>
            <p className='metrics'>
              <span>4.3%</span> from last month
            </p>
          </div>
          <div className='card-icon-identifier'>
            <i className='bi bi-people'></i>
          </div>
        </div>
        <div className='card_o'>
          <div className='card-content'>
            <h5>Total Students</h5>
            <h2>100</h2>
            <p className='metrics'>
              <span>4.3%</span> from last month
            </p>
          </div>
          <div className='card-icon-identifier'>
            <i className='bi bi-people'></i>
          </div>
        </div>
        <div className='card_o'>
          <div className='card-content'>
            <h5>Total Students</h5>
            <h2>100</h2>
            <p className='metrics'>
              <span>4.3%</span> from last month
            </p>
          </div>
          <div className='card-icon-identifier'>
            <i className='bi bi-people'></i>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-md-8 col-12'>
          <div className='card-set'>
            <div className='card-big'>
              <div className='card__header'>
                <h3 className='title'>Recent Activity</h3>
                <button>View All</button>
              </div>
              <div className='activity-list'>
                {[1, 2, 3, 4].map((el) => (
                  <div className='activity' key={el}>
                    <div className='card-icon-identifier'>
                      <i className='bi bi-people'></i>
                    </div>
                    <div>
                      <h5>New student Emma Wilson has been registered</h5>
                      <p>Today at 10:20am</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-4 col-12'>
          <div className='card-set'>
            <div className='card-big'>
              <div className='card__header'>
                <h3 className='title'>Recent Activity</h3>
                <button>View All</button>
              </div>
              <div className='activity-list'>
                {[1, 2, 3, 4].map((el) => (
                  <div className='activity' key={el}>
                    <div className='card-icon-identifier'>
                      <i className='bi bi-people'></i>
                    </div>
                    <div>
                      <h5>New student Emma Wilson has been registered</h5>
                      <p>Today at 10:20am</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
