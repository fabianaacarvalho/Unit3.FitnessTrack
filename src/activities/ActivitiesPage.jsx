import { useAuth } from "../auth/AuthContext";
import { useState } from "react";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";

export default function ActivitiesPage() {
  const { token } = useAuth();
  const isLoggedin = !!token;
  const [deleteErrors, setDeleteErrors] = useState({});

  const {
    data: activities,
    loading,
    error,
  } = useQuery("/activities", "activities");

  const {
    mutate: addActivity,
    data: addedActivity,
    loading: adding,
    error: addError,
  } = useMutation("POST", "/activities", ["activities"]);

  const {
    mutate: deleteActivity,
    data: deletedActivity,
    loading: deleting,
    error: deleteError,
  } = useMutation("DELETE", "/activities", ["activities"]);

  const handleAddActivity = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const description = formData.get("description");
    addActivity({ name, description });
    e.target.reset();
  };

  console.log("Activities:", activities);

  const handleDeleteActivity = async (id) => {
    try {
      await deleteActivity(null, {
        url: `/activities/${id}`,
      });
      setDeleteErrors((prev) => ({ ...prev, [id]: null }));
    } catch (err) {
      setDeleteErrors((prev) => ({
        ...prev,
        [id]: "You must be the same user who created this activity to perform this action.",
      }));
    }
  };

  return (
    <>
      <h1>Activities</h1>
      <ul>
        {activities &&
          activities.map((activity) => (
            <li key={activity.id}>
              {activity.name}
              {isLoggedin && (
                <button
                  onClick={() => handleDeleteActivity(activity.id)}
                  disabled={deleting}
                >
                  {deleteErrors[activity.id] || "Delete"}
                </button>
              )}
            </li>
          ))}
      </ul>

      {isLoggedin && (
        <>
          <form onSubmit={handleAddActivity}>
            <label>
              Name: <input name="name" required />
            </label>
            <label>
              Description: <input name="description" required />
            </label>
            <br />
            <button>Add activity</button>
          </form>
        </>
      )}
    </>
  );
}
