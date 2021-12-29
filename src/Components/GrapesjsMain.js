import grapesjs from "grapesjs";
import React, { useEffect } from "react";
import GrapesJSConfig from "./grapesjsConfig";
// import dynamicConfig from "./grapesjsConfig";

const GrapesjsMain = () => {
  useEffect(() => {
    loadGrapesJS();
  }, []);

  const loadComponents = (editor) => {
    editor.BlockManager.add("my-block-id", {
      // ...
      content: {
        tagName: "div",
        draggable: false,
        attributes: { "some-attribute": "some-value" },
        components: [
          {
            tagName: "span",
            content: "<b>Some static content</b>",
          },
          {
            tagName: "div",
            // use `content` for static strings, `components` string will be parsed
            // and transformed in Components
            components: "<span>HTML at some point</span>",
          },
        ],
      },
    });
    editor.Panels.addPanel({
      id: "panel-top",
      el: ".panel__top",
    });
    editor.Panels.addPanel({
      id: "basic-actions",
      el: ".panel__basic-actions",
      buttons: [
        {
          id: "visibility",
          active: true, // active by default
          className: "btn-toggle-borders",
          label: "<u>B</u>",
          command: "sw-visibility", // Built-in command
        },
        {
          id: "export",
          className: "btn-open-export",
          label: "Exp",
          command: "export-template",
          context: "export-template", // For grouping context of buttons from the same panel
        },
        {
          id: "show-json",
          className: "btn-show-json",
          label: "JSON",
          context: "show-json",
          command(editor) {
            editor.Modal.setTitle("Components JSON")
              .setContent(
                `<textarea style="width:100%; height: 250px;">
                ${JSON.stringify(editor.getComponents())}
              </textarea>`
              )
              .open();
          },
        },
      ],
    });
  };

  const loadGrapesJS = async () => {
    const editor = await grapesjs.init(GrapesJSConfig());
    loadComponents(editor);
  };

  return (
    <>
      <div class="panel__top">
        <div class="panel__basic-actions"></div>
      </div>
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
