import user from "../../assets/images/user.png";
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import useFetchProducts from '../../hooks/useFetchProducts';

function Header() {
  const { userData } = useAuth();
  const { loading, userx, error, setUserx, setError } = useFetchProducts();
  return (
    <>
      <div className="header">
        <div className="headerSearch">
          <h3>Welcome <span>{userData.firstname} {userData.lastname}</span></h3>
        </div>
        <div className="user">
          <div className="notifications">
            <NavLink to="/notifications"><i className="fa fa-bell"></i></NavLink>
          </div>
          <div className="userLink">
            <NavLink to="/settings"><img src={user} alt="" /></NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
export default Header; 