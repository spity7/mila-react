import { menuItems } from "@/data/menu";
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const { pathname } = useLocation();

  return (
    <>
      {menuItems.map((item, index) => {
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
                      <Link to={link.href}>{link.label}</Link>
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
