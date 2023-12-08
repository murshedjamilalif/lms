import { useParams } from "react-router-dom"; //known as hook
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
const baseUrl = "http://127.0.0.1:8000/api";

function CourseDetail(){ 
    const [userLogin, setuserLogin] = useState([]);
    const [enrollmentStatus, setEnrollmentStatus] = useState('');

    let {course_id}=useParams();

    useEffect(()=>{
  
    const studentLoginStatus = localStorage.getItem('studentLoginStatus');
    if (studentLoginStatus === 'true') {
            setuserLogin('success');
        }
        

    });

    // Fetch courses when the page loads

    const [courseData, setcourseData]=useState([]);

    const teacherId = localStorage.getItem('teacherId');
    console.log(teacherId)
    // Fetch courses when the page loads
    useEffect(() => {
        try {
        axios.get(baseUrl + '/teacher-courses-detail/'+course_id)
            .then((res) => {
                setcourseData(res.data);
            })
            .catch((error) => {
            console.error("Error fetching categories:", error);
            });
        } catch (error) {
        console.log(error);
        }
    }, []);

    const enrollCourse=()=>{
            const studentId = localStorage.getItem('studentId');
            const formData = new FormData();
            formData.append('course', course_id);
            formData.append('student', studentId);
        
            try {
              axios.post(baseUrl + '/student-enroll-course/', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                }
              })
                .then((res) => {
                  console.log(res.data);
    
                });
            } catch (error) {
              console.log(error);
            }

            setEnrollmentStatus('Enrolled');
           
    
    }
    const teachername= courseData.teacher?.full_name;
    console.log(teachername);

    return(
        <div className="container mt-3">
            <div className="row">
                
                <div className="col-4">
                    <img src={courseData.featured_img} className="img-thumbnail" alt="Course Image"/>
                </div>
                
                <div className="col-8">
                    <h3>{courseData.title}</h3>
                    <p>Using a combination of grid and utility classes, cards can be made horizontal in a mobile-friendly and responsive way. In the example below, we remove the grid gutters with .g-0 and use .col-md-* classes to make the card horizontal at the md breakpoint. Further adjustments may be needed depending on your card content.</p>
                    <p className="fw-bold">Course By: {teachername}</p>
                    <p className="fw-bold">Duration: 3 hrs 30 mins</p>
                    <p className="fw-bold">Totall Enrolled: 456 Students</p>
                    <p className="fw-bold">Rating: 4.5/5</p>
                    {
            userLogin === 'success' && !enrollmentStatus && (
              <p>
                <button className='btn btn-success' type='button' onClick={enrollCourse}>Enroll in this course</button>
              </p>
            )
          }
          {
            userLogin !== 'success' && (
              <p style={{ color: 'red' }}>
                <Link to='/user-login'>Please login to enroll in this course</Link>
              </p>
            )
          }
          {enrollmentStatus && <p style={{ color: 'green' }}>{enrollmentStatus}</p>}
                </div>
            </div>
            {/*Course Videos */}
            <div className="card mt-4">
                <h5 className="card-header">
                    Course Videos
                </h5>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        Introduction
                        <span className="float-end">
                        <span className="me-5">1 Hour 30 mins</span>
                        <button className="btn btn-sm btn-danger"  data-bs-toggle="modal" data-bs-target="#videoModal1"><i className="bi bi-play-btn-fill"></i></button>
                        </span>
                        {/*Video modal Start */}
                        <div className="modal fade" id="videoModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-xl">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Video 1</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                    <div className="ratio ratio-16x9">
                                    <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=1Jbv_YAbD3SW23c-&amp;start=1"  title="YouTube video" allowfullscreen></iframe>
                                    </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        {/*Video modal End */}
                    </li>
                    <li className="list-group-item">
                        Introduction
                        <span className="float-end">
                        <span className="me-5">1 Hour 30 mins</span>
                        <button className="btn btn-sm btn-danger"><i className="bi bi-play-btn-fill"></i></button>
                        </span>
                    </li>
                    <li className="list-group-item">
                        Introduction
                        <span className="float-end">
                        <span className="me-5">1 Hour 30 mins</span>
                        <button className="btn btn-sm btn-danger"><i className="bi bi-play-btn-fill"></i></button>
                        </span>
                    </li>
                    <li className="list-group-item">
                        Introduction
                        <span className="float-end">
                        <span className="me-5">1 Hour 30 mins</span>
                        <button className="btn btn-sm btn-danger"><i className="bi bi-play-btn-fill"></i></button>
                        </span>
                    </li>
                    <li className="list-group-item">
                        Introduction
                        <span className="float-end">
                        <span className="me-5">1 Hour 30 mins</span>
                        <button className="btn btn-sm btn-danger"><i className="bi bi-play-btn-fill"></i></button>
                        </span>
                    </li>

                    <li className="list-group-item">
                        Introduction
                        <span className="float-end">
                        <span className="me-5">1 Hour 30 mins</span>
                        <button className="btn btn-sm btn-danger"><i className="bi bi-play-btn-fill"></i></button>
                        </span>
                    </li>
                </ul>
            </div>

            <h3 className="pb-1 mb-4 mt-5">Reated courses </h3>
            <div className="row">
                <div className="col-md-3">
                <div className="card">
                    <Link to="/detail/1"><img src="/logo512.png" className="card-img-top" alt="..."/></Link>
                    <div className="card-body">
                        <h5 className="card-title"><Link to="/detail/1">Course title</Link></h5>
                        {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                        {/* <a href="#" className="btn btn-primary">Details</a> */}
                    </div>
                    </div>
                </div>
                <div className="col-md-3">
                <div className="card">
                    <Link to="/detail/1"><img src="/logo512.png" className="card-img-top" alt="..."/></Link>
                    <div className="card-body">
                        <h5 className="card-title"><Link to="/detail/1">Course title</Link></h5>
                        {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
                        {/* <a href="#" className="btn btn-primary">Details</a> */}
                    </div>
                    </div>
                </div>
                </div>
        </div>
    )
}

export default CourseDetail;