import {Link} from 'react-router-dom';
import {useEffect,useState} from 'react';
import axios from 'axios';
const baseUrl="http://127.0.0.1:8000/api/teacher/";
function TeacherRegister(){
    const [teacherData, setteacherData]=useState({'full_name': '',
    'email': '',
    'username': '',
    'password': '',
    'skills': '',
    'status':''
});

//change element value
const handleChange=(event)=>{
    setteacherData({
        ...teacherData,
        [event.target.name]:event.target.value

    });
    
}
//submit form
const submitForm= async(event)=>{
    
    const teacherFormData=new FormData();
    teacherFormData.append("full_name",teacherData.full_name)
    teacherFormData.append("email",teacherData.email)
    teacherFormData.append("password",teacherData.password)
    teacherFormData.append("skills",teacherData.skills)
    teacherFormData.append("username",teacherData.username)
    
    try{
        const response = await axios.post(baseUrl, teacherFormData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Server Response:', response.data);
        {setteacherData({'full_name': '',
        'email': '',
        'username': '',
        'password': '',
        'skills': '',
        'status':'success'});
    }; 


    }catch(error){
        console.error('Error:', error);
        setteacherData({'status':'error'})
    };



};
const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
if (teacherLoginStatus=='true'){
    window.location.href='/teacher-dashboard'
}
    return(
        <div className="container mt-4 ">
            <div className="row">
                <div className='col-6 offset-3'>
                    {teacherData.status=='success' && <p className='text-success'>Thanks for registrating</p>}
                    {teacherData.status=='error' && <p className='text-danger'>Something went wrong</p>}
                    <div className="card">
                        <h5 className="card-header">Teacher Registration</h5>
                        <div className="card body">
                        <form>
                        <div className="m-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Full Name</label>
                            <input value ={teacherData.full_name} onChange={handleChange} name="full_name" type ="text" className="form-control" />
                        </div>
                        <div className="m-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                            <input value ={teacherData.email} onChange={handleChange} name="email" type="email" className="form-control" id="exampleInputEmail1" 
                            aria-describedby="emailHelp" />
                        </div>
                        <div className="m-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                            <input value ={teacherData.username} onChange={handleChange} name='username' type="text" className="form-control" />
                        </div>
                        <div className="m-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input value ={teacherData.password} onChange={handleChange} name='password' type="password" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="m-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Skills</label>
                            <textarea value ={teacherData.skills} onChange={handleChange} name='skills' className='form-control'></textarea>
                            <div id="emailHelp" className="form-text">Php, Python, Javascript, etc
                            </div>
                        </div>
                        
                        <div className='m-3'><button onClick={submitForm} type="submit" className="btn btn-primary">Register</button></div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherRegister;