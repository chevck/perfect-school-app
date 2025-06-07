import axios from "axios";
import { getUserData, handleError } from "../utils";
import { useEffect, useState } from "react";
import type { DashboardData } from "../utils/types";
import {
  AlertTriangle,
  BookOpen,
  DollarSign,
  Info,
  Trash,
  UserPen,
  UserPlus,
  Users,
} from "lucide-react";
import moment from "moment";
import { LoadingPage } from "../components/loadingPage";

export function Dashboard() {
  const userData = getUserData();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );

  const handleFetchDashboardData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/dashboard`,
        { headers: { Authorization: `Bearer ${userData?.token}` } }
      );
      setDashboardData(response.data);
    } catch (error) {
      handleError(error);
    }
    setIsPageLoading(false);
  };

  useEffect(() => {
    handleFetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isPageLoading ? (
    <LoadingPage />
  ) : (
    <div className="dashboard psa_d_page">
      <h2 className="title">Dashboard</h2>
      <div className="card-set">
        {userData?.role === "admin" && (
          <div className="card_o">
            <div className="card-content">
              <h5>Total Students</h5>
              <h2>{dashboardData?.totalStudents}</h2>
              <p className="metrics">
                <span>100%</span> from last month
              </p>
            </div>
            <div className="card-icon-identifier">
              <Users />
            </div>
          </div>
        )}
        <div className="card_o">
          <div className="card-content">
            <h5>Total Teachers</h5>
            <h2>{dashboardData?.totalTeachers}</h2>
            <p className="metrics">
              <span>100%</span> from last month
            </p>
          </div>
          <div className="card-icon-identifier teacher">
            <UserPen />
          </div>
        </div>
        {userData?.role === "admin" && (
          <div className="card_o">
            <div className="card-content">
              <h5>Pending Fees</h5>
              <h2>{dashboardData?.pendingFees ?? 0}</h2>
              <p className="metrics">
                <span>100%</span> from last month
              </p>
            </div>
            <div className="card-icon-identifier fees">
              <DollarSign />
            </div>
          </div>
        )}
        <div className="card_o">
          <div className="card-content">
            <h5>Upcoming Exams</h5>
            <h2>{dashboardData?.upcomingExams ?? 0}</h2>
            <p className="metrics">
              <span>100%</span> from last month
            </p>
          </div>
          <div className="card-icon-identifier exams">
            <BookOpen />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8 col-12">
          <div className="card-set">
            <div className="card-big">
              <div className="card__header">
                <h3 className="title">Recent Activity</h3>
                <button>View All</button>
              </div>
              <div className="activity-list">
                {dashboardData?.logs.map((el) => (
                  <div className="activity" key={el._id}>
                    <div className={`card-icon-identifier ${el.actionType}`}>
                      {el.actionType === "create" && <UserPlus />}
                      {el.actionType === "update" && <UserPen />}
                      {el.actionType === "delete" && <Trash />}
                      {el.actionType === "info" && <Info />}
                      {el.actionType === "extra" && <AlertTriangle />}
                    </div>
                    <div>
                      <h5>{el.action}</h5>
                      <p>{moment(el.createdAt).calendar()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-12">
          <div className="card-set">
            <div className="card-big">
              <div className="card__header">
                <h3 className="title">Recent Activity</h3>
                <button>View All</button>
              </div>
              <div className="activity-list">
                {[1, 2, 3, 4].map((el) => (
                  <div className="activity" key={el}>
                    <div className="card-icon-identifier">
                      <i className="bi bi-people"></i>
                    </div>
                    <div>
                      <h5>New student Emma Wilson has been registered</h5>
                      <p>Today at 10:20am</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
