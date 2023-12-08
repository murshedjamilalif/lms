import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = "http://127.0.0.1:8000/api";

function Login() {
    const [studentLoginData, setStudentLoginData] = useState({
        'username': '',
        'password': ''
    });

    const [errorMsg, setErrorMsg] = useState(null);

    const handleChange = (event) => {
        setStudentLoginData({
            ...studentLoginData,
            [event.target.name]: event.target.value
        });
    }

    const submitForm = async (event) => {
        event.preventDefault();

        const studentFormData = new FormData();
        studentFormData.append("username", studentLoginData.username);
        studentFormData.append("password", studentLoginData.password);

        try {
            const response = await axios.post(baseUrl + '/student-login', studentFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Server Response:', response.data);
            if (response.data.bool === true) {
                localStorage.setItem('studentLoginStatus', true);
                localStorage.setItem('studentId', response.data.studentId);
                window.location.href = '/user-dashboard';
            }
        } catch (error) {
            console.log(error);
            setErrorMsg("Login failed. Please check your credentials.");
        }
    };

    const studentLoginStatus = localStorage.getItem('studentLoginStatus');
    if (studentLoginStatus === 'true') {
        window.location.href = '/user-dashboard';
    }

    useEffect(() => {
        document.title = "Student Login";
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className='col-6 offset-3'>
                    <div className="card">
                        <h5 className="card-header">User Login</h5>
                        <div className="card-body">
                            {errorMsg && <p className='text-danger'>{errorMsg}</p>}
                            <form>
                                <div className="m-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                                    <input type="text" value={studentLoginData.username} name='username' onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                </div>
                                <div className="m-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                    <input type="password" value={studentLoginData.password} name='password' onChange={handleChange} className="form-control" id="exampleInputPassword1" />
                                </div>
                                <div className='m-3'>
                                    <button type="submit" onClick={submitForm} className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
