import Footer1 from "@/components/footer/Footer1";
import Header1 from "@/components/headers/Header1";
import DetailsTitle1 from "@/components/otherPages/projects/mila-two/single/DetailsTitle";
import Gallery from "@/components/otherPages/projects/mila-two/single/Gallery";
import PropertyDetails from "@/components/otherPages/projects/mila-two/single/PropertyDetails";
import React from "react";
import { useParams } from "react-router-dom";
import { BuyProperties } from "@/data/propertiesMila";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Property Details 03 || Homelengo - Real Estate Reactjs Template",
  description: "Homelengo - Real Estate Reactjs Template",
};
export default function PropertyDetailsPageV3() {
  let params = useParams();
  const propertyItem = BuyProperties.filter((elm) => elm.id == params.id)[0];

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
