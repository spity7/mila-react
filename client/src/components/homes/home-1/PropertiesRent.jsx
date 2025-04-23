import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProperties } from "@/services/propertyService";

const pluralize = (count, singular, plural) =>
  count === 1 ? singular : plural;

export default function Properties() {
  const [properties, setProperties] = useState([]); // All properties from the backend
  const [filterOptions, setFilterOptions] = useState(["View All"]); // Dynamic filter options
  const [selectedOption, setSelectedOption] = useState("View All");
  const [filtered, setFiltered] = useState([]); // Filtered properties
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const propertiesPerPage = 3;

  // Fetch properties from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetchProperties();
        console.log("API Response:", response);

        const fetchedProperties = response.properties.filter(
          (property) => property.project === "mila one"
        );

        setProperties(fetchedProperties);
        setFilterOptions([
          "View All",
          ...new Set(
            fetchedProperties.flatMap((property) => property.filterOptions)
          ),
        ]);
        setFiltered(fetchedProperties);
      } catch (err) {
        setError("Failed to fetch properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update filtered properties when the selected filter changes
  useEffect(() => {
    setCurrentPage(1);
    if (selectedOption === "View All") {
      setFiltered(properties);
    } else {
      setFiltered(
        properties.filter((property) =>
          property.filterOptions.includes(selectedOption)
        )
      );
    }
  }, [selectedOption, properties]);

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const paginatedProperties = filtered.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );
  const totalPages = Math.ceil(filtered.length / propertiesPerPage);

  if (loading) {
    return <div>Loading properties...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="flat-section flat-recommended">
      <div className="container">
        <div className="box-title text-center wow fadeInUp">
          <div className="text-subtitle text-primary">Apartments & complex</div>
          <h3 className="mt-4 title">Rent with MILA 1</h3>
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
                            to={`/mila-one/single/${property.propertyId}`}
                            className="images-group"
                          >
                            <div className="images-style">
                              <img
                                className="lazyload"
                                data-src={property.gallery[0].src}
                                alt={property.alt}
                                src={property.gallery[0].src}
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
                                to={`/mila-one/single/${property.propertyId}`}
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
                                ${property.price} /night
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

              <div className="text-center">
                <Link
                  to={`/mila-one`}
                  className="tf-btn btn-view primary size-1 hover-btn-view"
                >
                  View All Rent Properties
                  <span className="icon icon-arrow-right2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
