import React from 'react';
import Sidebar from './component/leftSidebar';
import { Outlet } from 'react-router-dom';

const SidebarLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </div>
      {/* <SearchBar/>  */}
    </div>
  );
};

export default SidebarLayout;