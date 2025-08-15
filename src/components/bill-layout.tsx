import type {
  BankAccount,
  BillItem,
  BillingInformation,
  School,
} from "../utils/types";
import { formatMoney, getUserData, NAIRA_SYMBOL } from "../utils";
// import useStudentsStore from "../dataset/students.store";
// import type { StudentStore } from "../dataset/store.types";
// import { useState } from "react";

export function BillLayout({
  billItems,
  billingInformation,
  primaryBankAccount,
  billLayout,
  setBillLayout,
  school,
}: {
  billItems: BillItem[];
  billingInformation: BillingInformation;
  primaryBankAccount: BankAccount;
  billLayout: "standard" | "minimalist" | "modern";
  setBillLayout: (layout: "standard" | "minimalist" | "modern") => void;
  school: School;
}) {
  const userData = getUserData() || {
    schoolName: school.schoolName,
    schoolAddress: school.address,
  };
  // const { students } = useStudentsStore() as StudentStore;
  // const [paymentLink, setPaymentLink] = useState("");
  // const paymentLink = "https://paystack.shop/pay/l79p1dbb8b";

  // const student = students.find(
  //   (student) => student._id === billingInformation.student
  // );

  const total = billItems.reduce(
    (acc, item) => acc + (item.include ? item.price : 0),
    0
  );

  // const getLink = () => {
  //   const link = `${paymentLink}?amount=${total}&email=${
  //     student?.email
  //   }&first_name=${student?.name?.split(" ")[0]}&last_name=${
  //     student?.name?.split(" ")[1]
  //   }&amount=${total}`;
  //   console.log({ link });
  //   setPaymentLink(link);
  //   return link;
  // };

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
          className={`button ${billLayout === "standard" ? "active" : ""}`}
          onClick={() => setBillLayout("standard")}
        >
          Standard
        </button>
        <button
          className={`button ${billLayout === "modern" ? "active" : ""}`}
          onClick={() => setBillLayout("modern")}
        >
          Modern
        </button>
        <button
          className={`button ${billLayout === "minimalist" ? "active" : ""}`}
          onClick={() => setBillLayout("minimalist")}
        >
          Minimal
        </button>
      </div>
      {billLayout === "standard" ? (
        <div className={`bill-layout standard`} id='bill-preview'>
          <div className='section-a'>
            <div className='address'>
              <h4>{userData?.schoolName}</h4>
              <p>{userData?.schoolAddress || "-"}</p>
              {/* <p>{userData?.schoolCity}</p> */}
            </div>
            <div className='bill-id'>
              <h3>{billingInformation.term}</h3>
              <h6>Class: {billingInformation.class}</h6>
            </div>
          </div>
          {/* <div className='bill-to'>
            <h4>Bill To:</h4>
            <p>{student?.name}</p>
            <p>{student?.address}</p>
            <p>{billingInformation.class}</p>
          </div> */}
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
              Bank Name: <b>{school?.bankName}</b>
            </li>
            <li>
              Account Name: <b>{school?.accountName}</b>
            </li>
            <li>
              Account Number: <b>{school?.accountNumber}</b>
            </li>
          </div>
          {billingInformation.notes ? (
            <div className='notes' style={{ marginTop: "16px" }}>
              <div className='notes'>
                <b>NOTE:</b>
                <ul>
                  {billingInformation.notes?.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      ) : billLayout === "modern" ? (
        <div className={`bill-layout modern`} id='bill-preview'>
          <div className='school-details'>
            {/* <div className='school-logo'>CS</div> */}
            <div className='school-name'>{userData.schoolName}</div>
            <div className='school-address'>{userData.schoolAddress}</div>
          </div>
          <div className='bill-details'>
            <div className='_left'>
              {/* <h6>Invoice</h6>
              <h2>{billingInformation.billId}</h2> */}
              <h6>Term</h6>
              <h2
                style={{
                  fontSize: "16px",
                  textTransform: "uppercase",
                  fontWeight: 500,
                }}
              >
                {billingInformation.term}
              </h2>
            </div>
            <div className='_right'>
              <h6>Class</h6>
              <h2>{billingInformation.class}</h2>
            </div>
          </div>
          {/* <div className='bill-to'>
            <h4>Bill To:</h4>
            <p>
              <b>Mr. {billingInformation.parent} </b>
            </p>
            <p>
              Student: <b>{student?.name}</b>
            </p>
          </div> */}
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
              Bank Name: <b>{school?.bankName}</b>
            </li>
            <li>
              Account Name: <b>{school?.accountName}</b>
            </li>
            <li>
              Account Number: <b>{school?.accountNumber}</b>
            </li>
          </div>
          {billingInformation.notes?.length ? (
            <div className='notes'>
              <b>NOTE:</b>
              <ul>
                {billingInformation.notes?.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : (
        <div className={`bill-layout minimal`} id='bill-preview'>
          <div className='bill-header'>
            <div className='school-name'>{userData?.schoolName}</div>
            <div className='bill-info'>
              {/* <p>BILL {billingInformation.billId}</p> */}
              <p>{billingInformation.term}</p>
              <p>{billingInformation.class}</p>
            </div>
          </div>
          {/* <div className='bill-to'> */}
          {/* <h4> {billingInformation.parent}</h4> */}
          {/* <p>Parent of {student?.name}.</p> */}
          {/* <p>Term: {billingInformation.term}</p>
          </div> */}
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
              Bank Name: <b>{school?.bankName}</b>
            </li>
            <li>
              Account Name: <b>{school?.accountName}</b>
            </li>
            <li>
              Account Number: <b>{school?.accountNumber}</b>
            </li>
          </div>
          {billingInformation.notes?.length ? (
            <div className='notes' style={{ marginTop: "16px" }}>
              <div className='notes'>
                <b>NOTE:</b>
                <ul>
                  {billingInformation.notes?.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
