import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProperties } from "@/services/propertyService";

export default function LeatestProperties({ propertyItem }) {
  const [relatedProperties, setRelatedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRelatedProperties = async () => {
      try {
        setLoading(true);
        const response = await fetchProperties(); // Fetch all properties from the backend
        const fetchedProperties = response.properties;

        // Filter related properties based on type and exclude the current property
        const related = fetchedProperties.filter(
          (prop) =>
            prop.type[0] === propertyItem.type[0] &&
            prop.propertyId !== propertyItem.propertyId
        );

        setRelatedProperties(related);
      } catch (err) {
        console.error("Error fetching related properties:", err);
        setError("Failed to fetch related properties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProperties();
  }, [propertyItem]);

  if (loading) {
    return <div>Loading related properties...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h5 className="fw-6 title">Related Propeties</h5>
      <ul>
        {relatedProperties.slice(0, 4).map((elm, i) => (
          <li key={i} className="latest-property-item">
            <Link
              to={`/mila-one/single/${elm.propertyId}`}
              className="images-style"
            >
              <img
                alt="img"
                src={elm.gallery[0].src}
                width={615}
                height={405}
              />
            </Link>
            <div className="content">
              <div className="text-capitalize text-btn">
                <Link
                  to={`/mila-one/single/${elm.propertyId}`}
                  className="link"
                >
                  {elm.title}
                  {elm.filterOptions[1] === "Duplex" && " (Duplex)"}
                  {elm.filterOptions[1] === "Penthouse" && " (Penthouse)"}
                </Link>
              </div>
              <ul className="meta-list mt-6">
                <li className="item">
                  <i className="icon icon-sqft" />
                  <span className="text-variant-1">Sqm:</span>
                  <span className="fw-6">
                    {elm.sqm} m<sup>2</sup>
                  </span>
                </li>
              </ul>
              <div className="mt-10 text-btn">
                ${elm.price.toLocaleString()}
              </div>
            </div>
          </li>
        ))}
        {relatedProperties.length === 0 && (
          <li className="no-related">No related properties found.</li>
        )}
      </ul>
    </>
  );
}
