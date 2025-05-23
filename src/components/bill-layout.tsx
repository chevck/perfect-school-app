// there would be different formats but for now, we're gonna use the MINIMALIST

export function BillLayout() {
  return (
    <div className='bill-layout minimalist'>
      <div className='section-a'>
        <div className='address'>
          <h4>The Perfect School</h4>
          <p>123 School Street</p>
          <p>City, State, Zip Code</p>
        </div>
        <div className='bill-id'>
          <h3>Bill #BILL-5288</h3>
          <h6>23rd June, 2025</h6>
        </div>
      </div>
      <div className='bill-to'>
        <h4>Bill To:</h4>
        <p>John Doe</p>
        <p>123 Student Street</p>
      </div>
      <div className='items-table'>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th scope='col'>Description</th>
              <th scope='col'>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>School Fees</td>
              <td>$250</td>
            </tr>
            <tr className='total'>
              <td>Total</td>
              <td>$250</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='payment-instructions'>
        <p>Payment Terms: Please pay into the account below</p>
        <li>
          Bank Name: <b>First Bank</b>
        </li>
        <li>
          Account Name: <b>The Perfect School</b>
        </li>
        <li>
          Account Number: <b>1234567890</b>
        </li>
      </div>
    </div>
  );
}
