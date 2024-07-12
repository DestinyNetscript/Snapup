import LifetimeDevices from '../components/lifetimedevices/LifetimeDevices'; 
import LifetimeUser from '../components/lifetimeuser/LifetimeUser'; 
import ActiveUsers from '../components/activeuser/ActiveUsers'; 
import Users from '../components/users/Users'; 
import Posts from '../components/posts/Posts'; 
import Todo from '../components/posts/Todo'; 

function MainContent() {
  return (
    <>
      <div className="mainContent">
        <div className="content2">
          <div className="lifetimeDevices">
            <ActiveUsers/>
          </div>
          <div className="lifetimeUser">
            <LifetimeUser/>
          </div>
          <div className="lifetimeDevices">
            <LifetimeDevices/>
          </div>
        </div>
        <div className="content_table">
          <Users hideActions={true} />
        </div> 
        <div className="contentt">
          <div className="cleft todo"> 
            <Todo/> 
          </div> 
        </div>
      </div>    
    </>
  );
}
export default MainContent; 