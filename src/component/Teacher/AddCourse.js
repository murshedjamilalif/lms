import  TeacherSidebar  from './TeacherSidebar';  // Make sure to import TeacherSidebar from the correct path

function ProfileSettings() {
    return (
        <div className="container mt-4">
            <div className="row">
                <aside className='col-md-3'>
                    <TeacherSidebar />
                </aside>
                <section className='col-md-9'>
                    <div className='card'>
                        <h5 className='card-header'>Add Course</h5>
                        <div className='card-body'>
                            <div className="mb-3 row">
                                <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                                <div className="col--10">
                                    <input type="text" readOnly className="form-control" id="title" />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                                <div className="col--10">
                                    <textarea className='form-control' id="description" rows="4"></textarea>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="courseVideo" className="col-sm-2 col-form-label">Course Video</label>
                                <div className="col--10">
                                    <input type="file" className="form-control" id="courseVideo" />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="technologies" className="col-sm-2 col-form-label">Technologies</label>
                                <div className="col--10">
                                    <textarea className='form-control' id="technologies" rows="4"></textarea>
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <div className="col offset-sm">
                                    <button className='btn btn-primary'>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default ProfileSettings;

