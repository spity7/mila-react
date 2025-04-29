import { menuItems } from "@/data/menu";
import { Link, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/globalContext";

export default function Nav() {
  const { pathname } = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { handleLogout } = useGlobalContext();

  useEffect(() => {
    // Check if the user is logged in by verifying the token in localStorage
    const token = localStorage.getItem("user-app");
    setIsAuthenticated(!!token); // Set to true if token exists

    // Listen for the logout event
    const logoutListener = () => {
      handleLogout(); // Call the logout function
    };
    window.addEventListener("logout", logoutListener);

    return () => {
      window.removeEventListener("logout", logoutListener); // Cleanup
    };
  }, [handleLogout]);

  // Filter menu items to include "Dashboard" only for authenticated users
  const filteredMenuItems = menuItems.filter((item) => {
    if (item.title === "Dashboard") {
      return isAuthenticated; // Show "Dashboard" only if the user is authenticated
    }
    return true; // Show other menu items
  });

  return (
    <>
      {filteredMenuItems.map((item, index) => {
        const hasDropdown = item.links.length > 1; // Check if there are multiple links
        const isProjects = item.title === "PROJECTS"; // Special case for "PROJECTS"

        return (
          <li
            key={index}
            className={` ${hasDropdown ? "dropdown2" : ""} ${
              (item.mainLink && pathname === item.mainLink) ||
              item.links.some((el) => pathname === el.href)
                ? "current"
                : ""
            }`}
          >
            {isProjects ? (
              <>
                <Link to={item.mainLink}>{item.title}</Link> {/* Direct link */}
                <ul>
                  {item.links.map((link, linkIndex) => (
                    <li
                      key={linkIndex}
                      className={
                        link.href.split("/")[1] === pathname.split("/")[1]
                          ? "current"
                          : ""
                      }
                    >
                      <Link to={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : hasDropdown ? (
              <>
                <a>{item.title}</a>
                <ul>
                  {item.links.map((link, linkIndex) => (
                    <li
                      key={linkIndex}
                      className={
                        link.href.split("/")[1] === pathname.split("/")[1]
                          ? "current"
                          : ""
                      }
                    >
                      {link.onClick ? (
                        <Link
                          to="#"
                          onClick={(e) => {
                            e.preventDefault(); // Prevent default navigation
                            link.onClick(); // Call the logout function
                          }}
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <Link to={link.href}>{link.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <Link to={item.links[0].href}>{item.title}</Link>
            )}
          </li>
        );
      })}
    </>
  );
}
