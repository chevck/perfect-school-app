import { useFormik } from "formik";
import * as Yup from "yup";

export function BankAccountModal({
  setEditBody,
}: {
  setEditBody: (body: Record<string, any>) => void;
}) {
  const formik = useFormik({
    initialValues: {
      bankName: "",
      accountName: "",
      accountNumber: "",
      accountType: "",
      isPrimary: false,
    },
    onSubmit: (values) => {
      setEditBody((prev) => ({
        ...prev,
        schoolBankAccounts: [values, ...(prev.schoolBankAccounts ?? [])],
      }));
      formik.resetForm();
      document.getElementById("close-custom-modal-bank-account-modal")?.click();
    },
    validationSchema: Yup.object({
      bankName: Yup.string().required("Bank name is required"),
      accountName: Yup.string().required("Account name is required"),
      accountNumber: Yup.string().required("Account number is required"),
      accountType: Yup.string().required("Account type is required"),
    }),
  });

  return (
    <div
      className='modal fade'
      id={"bank-account-modal"}
      tabIndex={-1}
      aria-labelledby={`custom-modal-label bank-account-modal-label`}
      aria-hidden='true'
    >
      <div className='modal-dialog modal-dialog-centered'>
        <div className='modal-content'>
          <div className='modal-header'>
            <div
              className='modal-title'
              id={`custom-modal-label bank-account-modal-label`}
            >
              <h1>Add Bank Account</h1>
              <p>Add a new bank account for your school</p>
            </div>
            <button
              type='button'
              className='btn-close'
              id={`close-custom-modal-bank-account-modal`}
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='modal-body'>
            <div className='form-group'>
              <label>Bank Name</label>
              <select
                className='form-select'
                onChange={formik.handleChange}
                id='bankName'
                value={formik.values.bankName}
              >
                <option disabled selected>
                  Select Bank
                </option>
                <option value='Fidelity Bank'>Fidelity Bank</option>
                <option value='Access Bank'>Access Bank</option>
                <option value='Zenith Bank'>Zenith Bank</option>
                <option value='UBA'>UBA</option>
              </select>
              {formik.errors.bankName && formik.touched.bankName ? (
                <p className='text-danger'>{formik.errors.bankName}</p>
              ) : null}
            </div>
            <div className='form-group'>
              <label>Account Name</label>
              <input
                className='form-control'
                type='text'
                placeholder='Enter account holder name'
                onChange={formik.handleChange}
                id='accountName'
                value={formik.values.accountName}
              />
              {formik.errors.accountName && formik.touched.accountName ? (
                <p className='text-danger'>{formik.errors.accountName}</p>
              ) : null}
            </div>
            <div className='form-group'>
              <label>Account Number</label>
              <input
                className='form-control'
                type='number'
                placeholder='Enter account number'
                onChange={formik.handleChange}
                id='accountNumber'
                value={formik.values.accountNumber}
                pattern='[0-9]*'
              />
              {formik.errors.accountNumber && formik.touched.accountNumber ? (
                <p className='text-danger'>{formik.errors.accountNumber}</p>
              ) : null}
            </div>
            <div className='form-group'>
              <label>Account Type</label>
              <select
                className='form-select'
                onChange={formik.handleChange}
                id='accountType'
                value={formik.values.accountType}
              >
                <option disabled selected>
                  Select Account Type
                </option>
                <option value='Savings'>Savings</option>
                <option value='Current'>Current</option>
                <option value='Corporate'>Corporate</option>
              </select>
              {formik.errors.accountType && formik.touched.accountType ? (
                <p className='text-danger'>{formik.errors.accountType}</p>
              ) : null}
            </div>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='button cancel'
              data-bs-dismiss='modal'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='button create'
              onClick={() => formik.handleSubmit()}
              disabled={formik.isSubmitting}
            >
              Add Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
