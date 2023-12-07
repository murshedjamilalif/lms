import { Link } from 'react-router-dom';
import TeacherSidebar from './Teacher/TeacherSidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';


const baseUrl = "http://127.0.0.1:8000/api";

function CourseChapters() {
    const [chapterData, setchapterData] = useState([]);
    const { course_id } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            axios.get(baseUrl + '/course-chapters/' + course_id)
                .then((res) => {
                    setchapterData(res.data);
                    setLoading(false); // Set loading to false when data is received
                })
                .catch((error) => {
                    console.error("Error fetching chapters:", error);
                    setLoading(false); // Set loading to false on error too
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    //Delete Data
    const handleDeleteClick  = (chapter_id) =>{
            Swal.fire({
            title: 'Confirm',
            text: 'Are you sure you want to delete this Video ?',
            icon: 'info',
            confirmButtonText: 'Continue',
            showCancelButton: true
        }). then ((result)=>{
            if (result.isConfirmed){
                try{
                    axios.delete(baseUrl+'/chapter/'+chapter_id)
                    .then ((res)=>{
                        window.location.reload();
                    //     console.log(res);
                    //     settotalResult(res.data.length);
                    //     setchapterData(res.data);
                    });
                    // Swal.fire('success', "Data has been deleted .");
                }catch(error){
                    Swal.fire('Error', "Data hasn't been deleted .");
            }
            }else{
                Swal.fire('Error', "Data hasn't been deleted .");
            }
        })
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
                            <table className='table table-bordered'>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Video</th>
                                        <th>Remarks</th>
                                        <th colSpan="2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {chapterData.map((chapter, index) => (
                                        <tr key={index}>
                                            <td><Link to='#'>{chapter.title}</Link></td>
                                            <td>
                                                <video controls width="250">
                                                    <source src={chapter.video} type="video/webm" />
                                                    <source src={chapter.video} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            </td>
                                            <td>
                                                {chapter.remarks} 
                                            </td>

                                            <td>
                                                <Link to ={'/edit-chapter/'+chapter.id} className='btn btn-sm text-white btn-info'>
                                                    <i class="bi bi-pencil-square"></i>
                                                </Link>

                                            
                                                <button onClick={()=>handleDeleteClick(chapter.id)} className="btn btn-sm btn-danger ms-1">
                                                    <i class="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default CourseChapters;
