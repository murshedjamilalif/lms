import { Link } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';

function ProfileSetting() {
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className='col-md-3'>
                    <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                    <div className='card'>
                        <h5 className='card-header'>Profile Settings</h5>
                        <div className='card-body'>
                            <div className="mb-3 row">
                                <label htmlFor="fullName" className="col-sm-2 col-form-label">Full Name</label>
                                <div className="col-sm-10">
                                    <input type="text" readOnly className="form-control" id="fullName" />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input type="text" readOnly className="form-control" id="email" />
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label htmlFor="profilePhoto" className="col-sm-2 col-form-label">Profile Photo</label>
                                <div className="col-sm-10">
                                    <input type="file" className="form-control" id="profilePhoto" />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10">
                                    <input type="password" className="form-control" id="inputPassword" />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label for="exampleInputEmail1" className="form-label">Skills</label>
                                <textarea className='form-control'></textarea>
                                <div id="emailHelp" class="form-text">Php, Python, Javascript, etc
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <div className="col-sm-10 offset">
                                    <button className='btn btn-primary'>Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default ProfileSetting;
