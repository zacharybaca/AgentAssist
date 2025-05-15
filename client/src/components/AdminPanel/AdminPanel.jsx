import './admin-panel.css';
import { Link } from 'react-router-dom';

const AdminPanel = () => {

    return (
        <div id="admin-panel-container">
            <Link to ='/admin/articles'>Admin Articles View</Link>
            <Link to='/admin/articles/create'>Create An Article</Link>
        </div>
    )
}

export default AdminPanel;
