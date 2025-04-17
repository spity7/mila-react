import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import DetailsTitle1 from "@/components/otherPages/projects/mila-one/single/DetailsTitle";
import Gallery from "@/components/otherPages/projects/mila-one/single/Gallery";
import PropertyDetails from "@/components/otherPages/projects/mila-one/single/PropertyDetails";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProperties } from "@/services/propertyService"; // Import the fetch function

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Property Details",
  description: "Mila",
};
export default function PropertyDetailsPageV3() {
  let params = useParams();
  const [propertyItem, setPropertyItem] = useState(null); // State to store the property
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await fetchProperties(); // Fetch all properties
        const property = response.properties.find(
          (elm) => elm.propertyId == params.id // Match propertyId with params.id
        );
        if (!property) {
          throw new Error("Property not found");
        }
        setPropertyItem(property);
      } catch (err) {
        console.error("Error fetching property:", err);
        setError("Failed to fetch property. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [params.id]);

  if (loading) {
    return <div>Loading property details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <DetailsTitle1 propertyItem={propertyItem} />
      <Gallery propertyItem={propertyItem} />
      <PropertyDetails propertyItem={propertyItem} />
      <Footer1 />
    </>
  );
}
