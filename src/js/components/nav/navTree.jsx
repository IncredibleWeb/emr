import React from "react";

import NavTreeItem from "./navTreeItem";

const NavTree = ({ nav, onLinkClick }) => {
  let children = [];
  if (nav.children) {
    children = nav.children.map((item, index) => {
      return (
        <li className="item" key={index}>
          <NavTreeItem
            name={item.name}
            url={item.url}
            icon={item.icon}
            isActive={item.isActive}
            isExternal={item.isExternal}
            onClick={onLinkClick}
          />
        </li>
      );
    });
  }

  return (
    <ul className="page-list">
      <li>
        <NavTreeItem
          name={nav.name}
          url={nav.url}
          icon={nav.icon}
          isActive={nav.isActive}
          isExternal={nav.isExternal}
          onClick={onLinkClick}
        />
      </li>
      {children}
    </ul>
  );
};

export default NavTree;
