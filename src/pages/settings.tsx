/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { currencyOptions, getUserData, handleError } from "../utils";
import axios from "axios";
import { toast } from "sonner";
import { LoadingPage } from "../components/loadingPage";
import { PlusIcon, StarIcon, Trash2Icon } from "lucide-react";
import { BankAccountModal } from "../components/bank-account-modal";
import { AddSubjectModal } from "../components/AddSubjectModal";
import { AddClassModal } from "../components/AddClassModal";
import useSchoolStore from "../dataset/school.store";
import type { SchoolStore } from "../dataset/store.types";
import type { School } from "../utils/types";

export function Settings() {
  const userData = getUserData();
  const [activeTab, setActiveTab] = useState("billing");
  const [editBody, setEditBody] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [school, setSchool] = useState<School | null>(null);

  const { setSchool: setSchoolStore } = useSchoolStore() as SchoolStore;

  useEffect(() => {
    handleGetSchool();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (school && school.schoolBankAccounts) {
      setEditBody({
        ...editBody,
        schoolBankAccounts: school.schoolBankAccounts,
      });
    }
    setSchoolStore(school);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [school]);

  const handleGetSchool = async () => {
    try {
      setPageLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/school`,
        { headers: { Authorization: `Bearer ${userData?.token}` } }
      );
      setSchool(response.data.school);
    } catch (error) {
      console.log("error", error);
      toast.error(
        "Something went wrong with getting school data. Please try again later"
      );
    } finally {
      setPageLoading(false);
    }
  };

  const handleUpdateSchool = async (customEditBody?: Record<string, any>) => {
    console.log({ customEditBody }, "this is what to edit");
    if (Object.keys(editBody).length === 0)
      return toast.error("Please try to edit something");
    try {
      setLoading(true);
      console.log({ editBody }, "this is what to edit");
      const update = await axios.put(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/school/edit`,
        {
          ...customEditBody,
          ...editBody,
        },
        {
          headers: {
            Authorization: `Bearer ${userData?.token}`,
          },
        }
      );
      setEditBody({});
      setSchool({ ...school, ...update.data.schoolUpdate });
      toast.success("School updated successfully");
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // TODO: Create a place where the SCHOOL inputs the subjects they do - as opposed to having static subjects

  return pageLoading ? (
    <LoadingPage />
  ) : (
    <div className='settings-page psa_d_page'>
      <div className='header_'>
        <div className='title-container'>
          <h2 className='title'>Settings</h2>
          <h6>Manage your school profile and preferences</h6>
        </div>
      </div>
      <div className='settings-container'>
        <div className='tablist'>
          <div
            className={`tab-item ${activeTab === "general" ? "active" : ""}`}
            onClick={() => setActiveTab("general")}
          >
            General
          </div>
          <div
            className={`tab-item ${activeTab === "billing" ? "active" : ""}`}
            onClick={() => setActiveTab("billing")}
          >
            Billing
          </div>
          <div
            className={`tab-item ${activeTab === "academic" ? "active" : ""}`}
            onClick={() => setActiveTab("academic")}
          >
            Academic
          </div>
          <div
            className={`tab-item ${
              activeTab === "notifications" ? "active" : ""
            }`}
            onClick={() => setActiveTab("notifications")}
          >
            Notifications
          </div>
          <div
            className={`tab-item ${activeTab === "appearance" ? "active" : ""}`}
            onClick={() => setActiveTab("appearance")}
          >
            Appearance
          </div>
        </div>
        <div className='content-body'>
          {activeTab === "general" && <GeneralTab />}
          {activeTab === "billing" && (
            <BillingTab
              editBody={editBody}
              setEditBody={setEditBody}
              school={school}
            />
          )}
          {activeTab === "academic" && (
            <AcademicTab
              handleUpdateSchool={handleUpdateSchool}
              school={school}
            />
          )}
          {activeTab === "notifications" && <NotificationsTab />}
          {activeTab === "appearance" && <AppearanceTab />}
        </div>
        <div className='footer'>
          <button
            className='button cancel'
            id='cancel-button'
            onClick={() => {
              setEditBody({});
            }}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className='button save'
            onClick={handleUpdateSchool}
            disabled={
              loading ||
              Object.keys(editBody).length === 0 ||
              !editBody?.schoolBankAccounts?.length ||
              JSON.stringify(editBody.schoolBankAccounts) ===
                JSON.stringify(school?.schoolBankAccounts)
            }
            id='save-changes-button'
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function GeneralTab() {
  return <div>General</div>;
}

function BillingTab({
  editBody,
  setEditBody,
  school,
}: {
  editBody: Record<string, any>;
  setEditBody: (body: Record<string, any>) => void;
  school: any;
}) {
  const displayBankAccounts = [...(editBody.schoolBankAccounts ?? [])];

  const handleDeleteBankAccount = async (id: number) => {
    const accounts = displayBankAccounts.filter((b: any) => b.id !== id);
    setEditBody({ ...editBody, schoolBankAccounts: accounts });
  };

  const handleSetPrimary = (accountNumber: number, bankName: string) => {
    const accounts = displayBankAccounts.map((b: any) => {
      if (b.accountNumber === accountNumber && b.bankName === bankName) {
        return { ...b, isPrimary: true };
      }
      return { ...b, isPrimary: false };
    });
    setEditBody({ ...editBody, schoolBankAccounts: accounts });
  };

  return (
    <div>
      <p className='title'>Billing Settings</p>
      <p className='sub-title'>
        Configure your school&apos;s billing preferences and payment
        information.
      </p>
      <div className='section'>
        <div className='row'>
          <div className='col-12 col-md-6'>
            <div className='form-group'>
              <label htmlFor='currency'>Currency</label>
              <select
                name='currency'
                id='currency'
                className='form-control'
                value={editBody.currency || school.currency}
                onChange={(e) =>
                  setEditBody({ ...editBody, currency: e.target.value })
                }
              >
                <option disabled selected>
                  Select Currency
                </option>
                {currencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className='section'>
        <div className='section-header'>
          <h3 className='section-title'>Bank Account Information</h3>
          <button
            className='button add'
            data-bs-toggle='modal'
            data-bs-target='#bank-account-modal'
          >
            <PlusIcon />
            Add Account
          </button>
        </div>
        <div className='section-content'>
          {displayBankAccounts.map((bank: any, key: number) => (
            <div className='bank-account' key={key}>
              <div className='bank-name'>
                <h5 className='bank-name_'>{bank.bankName}</h5>
                {bank.isPrimary && (
                  <button className='button primary'>
                    <StarIcon />
                    Primary
                  </button>
                )}
              </div>
              <div className='account-details-container'>
                <div className='account-details'>
                  <div className='account-item'>
                    <h4 className='account-title'>Account Name</h4>
                    <p className='account-number'>{bank.accountName}</p>
                  </div>
                  <div className='account-item'>
                    <h4 className='account-title'>Account Number</h4>
                    <p className='account-number'>{bank.accountNumber}</p>
                  </div>
                  <div className='account-item'>
                    <h4 className='account-title'>Account Name</h4>
                    <p className='account-number'>{bank.accountType}</p>
                  </div>
                  <div className='account-item'>
                    <h4 className='account-title'>Account Number</h4>
                    <p className='account-number'>{bank.accountNumber}</p>
                  </div>
                </div>
                <div className='account-actions'>
                  {!bank.isPrimary && (
                    <button
                      className='button primary'
                      onClick={() =>
                        handleSetPrimary(bank.accountNumber, bank.bankName)
                      }
                    >
                      Set Primary
                    </button>
                  )}
                  <button
                    className='button primary'
                    onClick={() => handleDeleteBankAccount(bank.id)}
                  >
                    <Trash2Icon />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {displayBankAccounts.length === 0 && (
            <p className='no-bank-accounts'>
              No bank accounts found. Please add a bank account to get started.
            </p>
          )}
        </div>
      </div>
      <BankAccountModal setEditBody={setEditBody} />
    </div>
  );
}

function AcademicTab({
  handleUpdateSchool,
  school,
}: {
  handleUpdateSchool: (customEditBody?: Record<string, any>) => void;
  school: any;
}) {
  const handleAddSubject = (subject: { name: string; description: string }) => {
    if (school.subjects.some((s: any) => s.name === subject.name)) {
      toast.error("Subject already exists. Put in a new subject");
      return;
    }
    handleUpdateSchool({
      subjects: [...(school.subjects ?? []), subject],
    });
    document.getElementById("close-add-subject-modal")?.click();
  };

  const handleAddClass = (className: string) => {
    console.log({ className });
    if (school.classes.some((c: any) => c.className === className)) {
      toast.error("Class already exists. Put in a new class");
      return;
    }
    handleUpdateSchool({
      classes: [...(school.classes ?? []), { className }],
    });
    document.getElementById("close-add-class-modal")?.click();
  };

  const handleDeleteClass = (name: string) => {
    handleUpdateSchool({
      classes: school.classes.filter((c: any) => c.className !== name),
    });
  };

  const handleDeleteSubject = (name: string) => {
    handleUpdateSchool({
      subjects: school.subjects.filter((subject: any) => subject.name !== name),
    });
  };

  console.log({ school });

  return (
    <div className='academic-settings'>
      <p className='title'>Academic Settings</p>
      <p className='sub-title'>
        Configure your school&apos;s academic year, grading system, and other
        academic preferences.
      </p>
      <div className='section'>
        <p className='title'>Subjects</p>
        <p className='sub-title'>Manage the subjects offered by your school.</p>
        <button
          className='button add'
          data-bs-toggle='modal'
          data-bs-target='#add-subject-modal'
        >
          <PlusIcon />
          Add Subject
        </button>
        <div className='subject-list'>
          {school.subjects.map((subject: any, key: number) => (
            <div className='subject-item' key={key}>
              <div className='subject-item-details'>
                <div>
                  <h5>Title</h5>
                  <p>{subject.name}</p>
                </div>
                <div>
                  <h5>Description</h5>
                  <p>{subject.description || "-"}</p>
                </div>
              </div>
              <button
                className='button delete'
                onClick={() => handleDeleteSubject(subject.name)}
              >
                <Trash2Icon />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className='section'>
        <p className='title'>Classes</p>
        <p className='sub-title'>Manage the classes you have in your school.</p>
        <button
          className='button add'
          data-bs-toggle='modal'
          data-bs-target='#add-class-modal'
        >
          <PlusIcon />
          Add Class
        </button>
        <div className='subject-list'>
          {school.classes.map((c: any, key: number) => (
            <div className='subject-item' key={key}>
              <div className='subject-item-details'>
                <div>
                  <h5>Class Name</h5>
                  <p>{c.className}</p>
                </div>
                <div>
                  <h5>Teacher</h5>
                  <p>{c.teacher?.name || "-"}</p>
                </div>
              </div>
              <button
                className='button delete'
                onClick={() => handleDeleteClass(c.className)}
              >
                <Trash2Icon />
              </button>
            </div>
          ))}
        </div>
      </div>
      <AddSubjectModal handleAddSubject={(s) => handleAddSubject(s)} />
      <AddClassModal handleAddClass={(c) => handleAddClass(c)} />
    </div>
  );
}

function NotificationsTab() {
  return <div>Notifications</div>;
}

function AppearanceTab() {
  return <div>Appearance</div>;
}
