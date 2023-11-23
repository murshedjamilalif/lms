import {Link} from 'react-router-dom';

function Header() {
  const teacherLoginStatus = localStorage.getItem('teacherLoginStatus');
  const studentLoginStatus = localStorage.getItem('studentLoginStatus');
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" to="/">Learning Management System</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className='navbar-nav ms-auto'>          
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                <Link className="nav-link active" to="all-courses">Courses</Link>
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Teacher
                </a>
                <ul className="dropdown-menu">

                  {teacherLoginStatus!='true' &&

                  <><li><Link className="dropdown-item"  to="/teacher-login">Login</Link></li>
                  <li><Link className="dropdown-item"  to="/teacher-register">Register</Link>
                  </li></>}
                  
                  {teacherLoginStatus=='true' && <><li><Link className="dropdown-item"  to="/teacher-logout">Logout</Link></li>
                  <li><Link className="dropdown-item"  to="/teacher-dashboard">Dashboard</Link></li></>}
                </ul>
              </li>
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  User
                </a>
                
                <ul className="dropdown-menu">
                  {studentLoginStatus!=='true' &&
                  <>
                  <Link className="dropdown-item"  to="/user-login">Login</Link>
                  <Link className="dropdown-item"  to="/user-register">Register</Link>
                  </>
                  }
                  {studentLoginStatus==='true' &&
                  <>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item"  to="/user-dashboard">Dashboard</Link></li>
                  <li><Link className="dropdown-item"  to="/user-logout">Logout</Link></li>
                  </>
                  }
                </ul>
              </li>
                
                {/* <Link className="nav-link" to="/about">About Us</Link> */}
                </div> 
          </div>
        </div>
      </nav>
    );
  }
  
  export default Header;