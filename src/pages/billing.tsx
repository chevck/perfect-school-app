import axios from "axios";
import { useEffect, useState } from "react";
import {
  formatMoney,
  getStatusFamily,
  getUserData,
  getUserRole,
  handleError,
  NAIRA_SYMBOL,
} from "../utils";
import moment from "moment";
import { LoadingPage } from "../components/loadingPage";
import type { BillingStats } from "../utils/types";
import {
  CheckCircle,
  CircleCheck,
  Clock,
  DollarSign,
  FileDown,
  FileText,
  Pencil,
  PlusIcon,
  Trash2,
} from "lucide-react";
import { CustomModal } from "../components/custom-modal";
import { toast } from "sonner";
import { BillLayout } from "../components/bill-layout";
import html2pdf from "html2pdf.js";

interface Filters {
  searchText: string;
  paymentStatus: string;
  term: string;
}

export function Billing() {
  const [bills, setBills] = useState<any[]>([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [stats, setStats] = useState<BillingStats>({
    totalBillsAmount: 0,
    totalPaidBillsAmount: 0,
    totalUnpaidBillsAmount: 0,
    totalBillsCount: 0,
  });
  const [pageLoading, setPageLoading] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    searchText: "",
    paymentStatus: "",
    term: "",
  });
  const userData = getUserData();
  const [selectedBill, setSelectedBill] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const userRole = getUserRole();

  const handleDeleteBill = async (billId: string) => {
    try {
      setLoading(true);
      await axios.delete(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/bill/${billId}`,
        {
          headers: { Authorization: `Bearer ${userData?.token}` },
        }
      );
      toast.success("Bill deleted successfully");
      setPageLoading(true);
      setSelectedBill(null);
      document.getElementById("close-custom-modal-delete-bill-modal")?.click();
      handleGetBills();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetBills = async () => {
    try {
      const paramsString = new URLSearchParams(filters as any).toString();
      setPageLoading(true);
      const [response, statsResponse] = await Promise.all([
        axios.get(
          `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/bills?${paramsString}`,
          {
            headers: { Authorization: `Bearer ${userData?.token}` },
          }
        ),
        axios.get(
          `${
            import.meta.env.VITE_GLOBAL_BE_URL
          }/psa/bills/stats?${paramsString}`,
          {
            headers: { Authorization: `Bearer ${userData?.token}` },
          }
        ),
      ]);
      setBills(response.data.bills);
      setStats(statsResponse.data);
    } catch (error) {
      handleError(error);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    handleGetBills();
  }, [filters]);

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

  useEffect(() => {
    const debouncedSearch = setTimeout(() => {
      setFilters({ ...filters, searchText: debouncedSearchTerm });
    }, 500);
    return () => clearTimeout(debouncedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  const handleMarkAsPaid = async (billId: string) => {
    try {
      setPageLoading(true);
      await axios.put(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/bill/${billId}`,
        {
          paidStatus: true,
        },
        { headers: { Authorization: `Bearer ${userData?.token}` } }
      );
      toast.success("Bill marked as paid successfully");
      setSelectedBill(null);
      handleGetBills();
    } catch (error) {
      handleError(error);
    } finally {
      setPageLoading(false);
    }
  };

  return pageLoading ? (
    <LoadingPage />
  ) : (
    <div className='billing psa_d_page'>
      <h2 className='title'>Billing Management</h2>
      <div className='card-set'>
        <div className='card_o'>
          <div className='card-content'>
            <h5>Total Bills</h5>
            <h2>{formatMoney(stats.totalBillsCount)}</h2>
          </div>
          <div className='card-icon-identifier'>
            <FileText width={24} height={24} />
          </div>
        </div>
        <div className='card_o'>
          <div className='card-content'>
            <h5>Total Amount</h5>
            <h2>
              {NAIRA_SYMBOL}
              {formatMoney(stats.totalBillsAmount)}
            </h2>
          </div>
          <div className='card-icon-identifier amount'>
            <DollarSign width={24} height={24} />
          </div>
        </div>
        <div className='card_o'>
          <div className='card-content'>
            <h5>Paid Bills</h5>
            <h2>
              {NAIRA_SYMBOL}
              {formatMoney(stats.totalPaidBillsAmount)}
            </h2>
          </div>
          <div className='card-icon-identifier'>
            <CheckCircle width={24} height={24} />
          </div>
        </div>
        <div className='card_o'>
          <div className='card-content'>
            <h5>Unpaid Bills</h5>
            <h2>
              {NAIRA_SYMBOL}
              {formatMoney(stats.totalUnpaidBillsAmount)}
            </h2>
          </div>
          <div className='card-icon-identifier pending'>
            <Clock color='#111a2d' width={24} height={24} />
          </div>
        </div>
      </div>
      <div className='filter_create_section'>
        <div className='filter'>
          <input
            className='form-control'
            type='text'
            placeholder='Search by bill number'
            value={debouncedSearchTerm}
            onChange={(e) => setDebouncedSearchTerm(e.target.value)}
          />
          <select
            className='form-select'
            value={filters.paymentStatus}
            onChange={(e) =>
              setFilters({ ...filters, paymentStatus: e.target.value })
            }
          >
            <option selected disabled>
              Select Payment Status
            </option>
            <option value=''>All</option>
            <option value='Paid'>Paid</option>
            <option value='Unpaid'>Unpaid</option>
          </select>
          <select
            className='form-select'
            value={filters.term}
            onChange={(e) => setFilters({ ...filters, term: e.target.value })}
          >
            <option selected disabled>
              Select Term
            </option>
            <option value=''>All</option>
            <option value='First Term'>First Term</option>
            <option value='Second Term'>Second Term</option>
            <option value='Third Term'>Third Term</option>
          </select>
        </div>
        <button
          className='button create-bill'
          onClick={() => (window.location.href = "/create-bill")}
        >
          <PlusIcon width={14} height={14} />
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
                <tr key={bill._id}>
                  <td>BILL {bill.billId}</td>
                  <td>{bill.studentId.name}</td>
                  <td>{bill.term}</td>
                  <td>
                    {NAIRA_SYMBOL}
                    {formatMoney(bill.totalAmount ?? 0)}
                  </td>
                  <td>{moment(bill.createdAt).format("Do MMM, YYYY")}</td>
                  <td>
                    <span
                      className={`custom-status ${getStatusFamily(
                        bill.isDraft
                          ? "draft"
                          : bill.paidStatus
                          ? "paid"
                          : "unpaid"
                      )}`}
                    >
                      {bill.isDraft
                        ? "Draft"
                        : bill.paidStatus
                        ? "Paid"
                        : "Unpaid"}
                    </span>
                  </td>
                  <td className='actions'>
                    <button
                      className='button icon-button'
                      onClick={() => {
                        setSelectedBill(bill);
                        handleDownloadPdf();
                      }}
                    >
                      <FileDown color='#111a2d' />
                    </button>
                    {!bill.paidStatus &&
                      !bill.isDraft &&
                      userRole === "admin" && (
                        <button
                          className='button icon-button'
                          onClick={() => {
                            setSelectedBill(bill);
                            handleMarkAsPaid(bill._id);
                          }}
                        >
                          <CircleCheck color='#16a34a' />
                        </button>
                      )}
                    <button
                      className='button icon-button'
                      onClick={() =>
                        (window.location.href = `/edit-bill/${bill._id}`)
                      }
                    >
                      <Pencil color='#111a2d' />
                    </button>
                    <button
                      className='button icon-button'
                      data-bs-toggle='modal'
                      data-bs-target='#delete-bill-modal'
                      onClick={() => setSelectedBill(bill)}
                    >
                      <Trash2 color='#ef4444' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyBillContainer />
      )}
      <CustomModal
        loading={loading}
        title='Delete Bill'
        description='Are you sure you want to delete this bill?'
        onConfirm={() => {
          handleDeleteBill(selectedBill._id);
        }}
        onCancel={() => setSelectedBill(null)}
        confirmButtonText='Delete'
        customId='delete-bill-modal'
      />
      <div style={{ display: "none" }}>
        <BillLayout
          billItems={selectedBill?.billItems ?? []}
          billingInformation={selectedBill ?? {}}
          primaryBankAccount={selectedBill?.accountDetails ?? {}}
          billLayout={selectedBill?.billLayoutType ?? "standard"}
          setBillLayout={() => {}}
        />
      </div>
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
