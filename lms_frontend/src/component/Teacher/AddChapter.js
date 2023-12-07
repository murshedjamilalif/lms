import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import { useState } from 'react';
import axios from 'axios';

const baseUrl = "http://127.0.0.1:8000/api";

function AddChapter() {
    const [chapterData, setChapterData] = useState({
        title: '',
        description: '',
        video: '',
        remarks: '',
    });

    const handleChange = (event) => {
        setChapterData({
            ...chapterData,
            [event.target.name]: event.target.value
        });
    }

    const handleFileChange = (event) => {
        setChapterData({
            ...chapterData,
            [event.target.name]: event.target.files[0]
        });
    }

    const { course_id } = useParams();

    const formSubmit = () => {
        const formData = new FormData();

        formData.append('course', course_id);
        formData.append('title', chapterData.title);
        formData.append('description', chapterData.description);
        // Check if chapterData.video is a File or Blob
        if (chapterData.video instanceof File || chapterData.video instanceof Blob) {
            formData.append('video', chapterData.video, chapterData.video.name);
        }
        formData.append('remarks', chapterData.remarks);

        try {
            axios.post(`${baseUrl}/chapter/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
                .then((res) => {
                    // console.log(res.data);
                    window.location.href = `/add-chapter/${course_id}`;
                })
                .catch((error) => {
                    console.error('Error uploading file:', error);
                });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="row">
                <aside className='col-md-3'>
                    <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                    <div className='card'>
                        <h5 className='card-header'>Add Chapter</h5>
                        <div className='card-body'>
                            <div className="mb-3 row">
                                <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                                <div className="col-10">
                                    <input type="text" onChange={handleChange} name='title' id="title" className="form-control" />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                                <div className="col-10">
                                    <textarea className='form-control' onChange={handleChange} name='description' id="description" rows="4"></textarea>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="courseVideo" className="col-sm-2 col-form-label">Course Video</label>
                                <div className="col-10">
                                    <input type="file" id="courseVideo" onChange={handleFileChange} name='video' className="form-control" />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="technologies" className="col-sm-2 col-form-label">Remarks</label>
                                <div className="col-10">
                                    <textarea className='form-control' onChange={handleChange} name='remarks' placeholder='This video is focused on basic introduction' rows="4"></textarea>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <div className="col offset-sm">
                                    <button type='button' onClick={formSubmit} className='btn btn-primary'>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default AddChapter;
