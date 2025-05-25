import { useState } from "react";

const mockBills = [
  {
    id: "1",
    billNumber: "BILL-001",
    studentName: "John Smith",
    date: "2023-05-01",
    amount: 250,
    status: "paid",
    term: "2023/2024",
  },
  {
    id: "2",
    billNumber: "BILL-002",
    studentName: "Emma Johnson",
    date: "2023-05-05",
    amount: 350,
    status: "paid",
    term: "2023/2024",
  },
  {
    id: "3",
    billNumber: "BILL-003",
    studentName: "Michael Brown",
    date: "2023-05-10",
    amount: 150,
    status: "pending",
    term: "2023/2024",
  },
  {
    id: "4",
    billNumber: "BILL-004",
    studentName: "Sophia Davis",
    date: "2023-05-15",
    amount: 450,
    status: "overdue",
    term: "2023/2024",
  },
  {
    id: "5",
    billNumber: "BILL-005",
    studentName: "William Wilson",
    date: "2023-05-20",
    amount: 200,
    status: "pending",
    term: "2024/2025",
  },
];

export function Billing() {
  const [bills] = useState(mockBills);
  return (
    <div className='billing psa_d_page'>
      <h2 className='title'>Billing Management</h2>
      <div className='card-set'>
        <div className='card_o'>
          <div className='card-content'>
            <h5>Total Bills</h5>
            <h2>100</h2>
          </div>
          <div className='card-icon-identifier'>
            <i className='bi bi-people'></i>
          </div>
        </div>
        <div className='card_o'>
          <div className='card-content'>
            <h5>Total Amount</h5>
            <h2>$100</h2>
          </div>
          <div className='card-icon-identifier'>
            <i className='bi bi-cash'></i>
          </div>
        </div>
        <div className='card_o'>
          <div className='card-content'>
            <h5>Paid Bills</h5>
            <h2>3</h2>
          </div>
          <div className='card-icon-identifier'>
            <i className='bi bi-check'></i>
          </div>
        </div>
        <div className='card_o'>
          <div className='card-content'>
            <h5>Unpaid Bills</h5>
            <h2>23</h2>
          </div>
          <div className='card-icon-identifier'>
            <i className='bi bi-clock'></i>
          </div>
        </div>
      </div>
      <div className='filter_create_section'>
        <div className='filter'>
          <input className='form-control' type='text' placeholder='Search' />
          <select className='form-select'>
            <option value=''>All</option>
            <option value=''>Paid</option>
            <option value=''>Unpaid</option>
          </select>
        </div>
        <button
          className='button create-bill'
          onClick={() => (window.location.href = "/create-bill")}
        >
          <i className='bi bi-plus'></i>
          <p>Add New Bill</p>
        </button>
      </div>
      {bills.length ? (
        <div className='billing-table-wrapper table-responsive'>
          <table className='table table-hover billing-table'>
            <thead>
              <tr>
                <th scope='col'>Bill Number</th>
                <th scope='col'>Student Name</th>
                <th scope='col'>Term</th>
                <th scope='col'>Amount</th>
                <th scope='col'>Date</th>
                <th scope='col'>Status</th>
                <th scope='col'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill) => (
                <tr key={bill.id}>
                  <td>{bill.billNumber}</td>
                  <td>{bill.studentName}</td>
                  <td>{bill.term}</td>
                  <td>${bill.amount}</td>
                  <td>{bill.date}</td>
                  <td>
                    <span className='custom-status'>{bill.status}</span>
                  </td>
                  <td className='actions'>
                    <i className='bi bi-pencil'></i>
                    <i className='bi bi-trash'></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyBillContainer />
      )}
    </div>
  );
}

function EmptyBillContainer() {
  return (
    <div className='empty-bill-container'>
      <div className='bill-icon-wrapper'>
        <i className='bi bi-file-earmark-text'></i>
      </div>
      <h2>No Bills Found</h2>
      <p>
        You haven't created any bills yet or no bills match your current
        filters. Create your first bill to get started.
      </p>
      <button
        className='button create-bill'
        onClick={() => (window.location.href = "/create-bill")}
      >
        <i className='bi bi-plus'></i>
        <p>Create Your First Bill</p>
      </button>
    </div>
  );
}
