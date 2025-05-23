import { useState } from "react";
import { BillLayout } from "../components/bill-layout";

export function CreateBill() {
  const [billItems] = useState([1, 2]);
  const [itemToEdit] = useState(1);
  const [previewing, setPreviewing] = useState(false);
  return (
    <div className='create-bill'>
      {!previewing ? (
        <div className='create-bill-container'>
          <div className='title-section'>
            <h2>Create New Bill</h2>
            <button className='button' onClick={() => setPreviewing(true)}>
              Preview Bill
            </button>
          </div>
          <div className='row user-information'>
            <div className='col-12 col-md-6'>
              <div className='form-group'>
                <label>
                  Student's Name <span className='required'>*</span>
                </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter student name'
                />
              </div>
            </div>
            <div className='col-12 col-md-6'>
              <div className='form-group'>
                <label>
                  Parent's Name <span className='required'>*</span>
                </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter parent name'
                />
              </div>
            </div>
            <div className='col-12 col-md-6'>
              <div className='form-group'>
                <label>Class</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter class'
                />
              </div>
            </div>
            <div className='col-12 col-md-6'>
              <div className='form-group'>
                <label>Term</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter term'
                />
              </div>
            </div>
          </div>
          <div className='bill-items-wrapper'>
            <h2 className='title'>Bill items</h2>
            <div className='bill-items'>
              <input
                type='text'
                className='form-control'
                placeholder='Item description'
              />
              <input
                type='number'
                className='form-control amount'
                placeholder='Amount'
              />
              <button className='button' disabled>
                Add item
              </button>
            </div>
            {itemToEdit ? (
              <div className='edit-item'>
                <div className='bill-items'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Item description'
                  />
                  <input
                    type='number'
                    className='form-control amount'
                    placeholder='Amount'
                  />
                  <button className='button save' disabled>
                    Save
                  </button>
                  <button className='button cancel' disabled>
                    Cancel
                  </button>
                </div>
              </div>
            ) : null}
            {!billItems.length ? (
              <div className='added-bill-items_empty'>
                <p>No items added yet!</p>
              </div>
            ) : (
              <div className='added-bill-items'>
                <table className='table table-hover table-responsive'>
                  <thead>
                    <tr>
                      <th scope='col' colSpan={5}>
                        Description
                      </th>
                      <th scope='col' className='text-right'>
                        Amount
                      </th>
                      <th scope='col'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={5}>Schoool Fees</td>
                      <td colSpan={1} className='text-right'>
                        $250
                      </td>
                      <td colSpan={1} className='actions'>
                        <i className='bi bi-pencil'></i>
                        <i className='bi bi-trash'></i>
                      </td>
                    </tr>
                    <tr className='total'>
                      <td colSpan={5}>
                        <b>Total</b>
                      </td>
                      <td colSpan={1} className='text-right'>
                        <b>$250</b>
                      </td>
                      <td colSpan={1} className=''></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className='footer'>
            <button className='button clear'>Clear</button>
            <button className='button draft'>Save as Draft</button>
            <button
              className='button preview'
              onClick={() => setPreviewing(true)}
            >
              Preview
            </button>
          </div>
        </div>
      ) : (
        <div className='create-bill-container preview'>
          <div className='title-section'>
            <h2>Bill Preview</h2>
            <button
              className='button edit'
              onClick={() => setPreviewing(false)}
            >
              Back to Edit
            </button>
          </div>
          <BillLayout />
          <div className='footer'>
            <button className='button edit'>Back to Edit</button>
            <button className='button draft'>Save as Draft</button>
            <button className='button draft'>Download PDF</button>
            <button className='button process'>Process Bill</button>
          </div>
        </div>
      )}
    </div>
  );
}
