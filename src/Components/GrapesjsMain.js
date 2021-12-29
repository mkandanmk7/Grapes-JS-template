import grapesjs from "grapesjs";
import React, { useEffect } from "react";
import GrapesJSConfig from "./grapesjsConfig";
// import dynamicConfig from "./grapesjsConfig";

const GrapesjsMain = () => {
  useEffect(() => {
    loadGrapesJS();
  }, []);
  const loadGrapesJS = async () => {
    const editor = await grapesjs.init(GrapesJSConfig());
  };

  return (
    <>
      <div id="gjs">
        <mjml>
          <mj-body>
            <mj-container>
              <mj-section>
                <p>Hello World Component</p>
              </mj-section>
            </mj-container>
          </mj-body>
        </mjml>
      </div>
      <div id="blocks"></div>
    </>
  );
};

export default GrapesjsMain;
