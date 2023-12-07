import { Link } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
// import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
const baseUrl = "http://127.0.0.1:8000/api";

function AddCourse() {
  const [cats, setCats] = useState([]);
  const [courseData, setCourseData] = useState({
    category: '',
    title: '',
    description: '',
    f_img: '',
    techs: '',
  });
  const teacherId = localStorage.getItem('teacherId');
  console.log(teacherId);

  // Fetch categories when the page loads
  useEffect(() => {
    try {
      axios.get(baseUrl + '/category/')
        .then((res) => {
          setCats(res.data);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChange = (event) => {
    setCourseData({
      ...courseData,
      [event.target.name]: event.target.value
    });
  }

  const handleFileChange = (event) => {
    setCourseData({
      ...courseData,
      [event.target.name]: event.target.files[0]
    });
  }

  const formSubmit = () => {
    const formData = new FormData();
    formData.append('category', courseData.category);
    formData.append('teacher',teacherId);
    formData.append('title', courseData.title);
    formData.append('description', courseData.description);
    if (courseData.f_img instanceof File || courseData.f_img instanceof Blob) {
      formData.append('featured_img', courseData.f_img, courseData.f_img.name);}
    
    formData.append('techs', courseData.techs);

    try {
      axios.post(baseUrl + '/course/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
        .then((res) => {
          // console.log(res.data);
          window.location.href = '/add-course';
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

        <div className='col-9'>
          <div className='card'>
            <h5 className='card-header'>Add Course</h5>
            <div className='card-body'>
              <form>
                   
              <div className="mb-3">
                        <label for="category" className="form-label">Category</label>
                        <select name="category" value={courseData.category} onChange={handleChange} onClick={handleChange} className='form-control'> 
                        {cats.map((category,index)=>{return <option key={index} value={category.id}>{category.title}</option>})}
                        </select>


                   </div>

                   <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type='text' onChange={handleChange} name='title' id="title" className='form-control'/>
                   </div> 


                   <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type='text' onChange={handleChange} name="description" id='description' className='form-control'/>
                   </div> 

                   <div className="mb-3">
                        <label htmlFor="video" className="form-label">Featured Image</label>
                        <input type='file' onChange={handleFileChange} name='f_img' id="video" className='form-control'/>
                   </div> 

                   <div className="mb-3">
                        <label htmlFor="techs" className="form-label">Technologies</label>
                        <input type='text' onChange={handleChange} name='techs' id='techs' placeholder='Php, Python, Javascript' className='form-control'/>
                   </div>

                   <button type="button" onClick={formSubmit}   className='btn btn-primary'>Submit</button> 
              </form>  
            </div>  
          </div>
        </div>
      </div>       
    </div>

);
}

export default AddCourse;



