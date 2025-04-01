import Header1 from "@/components/headers/Header1";
import Properties1 from "@/components/properties/Properties1";
import Services_2 from "@/components/homes/home-1/Services_2";
import React from "react";
import PageTitle from "@/components/otherPages/projects/mila-two/PageTitle";
import Footer1 from "@/components/footer/Footer1";
import PropertiesBuy from "@/components/homes/home-1/PropertiesBuy";

import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Property Halfmap Grid || Homelengo - Real Estate Reactjs Template",
  description: "Homelengo - Real Estate Reactjs Template",
};
export default function PropertyHalfmapGridPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Header1 />
      <PageTitle />
      <PropertiesBuy />
      <Footer1 />
    </>
  );
}
