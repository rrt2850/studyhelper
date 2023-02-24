
import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';


import { FaGem, FaHeart } from 'react-icons/fa';

import "../App.scss"






function SidebarHolder() {

  return (
    <div className="Sidebar-Holder">
      <Sidebar>
        <Menu iconShape="square">
          <MenuItem icon={<FaGem />}>Dashboard</MenuItem>
          <SubMenu title="Components" icon={<FaHeart />}>
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>

    </div>
  );
}

export default SidebarHolder

