import { Link } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
const baseUrl = "http://127.0.0.1:8000/api";

function TeacherCourses() {
    const [courseData, setCourseData]=useState([]);

    const teacherId = localStorage.getItem('teacherId');
    console.log(teacherId)
    // Fetch courses when the page loads
    useEffect(() => {
        try {
        axios.get(baseUrl + '/teacher-courses/5')
            .then((res) => {
                setCourseData(res.data);
            })
            .catch((error) => {
            console.error("Error fetching categories:", error);
            });
        } catch (error) {
        console.log(error);
        }
    }, []);


    console.log(courseData);

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className='col-md-3'>
                    <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                    <div className='card'>
                        <h5 className='card-header'>My Courses</h5>
                        <div className='card-body'>
                        <table class='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Total Enrolled</th>
                                    <th colspan="2">Action</th>

                                    
                                </tr>
                            </thead>
                            <tbody>
                                {courseData.map((course,index)=> 
                                <tr>
                                    <td>{course.title}</td>
                                    <td><img src={course.featured_img} width="88" className='rounded' alt={course.title} /></td>
                                    <td><Link to="/">123</Link></td>
                                    <td>
                                        <button className="btn btn-danger btn-sm">Delete</button>
                                        <Link class="btn btn-success btn-sm ms-2 " to={'/add-chapter/'+ course.id}>Add Chapter</Link>
                                    </td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default TeacherCourses;
