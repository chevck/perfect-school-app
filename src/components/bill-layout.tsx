// there would be different formats but for now, we're gonna use the MINIMALIST

import { useState } from "react";
import type { BillItem, BillingInformation } from "../utils/types";
import { formatMoney, getUserData, NAIRA_SYMBOL } from "../utils";
import useStudentsStore from "../dataset/students.store";
import type { StudentStore } from "../dataset/store.types";

export function BillLayout({
  billItems,
  billingInformation,
}: {
  billItems: BillItem[];
  billingInformation: BillingInformation;
}) {
  const [selectedLayout, setSelectedLayout] = useState("standard");
  const userData = getUserData();
  const { students } = useStudentsStore() as StudentStore;

  const student = students.find(
    (student) => student._id === billingInformation.student
  );

  console.log({ student });

  console.log({ userData, billingInformation });

  console.log({ billItems });

  const total = billItems.reduce((acc, item) => acc + item.price, 0);

  const BillItemsList = () => {
    return billItems.map((item, key) => (
      <tr key={key}>
        <td>{item.item}</td>
        <td>
          {NAIRA_SYMBOL}
          {formatMoney(item.price)}
        </td>
      </tr>
    ));
  };

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
        <div className={`bill-layout standard`} id='bill-preview'>
          <div className='section-a'>
            <div className='address'>
              <h4>{userData?.schoolName}</h4>
              <p>{userData?.schoolAddress || "-"}</p>
              {/* <p>{userData?.schoolCity}</p> */}
            </div>
            <div className='bill-id'>
              <h3>Bill {billingInformation.billId}</h3>
              <h6>{billingInformation.billDate}</h6>
            </div>
          </div>
          <div className='bill-to'>
            <h4>Bill To:</h4>
            <p>{student?.name}</p>
            <p>{student?.address}</p>
            <p>{billingInformation.class}</p>
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
                <BillItemsList />
                <tr className='total'>
                  <td>Total</td>
                  <td>
                    {NAIRA_SYMBOL}
                    {formatMoney(total)}
                  </td>
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
        <div className={`bill-layout modern`} id='bill-preview'>
          <div className='school-details'>
            <div className='school-logo'>PS</div>
            <div className='school-name'>{userData.schoolName}</div>
            <div className='school-address'>{userData.schoolAddress}</div>
          </div>
          <div className='bill-details'>
            <div className='_left'>
              <h6>Invoice</h6>
              <h2>{billingInformation.billId}</h2>
            </div>
            <div className='_right'>
              <h6>Date Issued</h6>
              <h2>{billingInformation.billDate}</h2>
            </div>
          </div>
          <div className='bill-to'>
            <h4>Bill To:</h4>
            <p>
              <b>Mr. {billingInformation.parent} </b>
            </p>
            <p>
              Student: <b>{student?.name}</b>
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
                <BillItemsList />
                <tr className='total'>
                  <td>Total</td>
                  <td>
                    {NAIRA_SYMBOL}
                    {formatMoney(total)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='total-section-wrapper'>
            <div className='total-section'>
              <div className='subtotal'>
                <p>Subtotal:</p>
                <p>
                  {NAIRA_SYMBOL}
                  {formatMoney(total)}
                </p>
              </div>
              <div className='total'>
                <p>Total:</p>
                <p>
                  {NAIRA_SYMBOL}
                  {formatMoney(total)}
                </p>
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
        <div className={`bill-layout minimal`} id='bill-preview'>
          <div className='bill-header'>
            <div className='school-name'>{userData?.schoolName}</div>
            <div className='bill-info'>
              <p>BILL {billingInformation.billId}</p>
              <p>{billingInformation.billDate}</p>
            </div>
          </div>
          <div className='bill-to'>
            <h4> {billingInformation.parent}</h4>
            <p>Parent of {student?.name}.</p>
            <p>Term: {billingInformation.term}</p>
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
                <BillItemsList />
                <tr className='total'>
                  <td>Total</td>
                  <td>
                    {NAIRA_SYMBOL}
                    {formatMoney(total)}
                  </td>
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
