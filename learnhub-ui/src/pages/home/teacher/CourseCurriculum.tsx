import Swal from "sweetalert2";
import { API } from "../../../api";
import { toast } from "react-toastify";
import { Course, useUser } from "../../../hooks/useUser";
import { Link } from "react-router-dom";
import { CourseStatus, MaterialType } from "../../../types/Course";

interface CourseCurriculumProps {
    course: Course;
}

export default function CourseCurriculum({ course }: CourseCurriculumProps) {
    const { refreshUser } = useUser();

    const handleAddChapter = async () => {
        const { value } = await Swal.fire({
            title: "Chapter name",
            input: "text",
            inputPlaceholder: "Enter chapter name...",
            showCancelButton: true
        });
        if (value) {
            try {
                const resp = await API.post(`/chapters/${course.id}`, { title: value });
                if (resp.status === 200) {
                    toast.success("Add chapter successfully");
                    refreshUser();
                }
            } catch (err) {
                toast.error("Add chapter failed");
            }
        }
    };

    const handleRemoveChapter = async (id: number) => {
        const { isConfirmed } = await Swal.fire({
            title: "Delete Chapter",
            text: "All lessons will be deleted. This operation can't be rolled back.",
            icon: "warning",
            showCancelButton: true
        });
        if (isConfirmed) {
            try {
                const resp = await API.delete(`/chapters/${id}`);
                if (resp.status === 200) {
                    toast.success("Remove chapter successfully");
                    refreshUser();
                }
            } catch (err) {
                toast.error("Remove chapter failed");
            }
        }
    };

    const handleRemoveMaterial = async (id: number) => {
        const { isConfirmed } = await Swal.fire({
            title: "Delete Lesson",
            text: "This operation can't be rolled back.",
            icon: "warning",
            showCancelButton: true
        });
        if (isConfirmed) {
            try {
                const resp = await API.delete(`/courses/chapters/materials/${id}`);
                if (resp.status === 200) {
                    toast.success("Remove lesson successfully");
                    refreshUser();
                }
            } catch (err) {
                toast.error("Remove lesson failed");
            }
        }
    };

    return (
        <div className="m-b30 mt-4" id="curriculum">
            <div className="ml-auto d-flex justify-content-between align-items-center">
                <h4>Curriculum</h4>
                {course.status === CourseStatus.PRIVATE && (
                    <button onClick={handleAddChapter} type="button" className="btn">
                        Add chapter
                    </button>
                )}
            </div>
            <ul className="curriculum-list">
                {course.status === CourseStatus.PRIVATE
                    ? course.chapters.map((c) => (
                          <li key={c.id} className="card my-3">
                              <div className="card-header">
                                  <div className="ml-auto d-flex justify-content-between align-items-center">
                                      <h5>{c.name}</h5>
                                      <div>
                                          <Link
                                              to={`/home/courses/${course.id}/chapters/${c.id}/lessons/add`}
                                              className="btn">
                                              Add Lesson
                                          </Link>
                                          <Link
                                              to={`/home/courses/${course.id}/chapters/${c.id}/quizes/add`}
                                              className="btn ml-3">
                                              Add Quiz
                                          </Link>
                                          <button
                                              onClick={() => handleRemoveChapter(c.id)}
                                              type="button"
                                              className="btn red ml-3">
                                              Remove Chapter
                                          </button>
                                      </div>
                                  </div>
                              </div>
                              <ul className="card-body">
                                  {c.materials.map((m) => (
                                      <li key={m.id} className="card">
                                          <div className="card-text">
                                              <div className="ml-auto d-flex justify-content-between align-items-center">
                                                  <div className="curriculum-list-box">
                                                      <i
                                                          className={`${m.type === MaterialType.LESSON ? `ti-video-clapper` : `ti-help`} mr-2`}
                                                      />
                                                      {m.name}
                                                  </div>
                                                  <div>
                                                      <Link to={`/home/courses/materials/${m.id}`} className="btn">
                                                          Update
                                                      </Link>
                                                      <button
                                                          onClick={() => handleRemoveMaterial(m.id)}
                                                          type="button"
                                                          className="btn red ml-3">
                                                          Remove
                                                      </button>
                                                  </div>
                                              </div>
                                          </div>
                                      </li>
                                  ))}
                              </ul>
                          </li>
                      ))
                    : course.chapters.map((c) => (
                          <li key={c.id}>
                              <h5>{c.name}</h5>
                              <ul>
                                  {c.materials.map((m) => (
                                      <li key={m.id}>
                                          <div className="curriculum-list-box">
                                              <i
                                                  className={`
                                                      ${m.type === MaterialType.LESSON ? `ti-video-clapper` : `ti-help`} mr-2
                                                  `}
                                              />
                                              <Link to={`/home/courses/materials/${m.id}`}>{m.name}</Link>
                                          </div>
                                      </li>
                                  ))}
                              </ul>
                          </li>
                      ))}
            </ul>
        </div>
    );
}
