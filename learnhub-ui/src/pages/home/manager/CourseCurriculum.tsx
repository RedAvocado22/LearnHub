import { Course } from "../../../hooks/useUser";
import { Link } from "react-router-dom";
import { CourseStatus, MaterialType } from "../../../types/Course";

interface CourseCurriculumProps {
    course: Course;
}

export default function CourseCurriculum({ course }: CourseCurriculumProps) {
    return (
        <div className="m-b30 mt-4" id="curriculum">
            <div className="ml-auto d-flex justify-content-between align-items-center">
                <h4>Curriculum</h4>
            </div>
            <ul className="curriculum-list">
                {course.status === CourseStatus.PENDING
                    ? course.chapters.map((c) => (
                          <li key={c.id} className="card my-3">
                              <div className="card-header">
                                  <div className="ml-auto d-flex justify-content-between align-items-center">
                                      <h5>{c.name}</h5>
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
                                                      <Link
                                                          to={`/manager/courses/${course.id}/materials/${m.id}`}
                                                          className="btn">
                                                          View
                                                      </Link>
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
                                              <Link to={`/manager/courses/${course.id}/materials/${m.id}`}>
                                                  {m.name}
                                              </Link>
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
