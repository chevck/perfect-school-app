import { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import { BillLayout } from "../../components/bill-layout";
// import Select from "react-select";
// import type { StudentStore } from "../../dataset/store.types";
// import useStudentsStore from "../../dataset/students.store";
import type { BankAccount, BillItem, School } from "../../utils/types";
import {
  formatMoney,
  getUserData,
  handleError,
  NAIRA_SYMBOL,
} from "../../utils";
import { toast } from "sonner";
import { useFormik } from "formik";
// import { billingSchema } from "../../utils/schemas/billing.schema";
import moment from "moment";
import axios from "axios";
import { useParams } from "react-router-dom";
// import { Loader } from "../../components/loader";

export function UnauthCreateBill() {
  const [billItems, setBillItems] = useState<BillItem[] | []>([]);
  const [itemToEdit, setItemToEdit] = useState<BillItem | null>(null);
  const [previewing, setPreviewing] = useState(false);
  const [billLayout, setBillLayout] = useState<
    "standard" | "minimalist" | "modern"
  >("modern");
  // const { students, fetchStudentsApi } = useStudentsStore() as StudentStore;
  const [school, setSchool] = useState<School | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newData, setNewData] = useState<{
    [key: string]: string | number | boolean;
  } | null>(null);
  const userData = getUserData();
  const { billId } = useParams();
  const isEditPage = !!billId;

  const schools: School[] = [
    {
      schoolName: "Sharon Heirs Int'l School",
      address: "Onirinloye Junction, Gbekuba Apata, Ibadan",
      _id: "sharon-heirs-int-school",
      accountNumber: "0030582667",
      accountName: "Shalom Kiddies College",
      bankName: "GTBank",
    },
    {
      schoolName: "The Crystal School",
      address: "Alafara Road, Ile tuntun, Nihort Road, Ibadan",
      _id: "the-crystal-school",
      accountName: "The Crystal School",
      accountNumber: "2035951377",
      bankName: "First Bank of Nigeria",
    },
    {
      schoolName: "Shalom Kiddies College",
      address: "Off Joyce 'B' Road, Ogunleye Avenue, Oke Ado Ibadan",
      _id: "shalom-kiddies-college",
      accountNumber: "0030582667",
      accountName: "Shalom Kiddies College",
      bankName: "GTBank",
    },
  ];

  const formik = useFormik({
    initialValues: {
      student: "",
      parent: "",
      class: "",
      term: "",
      billId: `#${Math.floor(10000 + Math.random() * 90000)}`,
      billDate: moment().format("Do MMMM, YYYY"),
      session: "",
      saveAsDraft: true,
      notes: [
        "All textbooks and stationeries are included",
        "Please note that all payments are NON-REFUNDABLE.",
        "We kindly request that parents/guardians pay at least 70% of the school fees into the school account at the start of the term",
      ],
    },
    onSubmit: () => {
      console.log(isLoading);
      if (!billItems.length) {
        toast.error("Please add at least one item to the bill");
        return;
      }
      if (isEditPage) {
        handleUpdateBill();
      } else {
        handleCreateBill();
      }
    },
    // validationSchema: billingSchema,
  });

  const primaryBankAccount = school?.schoolBankAccounts?.find(
    (bank: BankAccount) => bank.isPrimary
  ) || {
    accountName: "The Crystal School",
    accountNumber: 2035951377,
    bankName: "First Bank of Nigeria",
  };

  useEffect(() => {
    setSchool(schools[0] as School);
  }, []);

  // const handleGetBill = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/bill/${billId}`,
  //       { headers: { Authorization: `Bearer ${userData?.token}` } }
  //     );
  //     const billDetails = response.data.bill;
  //     setBillItems(billDetails.billItems);
  //     formik.setFieldValue("student", billDetails.studentId);
  //     // formik.setFieldValue("parent", billDetails.parentId);
  //     formik.setFieldValue("class", billDetails.class);
  //     formik.setFieldValue("term", billDetails.term);
  //     formik.setFieldValue("session", billDetails.session);
  //     formik.setFieldValue("billId", billDetails.billId);
  //     formik.setFieldValue("billDate", billDetails.billDate);
  //   } catch (error) {
  //     handleError(error);
  //     // toast.error("Something went wrong with getting the bill");
  //   }
  // };

  // const handleGetSchool = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/school`,
  //       { headers: { Authorization: `Bearer ${userData?.token}` } }
  //     );
  //     setSchool(response.data.school);
  //   } catch (error) {
  //     handleError(error);
  //     // toast.error(
  //     //   "Something went wrong with getting school data. Please try again later"
  //     // );
  //   }
  // };

  // useEffect(() => {
  //   fetchStudentsApi({ class: "", status: "" });
  //   handleGetSchool();
  //   if (billId) handleGetBill();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const classes = school?.classes.map((c) => c.className) ?? [];

  // const classes = ["Pre Nursery", "Reception One"];

  // const studentOptions = students.map((student) => ({
  //   label: student.name,
  //   value: student._id,
  // }));

  // const parentOptions = [
  //   { label: "John Doe", value: "1" },
  //   { label: "Jane Doe", value: "2" },
  // ];

  const handleAddItem = () => {
    const currentData = { ...newData };
    setNewData(null);
    setBillItems([
      ...billItems,
      {
        item: currentData["item-description"] as string,
        price: Number(currentData["item-amount"]),
        include: true,
      },
    ]);
  };

  const total = billItems.reduce(
    (acc, item) => acc + (item.include ? item.price : 0),
    0
  );

  console.log({ school });

  const handleSaveItem = () => {
    if (!itemToEdit) return;
    const dataIndex = billItems.findIndex(
      (item) => item.item === itemToEdit.item
    );
    if (dataIndex < 0) return;
    setBillItems([
      ...billItems.slice(0, dataIndex),
      itemToEdit,
      ...billItems.slice(dataIndex + 1),
    ]);
    setItemToEdit(null);
    setNewData(null);
  };

  const handleCancelEdit = () => {
    setItemToEdit(null);
  };

  const handleDeleteItem = (item: BillItem) => {
    setBillItems(billItems.filter((i) => i.item !== item.item));
  };

  const handleDownloadPdf = () => {
    const element = document.getElementById("bill-preview");
    const opt = {
      margin: 0,
      filename: `${school?.schoolName}-Bill-${formik.values.class}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2, dpi: 300, letterRendering: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().from(element).set(opt).save();
  };

  const handleSubtractItemFromBill = (itemIndex: number, item: BillItem) => {
    const updatedBillItems = [...billItems];
    updatedBillItems[itemIndex] = {
      ...item,
      include: !item.include,
    };
    setBillItems(updatedBillItems);
  };

  const handleCreateBill = async () => {
    try {
      setIsLoading(true);
      await axios.post(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/bill`,
        {
          ...formik.values,
          billItems,
          accountDetails: primaryBankAccount,
          totalAmount: total,
          billLayoutType: billLayout,
          isDraft: formik.values.saveAsDraft,
        },
        { headers: { Authorization: `Bearer ${userData?.token}` } }
      );
      toast.success("Bill created successfully");
      window.location.href = "/billing";
    } catch (error) {
      handleError(error);
      // toast.error("Something went wrong with creating the bill");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateBill = async () => {
    try {
      setIsLoading(true);
      await axios.put(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/bill/${billId}`,
        {
          ...formik.values,
          billItems,
          totalAmount: total,
          billLayoutType: billLayout,
          accountDetails: primaryBankAccount,
          isDraft: formik.values.saveAsDraft,
        },
        { headers: { Authorization: `Bearer ${userData?.token}` } }
      );
      toast.success("Bill updated successfully");
      window.location.href = "/billing";
    } catch (error) {
      handleError(error);
      // toast.error("Something went wrong with updating the bill");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviewBill = () => {
    if (formik.values.notes.some((note) => note.trim() === "")) {
      toast.error("Please remove empty notes");
      return;
    }
    formik.validateForm().then((errors) => {
      formik.setTouched({
        // student: true,
        // parent: true,
        class: true,
        term: true,
        session: true,
      });
      if (Object.keys(errors).length === 0) {
        const billItemsLength = billItems.length;
        if (billItemsLength > 0) setPreviewing(true);
        else toast.error("Please add at least one item to the bill");
      }
    });
  };

  console.log("sds", formik.errors);

  return (
    <div className='create-bill'>
      <div className='close-button-container'>
        <div
          className='close-button'
          onClick={() => (window.location.href = "/billing")}
        >
          <i className='bi bi-x'></i>
        </div>
      </div>
      {!previewing ? (
        <div className='create-bill-container'>
          <div className='title-section'>
            <h2>Create New Bill</h2>
            <button className='button' onClick={handlePreviewBill}>
              Preview Bill
            </button>
          </div>
          <div className='school-list'>
            {schools.map((schoolItem) => (
              <div
                key={schoolItem._id}
                className={`school-item ${
                  schoolItem._id === school?._id ? "active" : ""
                }`}
                onClick={() => setSchool(schoolItem)}
              >
                <h3>{schoolItem.schoolName}</h3>
                <div className='school-account-details'>
                  <p>
                    <span>Account Number:</span> {schoolItem.accountNumber}
                  </p>
                  <p>
                    <span>Bank Name:</span> {schoolItem.bankName}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className='row user-information'>
            {/* <div className='col-12 col-md-6'>
              <div className='form-group'>
                <label>
                  Student's Name <span className='required'>*</span>
                </label>
                <Select
                  options={studentOptions}
                  className='custom-react-select'
                  classNamePrefix='select'
                  placeholder='Search Student'
                  isSearchable={true}
                  isClearable={true}
                  onChange={(value) =>
                    formik.setFieldValue("student", value?.value)
                  }
                  value={
                    studentOptions.find(
                      (option) => option.value === formik.values.student
                    ) ?? null
                  }
                />
                {formik.errors.student && formik.touched.student && (
                  <div className='text-danger'>{formik.errors.student}</div>
                )}
              </div>
            </div> */}
            {/* <div className='col-12 col-md-6'>
              <div className='form-group'>
                <label>
                  Parent's Name <span className='required'>*</span>
                </label>
                <Select
                  options={parentOptions}
                  className='custom-react-select'
                  classNamePrefix='select'
                  placeholder='Search Parent'
                  isSearchable={true}
                  isClearable={true}
                  onChange={(value) => {
                    formik.setFieldValue("parent", value?.value);
                  }}
                />
                {formik.errors.parent && formik.touched.parent && (
                  <div className='text-danger'>{formik.errors.parent}</div>
                )}
              </div>
            </div> */}
            <div className='col-12 col-md-6'>
              <div className='form-group'>
                <label>Class</label>
                <input
                  className='form-control'
                  type='text'
                  value={formik.values.class}
                  onChange={(e) => {
                    formik.setFieldValue("class", e.target.value);
                  }}
                  placeholder='Input class Name e.g Grade One'
                />
                {/* <select
                  className='form-select'
                  value={formik.values.class}
                  onChange={(e) => {
                    formik.setFieldValue("class", e.target.value);
                  }}
                >
                  <option value=''>Select Class</option>
                  {classes.map((classItem, key) => (
                    <option key={key} value={classItem}>
                      {classItem}
                    </option>
                  ))}
                </select> */}
                {formik.errors.class && formik.touched.class && (
                  <div className='text-danger'>{formik.errors.class}</div>
                )}
              </div>
            </div>
            <div className='col-12 col-md-6'>
              <div className='form-group'>
                <label>Session</label>
                <select
                  className='form-select'
                  value={formik.values.session}
                  onChange={(e) => {
                    formik.setFieldValue("session", e.target.value);
                  }}
                >
                  <option value=''>Select Session</option>
                  <option value='2023/2024'>2023/2024</option>
                  <option value='2024/2025'>2024/2025</option>
                  <option value='2025/2026'>2025/2026</option>
                  <option value='2026/2027'>2026/2027</option>
                  <option value='2027/2028'>2027/2028</option>
                  <option value='2028/2029'>2028/2029</option>
                  <option value='2029/2030'>2029/2030</option>
                  <option value='2030/2031'>2030/2031</option>
                  <option value='2031/2032'>2031/2032</option>
                  <option value='2032/2033'>2032/2033</option>
                  <option value='2033/2034'>2033/2034</option>
                  <option value='2034/2035'>2034/2035</option>
                  <option value='2035/2036'>2035/2036</option>
                  <option value='2036/2037'>2036/2037</option>
                  <option value='2037/2038'>2037/2038</option>
                </select>
                {formik.errors.session && formik.touched.session && (
                  <div className='text-danger'>{formik.errors.session}</div>
                )}
              </div>
            </div>
            <div className='col-12 col-md-6'>
              <div className='form-group'>
                <label>Term</label>
                <select
                  className='form-select'
                  value={formik.values.term}
                  onChange={(e) => {
                    formik.setFieldValue("term", e.target.value);
                  }}
                >
                  <option value=''>Select Term</option>
                  <option value='First Term'>First Term</option>
                  <option value='Second Term'>Second Term</option>
                  <option value='Third Term'>Third Term</option>
                </select>
                {formik.errors.term && formik.touched.term && (
                  <div className='text-danger'>{formik.errors.term}</div>
                )}
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
                value={newData?.["item-description"] ?? ""}
                onChange={(e) =>
                  setNewData({
                    ...newData,
                    "item-description": e.target.value,
                  })
                }
              />
              <input
                className='form-control amount'
                placeholder='Amount'
                value={`${NAIRA_SYMBOL} ${formatMoney(
                  Number(newData?.["item-amount"] ?? 0)
                )}`}
                pattern='[0-9]*'
                onChange={({ target: { value } }) => {
                  const cleanedValue = Number(value.replace(/[^0-9]/g, ""));
                  setNewData({
                    ...newData,
                    "item-amount": cleanedValue,
                  });
                }}
              />
              {/* <div className='form-check form-switch'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  role='switch'
                  id='flexSwitchCheckChecked'
                  checked={newData?.include}
                  onChange={(e) => {
                    console.log("cjec", e.target.checked);
                    setNewData({
                      ...newData,
                      include: e.target.checked,
                    });
                  }}
                />
                <label
                  className='form-check-label'
                  htmlFor='flexSwitchCheckChecked'
                >
                  Include in Bill
                </label>
              </div> */}
              <button
                className='button'
                disabled={
                  !newData?.["item-description"] || !newData?.["item-amount"]
                }
                onClick={handleAddItem}
              >
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
                    value={itemToEdit.item}
                    onChange={(e) => {
                      setItemToEdit({
                        ...itemToEdit,
                        item: e.target.value,
                      });
                    }}
                  />
                  <input
                    className='form-control amount'
                    placeholder='Amount'
                    value={`${NAIRA_SYMBOL} ${formatMoney(itemToEdit.price)}`}
                    pattern='[0-9]*'
                    onChange={(e) => {
                      setItemToEdit({
                        ...itemToEdit,
                        price: Number(e.target.value.replace(/[^0-9]/g, "")),
                      });
                    }}
                  />
                  <button className='button save' onClick={handleSaveItem}>
                    Save
                  </button>
                  <button className='button cancel' onClick={handleCancelEdit}>
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
              <div className='added-bill-items table-responsive'>
                <table className='table table-hover'>
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
                    {billItems.map((item, key) => (
                      <tr key={key}>
                        <td colSpan={5}>{item.item}</td>
                        <td colSpan={1} className='text-right'>
                          {NAIRA_SYMBOL}
                          {formatMoney(item.price)}
                        </td>
                        <td colSpan={1} className='actions'>
                          <i
                            className='bi bi-pencil'
                            onClick={() => setItemToEdit(item)}
                          />
                          <i
                            className={
                              item.include ? "bi bi-dash-lg" : "bi bi-plus-lg"
                            }
                            onClick={() =>
                              handleSubtractItemFromBill(key, item)
                            }
                          />
                          <i
                            className='bi bi-trash'
                            onClick={() => handleDeleteItem(item)}
                          ></i>
                        </td>
                      </tr>
                    ))}
                    <tr className='total'>
                      <td colSpan={5}>
                        <b>Total</b>
                      </td>
                      <td colSpan={1} className='text-right'>
                        <b>
                          {NAIRA_SYMBOL}
                          {formatMoney(total)}
                        </b>
                      </td>
                      <td colSpan={1} className=''></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className='notes'>
            <h5>Notes</h5>
            {formik.values.notes.map((note, key) => (
              <div className='note' key={key}>
                <input
                  className='form-control'
                  key={key}
                  value={note}
                  onChange={(e) => {
                    const updatedNotes = [...formik.values.notes];
                    updatedNotes[key] = e.target.value;
                    formik.setFieldValue("notes", updatedNotes);
                  }}
                />
                <i
                  className='bi bi-x-circle'
                  onClick={() =>
                    formik.setFieldValue(
                      "notes",
                      formik.values.notes.filter((_, index) => index !== key)
                    )
                  }
                ></i>
              </div>
            ))}
            <button
              className='button'
              onClick={() =>
                formik.setFieldValue("notes", [...formik.values.notes, ""])
              }
            >
              Add Note
            </button>
          </div>
          <div className='footer'>
            <button
              className='button clear'
              onClick={() => {
                formik.resetForm();
                setBillItems([]);
                setItemToEdit(null);
                setNewData(null);
              }}
            >
              Clear
            </button>
            {/* {isEditPage ? (
              <button
                className='button draft'
                onClick={() => formik.handleSubmit()}
                disabled={isLoading}
              >
                {isLoading ? <Loader /> : "Update Bill"}
              </button>
            ) : (
              <button
                className='button draft'
                onClick={() => {
                  formik.setFieldValue("saveAsDraft", true);
                  formik.handleSubmit();
                }}
                disabled={isLoading}
              >
                {isLoading ? <Loader /> : "Save as Draft"}
              </button>
            )} */}
            <button className='button preview' onClick={handlePreviewBill}>
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
          <BillLayout
            billItems={billItems}
            billingInformation={formik.values}
            primaryBankAccount={primaryBankAccount as BankAccount}
            billLayout={billLayout}
            setBillLayout={setBillLayout}
            school={school as School}
          />
          <div className='footer'>
            <button
              className='button edit'
              onClick={() => setPreviewing(false)}
            >
              Back to Edit
            </button>
            {/* <button
              className='button draft'
              onClick={() => {
                formik.setFieldValue("saveAsDraft", true);
                formik.handleSubmit();
              }}
            >
              Save as Draft
            </button> */}
            <button className='button download' onClick={handleDownloadPdf}>
              Download PDF
            </button>
            {/* <button
              className='button process'
              onClick={() => {
                formik.setFieldValue("saveAsDraft", false);
                formik.handleSubmit();
              }}
            >
              Create Bill
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
}
