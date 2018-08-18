import React from "react";
import PropTypes from "prop-types";
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

NavTree.propTypes = {
  nav: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    isExternal: PropTypes.bool,
    children: PropTypes.array.isRequired
  }).isRequired
};

export default NavTree;
