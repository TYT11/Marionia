import React from "react";
import { Helmet } from "react-helmet-async";

const HelmetTemplate = ({ subTitle, des, children }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{subTitle ? `${subTitle} - Marionia` : "Marionia"}</title>
      <meta name="description" content={des} />
      {children}
    </Helmet>
  );
};

export default HelmetTemplate;
