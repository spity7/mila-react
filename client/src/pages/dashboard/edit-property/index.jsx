import AddProperty from "@/components/dashboard/AddProperty";
import EditProperty from "@/components/dashboard2/EditProperty";
import SidebarMenu from "@/components/dashboard/SidebarMenu";
import Header2 from "@/components/headers/Header2";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";
import Footer1 from "@/components/footer/Footer1";

const metadata = {
  title: "Mila Residence",
  description: "Mila Residence",
};

export default function EditPropertyPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="layout-wrap">
        <Header2 />
        <EditProperty />
        <div className="overlay-dashboard" />
        <Footer1 />
      </div>
    </>
  );
}
