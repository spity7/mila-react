import React from "react";

const pluralize = (count, singular, plural) =>
  count === 1 ? singular : plural;

export default function DetailsTitle1({ propertyItem }) {
  return (
    <div className="flat-section-v4">
      <div className="container">
        <div className="header-property-detail">
          <div className="content-top d-flex justify-content-between align-items-center">
            <h3 className="title link fw-8">{propertyItem.title}</h3>
            <div className="box-price d-flex align-items-end">
              <h3 className="fw-8">${propertyItem.price.toFixed(2)}</h3>
              <span className="body-1 text-variant-1"></span>
            </div>
          </div>
          <div className="content-bottom">
            <div className="box-left">
              <div className="info-box">
                <div className="label">Features</div>
                <ul className="meta">
                  <li className="meta-item">
                    <i className="icon icon-bed" />
                    <span className="text-variant-1">Bedrooms</span>
                    <span className="fw-6">{propertyItem.beds}</span>
                  </li>
                  <li className="meta-item">
                    <i className="icon icon-bath" />
                    <span className="text-variant-1">Bathrooms</span>
                    <span className="fw-6">{propertyItem.baths}</span>
                  </li>
                  <li className="meta-item">
                    <i className="icon icon-sqft" />
                    <span className="text-variant-1">Sqm:</span>
                    <span className="fw-6">
                      {propertyItem.sqm} m<sup>2</sup>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="info-box">
                <div className="label">Location</div>
                <p className="meta-item">
                  <span className="icon icon-mapPin" />
                  <span className="text-variant-1">{propertyItem.address}</span>
                </p>
              </div>
            </div>
            <ul className="icon-box">
              <li>
                <a href="#" className="item">
                  <svg
                    className="icon"
                    width={18}
                    height={18}
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.41251 8.18022C5.23091 7.85345 4.94594 7.59624 4.60234 7.44895C4.25874 7.30167 3.87596 7.27265 3.51408 7.36645C3.1522 7.46025 2.83171 7.67157 2.60293 7.96722C2.37414 8.26287 2.25 8.62613 2.25 8.99997C2.25 9.37381 2.37414 9.73706 2.60293 10.0327C2.83171 10.3284 3.1522 10.5397 3.51408 10.6335C3.87596 10.7273 4.25874 10.6983 4.60234 10.551C4.94594 10.4037 5.23091 10.1465 5.41251 9.81972M5.41251 8.18022C5.54751 8.42322 5.62476 8.70222 5.62476 8.99997C5.62476 9.29772 5.54751 9.57747 5.41251 9.81972M5.41251 8.18022L12.587 4.19472M5.41251 9.81972L12.587 13.8052M12.587 4.19472C12.6922 4.39282 12.8358 4.56797 13.0095 4.70991C13.1832 4.85186 13.3834 4.95776 13.5985 5.02143C13.8135 5.08509 14.0392 5.10523 14.2621 5.08069C14.4851 5.05614 14.7009 4.98739 14.897 4.87846C15.093 4.76953 15.2654 4.62261 15.404 4.44628C15.5427 4.26995 15.6448 4.06775 15.7043 3.85151C15.7639 3.63526 15.7798 3.40931 15.751 3.18686C15.7222 2.96442 15.6494 2.74994 15.5368 2.55597C15.3148 2.17372 14.9518 1.89382 14.5256 1.77643C14.0995 1.65904 13.6443 1.71352 13.2579 1.92818C12.8715 2.14284 12.5848 2.50053 12.4593 2.92436C12.3339 3.34819 12.3797 3.80433 12.587 4.19472ZM12.587 13.8052C12.4794 13.999 12.4109 14.2121 12.3856 14.4323C12.3603 14.6525 12.3787 14.8756 12.4396 15.0887C12.5005 15.3019 12.6028 15.5009 12.7406 15.6746C12.8784 15.8482 13.0491 15.9929 13.2429 16.1006C13.4367 16.2082 13.6498 16.2767 13.87 16.302C14.0902 16.3273 14.3133 16.3089 14.5264 16.248C14.7396 16.1871 14.9386 16.0848 15.1122 15.947C15.2858 15.8092 15.4306 15.6385 15.5383 15.4447C15.7557 15.0534 15.8087 14.5917 15.6857 14.1612C15.5627 13.7307 15.2737 13.3668 14.8824 13.1493C14.491 12.9319 14.0293 12.8789 13.5989 13.0019C13.1684 13.1249 12.8044 13.4139 12.587 13.8052Z"
                      stroke="#A3ABB0"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
