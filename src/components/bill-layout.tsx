import type { BankAccount, BillItem, BillingInformation } from "../utils/types";
import { formatMoney, getUserData, NAIRA_SYMBOL } from "../utils";
import useStudentsStore from "../dataset/students.store";
import type { StudentStore } from "../dataset/store.types";

export function BillLayout({
  billItems,
  billingInformation,
  primaryBankAccount,
  billLayout,
  setBillLayout,
}: {
  billItems: BillItem[];
  billingInformation: BillingInformation;
  primaryBankAccount: BankAccount;
  billLayout: "standard" | "minimalist" | "modern";
  setBillLayout: (layout: "standard" | "minimalist" | "modern") => void;
}) {
  const userData = getUserData();
  const { students } = useStudentsStore() as StudentStore;

  const student = students.find(
    (student) => student._id === billingInformation.student
  );

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
              Bank Name: <b>{primaryBankAccount?.bankName}</b>
            </li>
            <li>
              Account Name: <b>{primaryBankAccount?.accountName}</b>
            </li>
            <li>
              Account Number: <b>{primaryBankAccount?.accountNumber}</b>
            </li>
          </div>
        </div>
      ) : billLayout === "modern" ? (
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
              Bank Name: <b>{primaryBankAccount?.bankName}</b>
            </li>
            <li>
              Account Name: <b>{primaryBankAccount?.accountName}</b>
            </li>
            <li>
              Account Number: <b>{primaryBankAccount?.accountNumber}</b>
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
              Bank Name: <b>{primaryBankAccount?.bankName}</b>
            </li>
            <li>
              Account Name: <b>{primaryBankAccount?.accountName}</b>
            </li>
            <li>
              Account Number: <b>{primaryBankAccount?.accountNumber}</b>
            </li>
          </div>
        </div>
      )}
    </div>
  );
}
