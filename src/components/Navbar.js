import { NavLink } from 'react-router-dom';
import logo from "../images/login.png";
import { useAuth } from '../AuthContext';

function Navbar() {

  
  const { logout } = useAuth();

  return (
    <>
      <header>
        <div className="container">
          <div className="Logo">
            <img src={logo}/>
            <h2>SnapUp</h2>
          </div>
          <nav> 
            <ul>
              <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')} >
                  <i className="fa fa-chart-simple"></i> Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to="/users" className={({ isActive }) => (isActive ? 'active' : '')} >
                  <i className="fa fa-user"></i> Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/devices/" className={({ isActive }) => (isActive ? 'active' : '')} >
                  <i className="fa fa-list"></i> Device Listing
                </NavLink>
              </li>
              <li>
                <NavLink to="/notifications"  className={({ isActive }) => (isActive ? 'active' : '')} >
                  <i className="fa fa-bell"></i> Notifications
                </NavLink>
              </li> 
            </ul>
            <ul className="navBottom"> 
              <li>
                <NavLink to="/settings" className={({ isActive }) => (isActive ? 'active' : '')} >
                  <i className="fa fa-cog"></i> Settings
                </NavLink>
              </li>
              <li>
                <NavLink onClick={logout}
                  to="/logout" className={({ isActive }) => (isActive ? 'active' : '')}  >
                  <i className="fa fa-right-from-bracket"></i> Logout
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navbar;
