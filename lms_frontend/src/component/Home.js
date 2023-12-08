import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import AllCourses from './AllCourses';
import PopularCourses from './PopularCourses';
import PopularTeachers from './PopularTeachers';
const baseUrl = "http://127.0.0.1:8000/api";
function Home() {
    const [courseData, setcourseData]=useState([]);

    // Fetch courses when the page loads
    useEffect(() => {
        try {
        axios.get(baseUrl + '/course/')
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

    const [teacherData, setteacherData]=useState([]);

    // Fetch courses when the page loads
    useEffect(() => {
        try {
        axios.get(baseUrl + '/teacher/')
            .then((res) => {
                setteacherData(res.data);
            })
            .catch((error) => {
            console.error("Error fetching categories:", error);
            });
        } catch (error) {
        console.log(error);
        }
    }, []);
    console.log(teacherData);
    return (
        <div className="container mt-4">
            {/*Latest Courses*/}
            <h3 className="pb-1 mb-4">Latest courses <Link to="/all-courses" className="float-end">See All</Link></h3>
            <div className="row">
      {courseData.map(course => (
        <div key={course.id} className="col-md-3">
          <div className="card">
            <Link to={`/detail/${course.id}`}>
              <img src={course.featured_img} className="card-img-top" alt={course.title} />
            </Link>
            <div className="card-body">
              <h5 className="card-title"><Link to={`/detail/${course.id}`}>{course.title}</Link></h5>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>

                
            {/*End Latest Courses */}
            {/*Popular Courses*/}
            <h3 className="pb-1 mb-4 mt-5">Popular courses<Link to="/popular-courses" className="float-end">See All</Link></h3>
            <div className="row">
      {courseData.map(course => (
        <div key={course.id} className="col-md-3">
          <div className="card">
            <Link to={`/detail/${course.id}`}>
              <img src={course.featured_img} className="card-img-top" alt={course.title} />
            </Link>
            <div className="card-body">
              <h5 className="card-title"><Link to={`/detail/${course.id}`}>{course.title}</Link></h5>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>

            {/*End Popular Courses */}
            {/*Popular Teachers*/}
            <h3 className="pb-1 mb-4 mt-5">Popular Teachers<Link to="/popular-teachers" className="float-end">See All</Link></h3>
            {teacherData.map(teacher => (
        <div key={teacher.id} className="col-md-3">
          <div className="card">
            <Link to={`/detail/${teacher.id}`}>
            </Link>
            <div className="card-body">
              <h5 className="card-title">{teacher.full_name}</h5>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>

            
                           
    );
  }
  
  export default Home;
  