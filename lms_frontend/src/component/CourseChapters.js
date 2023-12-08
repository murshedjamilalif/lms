import { Link } from 'react-router-dom';
import TeacherSidebar from './Teacher/TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'
const baseUrl = "http://127.0.0.1:8000/api";

function CourseChapters(){
    const [chapterData, setchapterData]=useState([]);
    const {course_id} =useParams();
    
    // Fetch courses when the page loads
    useEffect(() => {
        try {
        axios.get(baseUrl + '/course-chapters/'+course_id)
            .then((res) => {
                setchapterData(res.data);
            })
            .catch((error) => {
            console.error("Error fetching categories:", error);
            });
        } catch (error) {
        console.log(error);
        }
    }, []);
    const handleDeleteClick=(chapter_id)=> {
       Swal.fire ({
            title: "Confirm",
            text : "Are you sure you want to delete this chapter?",
            icon : 'info',
            ConfirmButtonText: 'Continue',
            showCancelButton: true
        }).then((result)=>{
            if (result.isConfirmed){
                try {
                    axios.delete(baseUrl+'/chapter/'+chapter_id)
                .then ((res)=>{
                    // Swal.fire('success','Chapter has been deleted');
                    window.location.reload();
                    // console.log(res)
                    // settotalResult(res.data.length);
                    // setchapterData(res.data);
                });
            
        }catch(error){
            Swal.fire('error', 'Chapter has not been deleted');
        }
            }else{
                Swal.fire('error', 'Chapter has not been deleted');
            }

        });
    }
    return (
    
        <div className="container mt-4">
            <div className="row">
                <aside className='col-md-3'>
                    <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                    <div className='card'>
                        <h5 className='card-header'>All chapters</h5>
                        <div className='card-body'>
                        <table class='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Video</th>
                                    <th>Remarks</th>
                                    <th colspan="2">Action</th>

                                    
                                </tr>
                            </thead>
                            <tbody>
                                {chapterData.map((chapter,index)=> 
                                <tr>
                                    <td><Link to='#'>{chapter.title}</Link></td>
                                    {/* {<td><video controls width="250">
                                                <source src={chapter.video.url} type="video/webm" />

                                                <source src={chapter.video.url} type="video/mp4" />
                                                </video></td> */}
                                                <td></td>
                                    <td><Link to="/">{chapter.remarks}</Link></td>
                                    <td>
                                        <button onClick={()=>handleDeleteClick(chapter.id)} className="btn btn-danger">Delete</button>
                                        <button className="btn btn-info ms-1">Edit</button>
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
    )
}
export default CourseChapters;