import grapesjs from "grapesjs";
import React, { useEffect } from "react";
import GrapesJSConfig from "./grapesjsConfig";
// import dynamicConfig from "./grapesjsConfig";

const GrapesjsMain = () => {
  useEffect(() => {
    loadGrapesJS();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadComponents = (editor) => {
    editor.DomComponents.addType("cu-input", {
      isComponent: (el) => el.tagName === "INPUT",
      model: {
        defaults: {
          traits: [
            // Strings are automatically converted to text types
            "name", // Same as: { type: 'text', name: 'name' }
            "placeholder",
            {
              type: "select", // Type of the trait
              label: "Type", // The label you will see in Settings
              name: "type", // The name of the attribute/property to use on component
              options: [
                { id: "text", name: "Text" },
                { id: "email", name: "Email" },
                { id: "password", name: "Password" },
                { id: "number", name: "Number" },
              ],
            },
            {
              type: "checkbox",
              name: "required",
            },
          ],
          // As by default, traits are binded to attributes, so to define
          // their initial value we can use attributes
          attributes: { type: "text", required: true },
        },
      },
    });
    editor.DomComponents.addType("image", {
      isComponent: (el) => el.tagName === "INPUT",
      model: {
        defaults: {
          traits: [
            {
              type: "button",
              // ...
              text: "Click me",
              full: true, // Full width button
              command: (editor) => {
                const selectedComponent = editor.getSelected();
                editor.runCommand("open-assets  ", {
                  target: selectedComponent,
                });
              },
            },
          ],
          // As by default, traits are binded to attributes, so to define
          // their initial value we can use attributes
          attributes: { type: "button", required: true },
        },
      },
    });

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
          classNameName: "btn-toggle-borders",
          label: "<u>B</u>",
          command: "sw-visibility", // Built-in command
        },
        {
          id: "export",
          classNameName: "btn-open-export",
          label: "Exp",
          command: "export-template",
          context: "export-template", // For grouping context of buttons from the same panel
        },
        {
          id: "show-json",
          classNameName: "btn-show-json",
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

    // Define commands
    editor.Commands.add("show-layers", {
      getRowEl(editor) {
        return editor.getContainer().closest(".editor-row");
      },
      getLayersEl(row) {
        return row.querySelector(".layers-container");
      },

      run(editor, sender) {
        const lmEl = this.getLayersEl(this.getRowEl(editor));
        lmEl.style.display = "";
      },
      stop(editor, sender) {
        const lmEl = this.getLayersEl(this.getRowEl(editor));
        lmEl.style.display = "none";
      },
    });
    editor.Commands.add("show-styles", {
      getRowEl(editor) {
        return editor.getContainer().closest(".editor-row");
      },
      getStyleEl(row) {
        return row.querySelector(".styles-container");
      },

      run(editor, sender) {
        const smEl = this.getStyleEl(this.getRowEl(editor));
        smEl.style.display = "";
      },
      stop(editor, sender) {
        const smEl = this.getStyleEl(this.getRowEl(editor));
        smEl.style.display = "none";
      },
    });

    //traits button Commands
    // Define command
    // ...
    editor.Commands.add("show-traits", {
      getTraitsEl(editor) {
        const row = editor.getContainer().closest(".editor-row");
        return row.querySelector(".traits-container");
      },
      run(editor, sender) {
        this.getTraitsEl(editor).style.display = "";
      },
      stop(editor, sender) {
        this.getTraitsEl(editor).style.display = "none";
      },
    });

    // Responsive styles Commands
    // editor.setDevice("Mobile"); //mobile first Approach
    editor.Commands.add("set-device-mobile", {
      run: (editor) => editor.setDevice("Mobile"),
    });
    editor.Commands.add("set-device-desktop", {
      run: (editor) => editor.setDevice("Desktop"),
    });
    editor.Commands.add("set-device-tablet", {
      run: (editor) => editor.setDevice("Tablet"),
    });
  };

  const loadGrapesJS = async () => {
    const editor = await grapesjs.init(GrapesJSConfig()); // config is  objects
    console.log(editor);
    loadComponents(editor);
  };

  return (
    <>
      <div className="panel__top">
        <div className="panel__basic-actions"></div>
        <div className="panel__devices"></div>
        <div className="panel__switcher"></div>
      </div>
      <div className="editor-row">
        <div className="editor-canvas">
          <div id="gjs">
            <h1>Hello World Component!</h1>
          </div>
        </div>
        <div className="panel__right">
          <div className="layers-container"></div>
          <div className="styles-container"></div>
          <div className="traits-container"></div>
        </div>
      </div>
      <div id="blocks"></div>
    </>
  );
};

export default GrapesjsMain;

// mjml
// <div id="gjs">
// <mjml>
//   <mj-body>
//     <mj-container>
//       <mj-section>
//         <p>Hello World Component</p>
//       </mj-section>
//     </mj-container>
//   </mj-body>
// </mjml>
// </div>
