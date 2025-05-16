import './admin-panel.css';
import { Link } from 'react-router-dom';

const AdminPanel = () => {

    return (
        <div id="admin-panel-container">
            <Link to ='/admin/articles'>Manage Articles</Link>
            <Link to='/admin/articles/create'>Create An Article</Link>
            <Link to='/admin/categories'>Manage Categories</Link>
            <Link to='/admin/categories/create'>Create A Category</Link>
        </div>
    )
}

export default AdminPanel;
