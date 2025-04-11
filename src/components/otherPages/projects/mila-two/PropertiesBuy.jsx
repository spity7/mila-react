import { filterOptions, BuyProperties } from "@/data/propertiesMila";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

const pluralize = (count, singular, plural) =>
  count === 1 ? singular : plural;

const useQuery = () => new URLSearchParams(useLocation().search);

export default function Properties() {
  const query = useQuery();
  const navigate = useNavigate();
  const typeFromQuery = query.get("type");
  const [selectedOption, setSelectedOption] = useState(
    typeFromQuery || filterOptions[0]
  );
  const [filtered, setFiltered] = useState(BuyProperties);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;

  useEffect(() => {
    navigate(`/mila-two?type=${encodeURIComponent(selectedOption)}`, {
      replace: true, // so it doesn't keep pushing history
    });
  }, [selectedOption]);

  useEffect(() => {
    setCurrentPage(1);
    if (selectedOption == "View All") {
      setFiltered(BuyProperties);
    } else {
      setFiltered(
        BuyProperties.filter((el) => el.filterOptions.includes(selectedOption))
      );
    }
  }, [selectedOption]);

  useEffect(() => {
    if (typeFromQuery && filterOptions.includes(typeFromQuery)) {
      setSelectedOption(typeFromQuery);
    }
  }, [typeFromQuery]);

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const paginatedProperties = filtered.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );
  const totalPages = Math.ceil(filtered.length / propertiesPerPage);

  return (
    <section className="flat-section flat-recommended">
      <div className="container">
        <div className="box-title text-center wow fadeInUp">
          <div className="text-subtitle text-primary">Apartments & complex</div>
          <h3 className="mt-4 title">Buy with MILA 2</h3>
        </div>
        <div
          className="flat-tab-recommended flat-animate-tab wow fadeInUp"
          data-wow-delay=".2s"
        >
          <ul className="nav-tab-recommended justify-content-md-center">
            {filterOptions.map((option, index) => (
              <li
                onClick={() => setSelectedOption(option)}
                key={index}
                className="nav-tab-item"
              >
                <a
                  className={`nav-link-item ${
                    option === selectedOption ? "active" : ""
                  }`}
                >
                  {option}
                </a>
              </li>
            ))}
          </ul>
          <div className="tab-content">
            <div className="tab-pane active show">
              <div className="row">
                {filtered.length > 0 ? (
                  paginatedProperties.map((property, index) => (
                    <div key={index} className="col-xl-4 col-lg-6 col-md-6">
                      <div className="homelengo-box">
                        <div className="archive-top">
                          <Link
                            to={`/mila-two/single/${property.id}`}
                            className="images-group"
                          >
                            <div className="images-style">
                              <img
                                className="lazyload"
                                data-src={
                                  Array.isArray(property.mapSrc)
                                    ? property.mapSrc[0]
                                    : property.mapSrc
                                }
                                alt={""}
                                src={
                                  Array.isArray(property.mapSrc)
                                    ? property.mapSrc[0]
                                    : property.mapSrc
                                }
                                width={615}
                                height={405}
                              />
                            </div>
                            <div className="top">
                              <ul className="d-flex gap-6">
                                <li className="flag-tag primary">
                                  {property.tags[0]}
                                </li>
                                <li className="flag-tag style-1">
                                  {property.tags[1]}
                                </li>
                              </ul>
                            </div>
                            <div className="bottom">
                              <svg
                                width={16}
                                height={16}
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M10 7C10 7.53043 9.78929 8.03914 9.41421 8.41421C9.03914 8.78929 8.53043 9 8 9C7.46957 9 6.96086 8.78929 6.58579 8.41421C6.21071 8.03914 6 7.53043 6 7C6 6.46957 6.21071 5.96086 6.58579 5.58579C6.96086 5.21071 7.46957 5 8 5C8.53043 5 9.03914 5.21071 9.41421 5.58579C9.78929 5.96086 10 6.46957 10 7Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M13 7C13 11.7613 8 14.5 8 14.5C8 14.5 3 11.7613 3 7C3 5.67392 3.52678 4.40215 4.46447 3.46447C5.40215 2.52678 6.67392 2 8 2C9.32608 2 10.5979 2.52678 11.5355 3.46447C12.4732 4.40215 13 5.67392 13 7Z"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              {property.address}
                            </div>
                          </Link>
                        </div>
                        <div className="archive-bottom">
                          <div className="content-top">
                            <h5 className="text-capitalize text-center">
                              <Link
                                to={`/mila-two/single/${property.id}`}
                                className="link"
                              >
                                {property.title}
                                {property.filterOptions[1] === "Duplex" &&
                                  " (Duplex)"}
                                {property.filterOptions[1] === "Penthouse" &&
                                  " (Penthouse)"}
                              </Link>
                            </h5>
                            <ul className="meta-list justify-content-around">
                              <li className="item">
                                <i className="icon icon-sqft" />
                                <span className="text-variant-1">Sqm:</span>
                                <span className="fw-6">
                                  {property.sqm} m<sup>2</sup>
                                </span>
                              </li>
                              <h6 className="price">
                                ${property.price.toFixed(2)}
                              </h6>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center w-100">
                    <h4 className="text-muted mb-20">
                      <span className="fs-1 fw-bold">'{selectedOption}'</span>{" "}
                      not available right now
                    </h4>
                  </div>
                )}
              </div>

              {/* Pagination Controls */}
              {filtered.length > propertiesPerPage && (
                <div className="pagination text-center">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
