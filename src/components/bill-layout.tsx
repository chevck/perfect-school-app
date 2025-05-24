// there would be different formats but for now, we're gonna use the MINIMALIST

import { useState } from "react";

export function BillLayout() {
  const [selectedLayout, setSelectedLayout] = useState("standard");
  return (
    <div className='bill-layout-container'>
      <div className='bill-layout-options'>
        <button
          className={`button ${selectedLayout === "standard" ? "active" : ""}`}
          onClick={() => setSelectedLayout("standard")}
        >
          Standard
        </button>
        <button
          className={`button ${selectedLayout === "modern" ? "active" : ""}`}
          onClick={() => setSelectedLayout("modern")}
        >
          Modern
        </button>
        <button
          className={`button ${selectedLayout === "minimal" ? "active" : ""}`}
          onClick={() => setSelectedLayout("minimal")}
        >
          Minimal
        </button>
      </div>
      {selectedLayout === "standard" ? (
        <div className={`bill-layout standard`}>
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
      ) : selectedLayout === "modern" ? (
        <div className={`bill-layout modern`}>
          <div className='school-details'>
            <div className='school-logo'>PS</div>
            <div className='school-name'>The Perfect School</div>
            <div className='school-address'>123 School Street</div>
          </div>
          <div className='bill-details'>
            <div className='_left'>
              <h6>Invoice</h6>
              <h2>#BILL-2310</h2>
            </div>
            <div className='_right'>
              <h6>Date Issued</h6>
              <h2>23rd June, 2025</h2>
            </div>
          </div>
          <div className='bill-to'>
            <h4>Bill To:</h4>
            <p>
              <b>Mr. John Doe </b>
            </p>
            <p>
              Student: <b>Oreofe Doe</b>
            </p>
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
          <div className='total-section-wrapper'>
            <div className='total-section'>
              <div className='subtotal'>
                <p>Subtotal:</p>
                <p>$34.00</p>
              </div>
              <div className='total'>
                <p>Total:</p>
                <p>$34.00</p>
              </div>
            </div>
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
      ) : (
        <div className={`bill-layout minimal`}>
          <div className='bill-header'>
            <div className='school-name'>The Perfect School</div>
            <div className='bill-info'>
              <p>#BILL-2310</p>
              <p>23rd June, 2025</p>
            </div>
          </div>
          <div className='bill-to'>
            <h4>Mr John Doe</h4>
            <p>Parent of James Doe.</p>
            <p>Term: 2024/2025</p>
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
      )}
    </div>
  );
}
