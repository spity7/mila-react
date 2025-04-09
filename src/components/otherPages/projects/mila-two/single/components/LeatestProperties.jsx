import { BuyProperties } from "@/data/propertiesMila";
import { Link } from "react-router-dom";
import React from "react";

export default function LeatestProperties({ propertyItem }) {
  const relatedProperties = BuyProperties.filter(
    (prop) => prop.title === propertyItem.title && prop.id !== propertyItem.id
  );

  return (
    <>
      <h5 className="fw-6 title">Related Propeties</h5>
      <ul>
        {relatedProperties.slice(0, 4).map((elm, i) => (
          <li key={i} className="latest-property-item">
            <Link to={`/mila-two/single/${elm.id}`} className="images-style">
              <img alt="img" src={elm.imgSrc} width={615} height={405} />
            </Link>
            <div className="content">
              <div className="text-capitalize text-btn">
                <Link to={`/mila-two/single/${elm.id}`} className="link">
                  {elm.title}
                </Link>
              </div>
              <ul className="meta-list mt-6">
                <li className="item">
                  <i className="icon icon-bed" />
                  <span className="text-variant-1">Beds:</span>
                  <span className="fw-6">{elm.beds}</span>
                </li>
                <li className="item">
                  <i className="icon icon-bath" />
                  <span className="text-variant-1">Baths:</span>
                  <span className="fw-6">{elm.baths}</span>
                </li>
                <li className="item">
                  <i className="icon icon-sqft" />
                  <span className="text-variant-1">Sqm:</span>
                  <span className="fw-6">{elm.sqm}</span>
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
