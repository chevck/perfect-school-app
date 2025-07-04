import { useEffect, useState } from "react";
import html2pdf from "html2pdf.js";
import { BillLayout } from "../../components/bill-layout";
import Select from "react-select";
import type { StudentStore } from "../../dataset/store.types";
import useStudentsStore from "../../dataset/students.store";
import type { BillItem } from "../../utils/types";
import { CLASSES, formatMoney, getUserData, NAIRA_SYMBOL } from "../../utils";
import { toast } from "sonner";
import { useFormik } from "formik";
import { billingSchema } from "../../utils/schemas/billing.schema";
import moment from "moment";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/loader";

export function CreateBill() {
  const [billItems, setBillItems] = useState<BillItem[] | []>([]);
  const [itemToEdit, setItemToEdit] = useState<BillItem | null>(null);
  const [previewing, setPreviewing] = useState(false);
  const [billLayout, setBillLayout] = useState<
    "standard" | "minimalist" | "modern"
  >("standard");
  const { students, fetchStudentsApi } = useStudentsStore() as StudentStore;
  const [school, setSchool] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newData, setNewData] = useState<{
    [key: string]: string | number;
  } | null>(null);
  const userData = getUserData();
  const { billId } = useParams();
  const isEditPage = !!billId;

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
    },
    onSubmit: () => {
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
    validationSchema: billingSchema,
  });

  const primaryBankAccount = school?.schoolBankAccounts?.find(
    (bank: any) => bank.isPrimary
  );

  const handleGetBill = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/bill/${billId}`,
        { headers: { Authorization: `Bearer ${userData?.token}` } }
      );
      const billDetails = response.data.bill;
      setBillItems(billDetails.billItems);
      formik.setFieldValue("student", billDetails.studentId);
      // formik.setFieldValue("parent", billDetails.parentId);
      formik.setFieldValue("class", billDetails.class);
      formik.setFieldValue("term", billDetails.term);
      formik.setFieldValue("session", billDetails.session);
      formik.setFieldValue("billId", billDetails.billId);
      formik.setFieldValue("billDate", billDetails.billDate);
    } catch (error) {
      toast.error("Something went wrong with getting the bill");
    }
  };

  const handleGetSchool = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/school`,
        { headers: { Authorization: `Bearer ${userData?.token}` } }
      );
      setSchool(response.data.school);
    } catch (error) {
      toast.error(
        "Something went wrong with getting school data. Please try again later"
      );
    }
  };

  useEffect(() => {
    fetchStudentsApi({ class: "", status: "" });
    handleGetSchool();
    if (billId) handleGetBill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const studentOptions = students.map((student) => ({
    label: student.name,
    value: student._id,
  }));

  const parentOptions = [
    { label: "John Doe", value: "1" },
    { label: "Jane Doe", value: "2" },
  ];

  const handleAddItem = () => {
    const currentData = { ...newData };
    setNewData(null);
    setBillItems([
      ...billItems,
      {
        item: currentData["item-description"] as string,
        price: Number(currentData["item-amount"]),
      },
    ]);
  };

  const total = billItems.reduce((acc, item) => acc + item.price, 0);

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
    var opt = {
      margin: 0.1,
      filename: "bill.pdf",
      image: { type: "jpeg", quality: 500 },
      html2canvas: { scale: 2, dpi: 192, letterRendering: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().from(element).set(opt).save();
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
      toast.error("Something went wrong with creating the bill");
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
      toast.error("Something went wrong with updating the bill");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviewBill = () => {
    formik.validateForm().then((errors) => {
      formik.setTouched({
        student: true,
        parent: true,
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
          <div className='row user-information'>
            <div className='col-12 col-md-6'>
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
            </div>
            <div className='col-12 col-md-6'>
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
            </div>
            <div className='col-12 col-md-6'>
              <div className='form-group'>
                <label>Class</label>
                <select
                  className='form-select'
                  value={formik.values.class}
                  onChange={(e) => {
                    formik.setFieldValue("class", e.target.value);
                  }}
                >
                  <option value=''>Select Class</option>
                  {CLASSES.map((classItem, key) => (
                    <option key={key} value={classItem}>
                      {classItem}
                    </option>
                  ))}
                </select>
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
            {isEditPage ? (
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
            )}
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
            primaryBankAccount={primaryBankAccount}
            billLayout={billLayout}
            setBillLayout={setBillLayout}
          />
          <div className='footer'>
            <button
              className='button edit'
              onClick={() => setPreviewing(false)}
            >
              Back to Edit
            </button>
            <button
              className='button draft'
              onClick={() => {
                formik.setFieldValue("saveAsDraft", true);
                formik.handleSubmit();
              }}
            >
              Save as Draft
            </button>
            <button className='button download' onClick={handleDownloadPdf}>
              Download PDF
            </button>
            <button
              className='button process'
              onClick={() => {
                formik.setFieldValue("saveAsDraft", false);
                formik.handleSubmit();
              }}
            >
              Create Bill
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
