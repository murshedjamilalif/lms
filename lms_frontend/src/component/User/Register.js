import {Link} from 'react-router-dom';

function Register(){
    return(
        <div className="container mt-4 ">
            <div className="row">
                <div className='col-6 offset-3'>
                    <div className="card">
                        <h5 className="card-header">User Registration</h5>
                        <div className="card body">
                        <form>
                        <div className="m-3">
                            <label for="exampleInputEmail1" className="form-label">Full Name</label>
                            <input type="email" className="form-control" />
                        </div>
                        <div className="m-3">
                            <label for="exampleInputEmail1" className="form-label">Email</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" 
                            aria-describedby="emailHelp" />
                        </div>
                        <div className="m-3">
                            <label for="exampleInputEmail1" className="form-label">Username</label>
                            <input type="email" className="form-control" />
                        </div>
                        <div className="m-3">
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="m-3">
                            <label for="exampleInputEmail1" className="form-label">Interests</label>
                            <textarea className='form-control'></textarea>
                            <div id="emailHelp" class="form-text">Php, Python, Javascript, etc
                            </div>
                        </div>
                        
                        <div className='m-3'><button type="submit" className="btn btn-primary">Register</button></div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;