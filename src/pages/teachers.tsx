import axios from "axios";
import { CreateTeacher } from "../components/create-teacher";
import { useEffect, useState } from "react";
import { getUserData, handleError } from "../utils";
import type { Teacher } from "../utils/types";
import { CustomModal } from "../components/custom-modal";
import { toast } from "sonner";
import { UserPen } from "lucide-react";
import useTeachersStore from "../dataset/teachers.store.tsx";
import type { TeacherStore } from "../dataset/store.types.tsx";

export function Teachers() {
  const { teachers, fetchTeachersApi, removeTeacher, updateTeacher } =
    useTeachersStore() as TeacherStore;
  const userData = getUserData();
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  useEffect(() => {
    if (!teachers.length) fetchTeachersApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteTeacher = async (teacherId: string) => {
    if (!teacherId) return toast.error("Invalid teacher ID");
    try {
      await axios.delete(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/teacher-delete/${teacherId}`,
        { headers: { Authorization: `Bearer ${userData?.token}` } }
      );
      toast.success("Teacher deleted successfully");
      document
        .getElementById(`close-custom-modal-delete-teacher-modal`)
        ?.click();
      removeTeacher(teacherId);
    } catch (error) {
      handleError(error);
    }
  };

  console.log({ selectedTeacher });

  const handleEditTeacher = async (
    teacherId: string,
    body: Partial<Teacher>,
    customId: string
  ) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_GLOBAL_BE_URL}/psa/teacher/${teacherId}`,
        body,
        { headers: { Authorization: `Bearer ${userData?.token}` } }
      );
      toast.success("Teacher deactivated successfully");
      document.getElementById(`close-custom-modal-${customId}`)?.click();
      updateTeacher({
        ...selectedTeacher,
        ...body,
      } as Teacher);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="teachers psa_d_page">
      <div className="header_">
        <h2 className="title">Teachers</h2>
        <button
          className="button"
          data-bs-toggle="modal"
          data-bs-target="#create-teacher-modal"
        >
          Invite Teacher
        </button>
      </div>
      <div className="teachers-table table-responsive">
        {!teachers.length ? (
          <div className="empty-state">
            <div className="icon-wrapper">
              <UserPen />
            </div>
            <h3>No teachers found</h3>
            <p>Add a new teacher to get started</p>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Class</th>
                <th scope="col">Subject</th>
                <th scope="col">Phone</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{teacher?.name || "N/A"}</td>
                  <td>{teacher?.email || "N/A"}</td>
                  <td>{teacher?.class || "N/A"}</td>
                  <td>{teacher?.subject || "N/A"}</td>
                  <td>{teacher?.phone || "N/A"}</td>
                  <td>
                    <span
                      className={`custom-status ${
                        teacher?.status === "active" ? "success" : "info"
                      }`}
                    >
                      {teacher?.status}
                    </span>
                  </td>
                  <td className="actions">
                    <span className="edit">Edit</span>
                    {teacher?.status !== "pending" ? (
                      <>
                        {teacher?.status === "active" ? (
                          <span
                            className="deactivate"
                            data-bs-toggle="modal"
                            data-bs-target="#remove-teacher-modal"
                            onClick={() => setSelectedTeacher(teacher)}
                          >
                            Deactivate
                          </span>
                        ) : (
                          <span
                            className="activate"
                            data-bs-toggle="modal"
                            data-bs-target="#activate-teacher-modal"
                            onClick={() => setSelectedTeacher(teacher)}
                          >
                            Activate
                          </span>
                        )}
                      </>
                    ) : null}
                    <span
                      className="delete"
                      data-bs-toggle="modal"
                      data-bs-target="#delete-teacher-modal"
                      onClick={() => setSelectedTeacher(teacher)}
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <CreateTeacher handleGetTeachers={fetchTeachersApi} />
        <CustomModal
          title="Deactivate Teacher"
          description="Are you sure you want to deactivate this teacher?"
          onConfirm={() =>
            handleEditTeacher(
              selectedTeacher?._id || "",
              {
                status: "inactive",
              },
              "remove-teacher-modal"
            )
          }
          onCancel={() => setSelectedTeacher(null)}
          confirmButtonText="Deactivate"
          customId="remove-teacher-modal"
        />
        <CustomModal
          title="Activate Teacher"
          description="Are you sure you want to activate this teacher?"
          onConfirm={() =>
            handleEditTeacher(
              selectedTeacher?._id || "",
              { status: "active" },
              "activate-teacher-modal"
            )
          }
          onCancel={() => setSelectedTeacher(null)}
          confirmButtonText="Activate"
          customId="activate-teacher-modal"
        />
        <CustomModal
          title="Delete Teacher"
          description="Are you sure you want to delete this teacher?"
          onConfirm={() => handleDeleteTeacher(selectedTeacher?._id || "")}
          onCancel={() => setSelectedTeacher(null)}
          confirmButtonText="Delete"
          customId="delete-teacher-modal"
        />
      </div>
    </div>
  );
}
