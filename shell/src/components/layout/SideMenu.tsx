
import React from 'react';
import { Link } from 'react-router-dom';
import './SideMenu.scss';

const SideMenu: React.FC = () => {
  return (
    <div className="side-menu">
      <h3>Navigation</h3>
      <ul>
        <li>
          <Link to="/">App 1 - Dashboard</Link>
        </li>
        <li>
          <Link to="/list">App 1 - List</Link>
        </li>
        <li>
          <Link to="/app2">App 2</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
