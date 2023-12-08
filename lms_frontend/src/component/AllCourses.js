import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const baseUrl = "http://127.0.0.1:8000/api";
  
function AllCourses(){
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
    return(
        <div className="container mt-4">
        {/*Latest Courses*/}
        <h3 className="pb-1 mb-4">Latest courses </h3>
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

       

        {/*Pagination Start */} {/*Pagination Start */}
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                <a className="page-link">Previous</a>
                </li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                <a className="page-link" href="#">Next</a>
                </li>
            </ul>
            </nav>
        {/*End*/}
    </div> 
    );
}

export default AllCourses;