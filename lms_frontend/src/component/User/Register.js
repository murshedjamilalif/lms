import { useEffect, useState } from 'react';
import axios from 'axios';

const baseUrl = "http://127.0.0.1:8000/api/student/";

function Register() {
    const [studentData, setStudentData] = useState({
        'full_name': '',
        'email': '',
        'username': '',
        'password': '',
        'interested_categories': '', // Changed from 'interest' to 'interests' for consistency
        'status': ''
    });

    // Change element value
    const handleChange = (event) => {
        setStudentData({
            ...studentData,
            [event.target.name]: event.target.value
        });
    }
    // End

    // Submit Form
    const submitForm = async (event) => {
        const studentFormData = new FormData();
        studentFormData.append("full_name", studentData.full_name);
        studentFormData.append("email", studentData.email);
        studentFormData.append("username", studentData.username);
        studentFormData.append("password", studentData.password);
        studentFormData.append("interested_categories", studentData.interested_categories); // Changed from 'interest' to 'interests' for consistency

        try {
            const response = await axios.post(baseUrl, studentFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Server Response:', response.data);
            setStudentData({
                'full_name': '',
                'email': '',
                'username': '',
                'password': '',
                'interested_categories': '', // Changed from 'interest' to 'interests' for consistency
                'status': 'success'
            });
        } catch (error) {
            console.error('Error:', error);
            setStudentData({ 'status': 'error' });
        }
    };
    // End

    useEffect(() => {
        document.title = "Student register";
    }, []);

    return (
        <div className="container mt-4">
            <div className="row">
                <div className='col-6 offset-3'>
                    
                    {studentData.status=='success' && <p className='text-success'>Thanks for your Registration</p>}
                    {studentData.status=='error' && <p className='text-danger'>Something wrong happened</p>}
                    <div className="card">
                        <h5 className="card-header">User Registration</h5>
                        <div className="card-body">
                            <div className="m-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Full Name</label>
                                <input value ={studentData.full_name} type="text" name='full_name' onChange={handleChange} className="form-control" />
                            </div>
                            <div className="m-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                <input value ={studentData.email} type="email" name='email' onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div className="m-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                                <input value ={studentData.username} type="text" name='username' onChange={handleChange} className="form-control" />
                            </div>
                            <div className="m-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input value ={studentData.password} type="password" name='password' onChange={handleChange} className="form-control" id="exampleInputPassword1" />
                            </div>
                            <div className="m-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Interests</label>
                                <textarea value ={studentData.interested_categories} name='interested_categories' onChange={handleChange} className='form-control'></textarea>
                                <div id="emailHelp" className="form-text">Php, Python, Javascript, etc</div>
                            </div>
                            <div className='m-3'>
                                <button type="submit" onClick={submitForm} className="btn btn-primary">Register</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
