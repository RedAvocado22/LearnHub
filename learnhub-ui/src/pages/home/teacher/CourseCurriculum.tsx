import Swal from "sweetalert2";
import { API } from "../../../api";
import { toast } from "react-toastify";
import { Course, useUser } from "../../../hooks/useUser";
import { Link } from "react-router-dom";
import { CourseStatus } from "../../../types/Course";

enum LessonType {
    VIDEO,
    QUIZ
}

interface CourseCurriculumProps {
    course: Course;
}

const chapters = [
    {
        id: 1,
        title: "First Level",
        lesson: [
            { id: 1, type: LessonType.VIDEO, title: "Introduction to UI Design" },
            { id: 2, type: LessonType.VIDEO, title: "User Research and Design" },
            { id: 3, type: LessonType.QUIZ, title: "Evaluating User Interfaces Part 1" }
        ]
    },
    {
        id: 2,
        title: "Second Level",
        lesson: [
            { id: 4, type: LessonType.VIDEO, title: "Prototyping and Design" },
            { id: 5, type: LessonType.VIDEO, title: "UI Design Capstone" },
            { id: 6, type: LessonType.QUIZ, title: "Evaluating User Interfaces Part 2" }
        ]
    },
    {
        id: 3,
        title: "Final",
        lesson: [
            { id: 7, type: LessonType.QUIZ, title: "Final Test" },
            { id: 8, type: LessonType.QUIZ, title: "Online Test" }
        ]
    }
];

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
                const resp = await API.post(`/courses/${course.id}/chapters`, { name: value });
                if (resp.status === 200) {
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
                const resp = await API.delete(`/courses/chapters/${id}`);
                if (resp.status === 200) {
                    toast.success("Remove chapter successfully");
                    refreshUser();
                }
            } catch (err) {
                toast.error("Remove chapter failed");
            }
        }
    };

    const handleRemoveLesson = async (id: number) => {
        const { isConfirmed } = await Swal.fire({
            title: "Delete Lesson",
            text: "This operation can't be rolled back.",
            icon: "warning",
            showCancelButton: true
        });
        if (isConfirmed) {
            try {
                const resp = await API.delete(`/courses/chapters/lessons/${id}`);
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
                    ? chapters.map((c) => (
                          <li key={c.id} className="card my-3">
                              <div className="card-header">
                                  <div className="ml-auto d-flex justify-content-between align-items-center">
                                      <h5>{c.title}</h5>
                                      <div>
                                          <button type="button" className="btn">
                                              Add Lesson
                                          </button>
                                          <button type="button" className="btn ml-3">
                                              Add Quiz
                                          </button>
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
                                  {c.lesson.map((l) => (
                                      <li key={l.id} className="card">
                                          <div className="card-text">
                                              <div className="ml-auto d-flex justify-content-between align-items-center">
                                                  <div className="curriculum-list-box">
                                                      <i
                                                          className={`${l.type === LessonType.VIDEO ? `ti-video-clapper` : `ti-help`} mr-2`}
                                                      />
                                                      {l.title}
                                                  </div>
                                                  <div>
                                                      <Link to={`/home/courses/lessons/${l.id}`} className="btn">
                                                          Update
                                                      </Link>
                                                      <button
                                                          onClick={() => handleRemoveLesson(l.id)}
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
                    : chapters.map((c) => (
                          <li key={c.id}>
                              <h5>{c.title}</h5>
                              <ul>
                                  {c.lesson.map((l) => (
                                      <li key={l.id}>
                                          <div className="curriculum-list-box">
                                              <i
                                                  className={`
                                                      ${l.type === LessonType.VIDEO ? `ti-video-clapper` : `ti-help`} mr-2
                                                  `}
                                              />
                                              <Link to={`/home/courses/lessons/${l.id}`}>{l.title}</Link>
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
