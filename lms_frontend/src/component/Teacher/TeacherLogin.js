import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
const baseUrl = "http://127.0.0.1:8000/api";

function TeacherLogin() {
    const [teacherLoginData, setteacherLoginData] = useState({
        'username': '',
        'password': ''
    });
    const[errormsg,seterrormsg] =useState('');
    const handleChange = (event) => {
        setteacherLoginData({
            ...teacherLoginData,
            [event.target.name]: event.target.value
        });
    }

    const submitForm = async (event) => {
        event.preventDefault();  // Prevent the default form submission

        const teacherFormData = new FormData();
        teacherFormData.append("username", teacherLoginData.username);
        teacherFormData.append("password", teacherLoginData.password);

        try {
            const response = await axios.post(baseUrl +'/teacher-login', teacherFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Server Response:', response.data);
            if (response.data.bool === true) {
                localStorage.setItem('teacherLoginStatus', true);
                localStorage.setItem('teacherId', response.data.teacher_id);
                window.location.href = '/teacher-dashboard';
            }else{
                seterrormsg('Invalid credentials');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const teacherLoginStatus = localStorage.getItem('teacherLoginStatus')
    if (teacherLoginStatus === 'true') {
        window.location.href = '/teacher-dashboard';
    }

    return (
        <div className="container mt-4 ">
            <div className="row">
                <div className='col-6 offset-3'>
                    <div className="card">
                        <h5 className="card-header">Teacher Login</h5>
                        <div className="card-body">
                            {errormsg && <p className='text-danger'>{errormsg}</p>}
                            <form onSubmit={submitForm}>
                                <div className="m-3">
                                    <label htmlFor="exampleUserName" className="form-label">Username</label>
                                    <input
                                        value={teacherLoginData.username}
                                        onChange={handleChange}
                                        type="text"
                                        className="form-control"
                                        id="exampleUserName"
                                        name="username"
                                    />
                                </div>
                                <div className="m-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input
                                        value={teacherLoginData.password}
                                        onChange={handleChange}
                                        type="password"
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        name="password"
                                    />
                                </div>
                                <div className="m-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                                </div>
                                <div className='m-3'><button onClick={submitForm} type="submit" className="btn btn-primary">Login</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherLogin;
