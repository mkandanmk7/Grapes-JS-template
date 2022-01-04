import "grapesjs/dist/css/grapes.min.css";
const GrapesJSConfig = () => {
  return {
    // Indicate where to init the editor. You can also pass an HTMLElement
    container: "#gjs",
    // Get the content for the canvas directly from the element
    // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
    fromElement: true,
    // Size of the editor
    height: "95vh",
    width: "auto",

    // Avoid any default panel

    blockManager: {
      appendTo: "#blocks",
      blocks: [
        {
          id: "section", // id is mandatory
          label: "<b>Section</b>", // You can use HTML/SVG inside labels
          attributes: { class: "gjs-block-section" },
          content: `<section>
            <h1>This is a simple title</h1>
            <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
          </section>`,
        },
        {
          id: "cu-input",
          label: "Input-Cu",
          content: '<input  data-gjs-type="cu-input" type="text"/>',
        },
        {
          id: "text",
          label: "Text",
          content: '<div data-gjs-type="text">Insert your text here</div>',
        },
        {
          id: "image",
          label: "Image",
          // Select the component once it's dropped
          select: true,
          // You can pass components as a JSON instead of a simple HTML string,
          // in this case we also use a defined component type `image`
          content: { type: "image" },
          // This triggers `active` event on dropped components and the `image`
          // reacts by opening the AssetManager
          activate: true,
        },
      ],
    },

    layerManager: {
      appendTo: ".layers-container",
    },
    // We define a default panel as a sidebar to contain layers
    panels: {
      defaults: [
        // ...
        {
          id: "panel-switcher",
          el: ".panel__switcher",
          buttons: [
            {
              id: "show-layers",
              active: true,
              label: "Layers",
              command: "show-layers",
              // Once activated disable the possibility to turn it off
              togglable: false,
            },
            {
              id: "show-style",
              active: true,
              label: "Styles",
              command: "show-styles",
              togglable: false,
            },
            {
              id: "show-traits",
              active: true,
              label: "Traits",
              command: "show-traits",
              togglable: false,
            },
          ],
        },
        // Device Panel...
        {
          id: "panel-devices",
          el: ".panel__devices",
          buttons: [
            {
              id: "device-desktop",
              label: "Desktop",
              command: "set-device-desktop",
              active: true,
              togglable: false,
            },
            {
              id: "device-tablet",
              label: "Tablet",
              command: "set-device-tablet",
              active: true,
              togglable: false,
            },
            {
              id: "device-mobile",
              label: "Mobile",
              command: "set-device-mobile",
              togglable: false,
            },
          ],
        },
      ],
    },
    traitManager: {
      appendTo: ".traits-container",
      // TraitManger: [{ name: "button", label: "Add", type: "buttonLogin" }],
    },

    // The Selector Manager allows to assign classes and
    // different states (eg. :hover) on components.
    // Generally, it's used in conjunction with Style Manager
    // but it's not mandatory
    selectorManager: {
      appendTo: ".styles-container",
    },

    styleManager: {
      appendTo: ".styles-container",
      sectors: [
        {
          name: "Dimension",
          open: false,
          // Use built-in properties
          buildProps: [
            "width",
            "min-height",
            "height",
            "padding",
            "margin",
            "display",
            "position",
          ],
          // Use `properties` to define/override single property
          properties: [
            {
              // Type of the input,
              // options: integer | radio | select | color | slider | file | composite | stack
              type: "integer",
              name: "The width", // Label for the property
              property: "width", // CSS property (if buildProps contains it will be extended)
              units: ["px", "%"], // Units, available only for 'integer' types
              defaults: "auto", // Default value
              min: 0, // Min value, available only for 'integer' types
            },
          ],
        },
        {
          name: "Extra",
          open: false,
          buildProps: [
            "background-color",
            "box-shadow",
            "custom-prop",
            "transform",
          ],
          properties: [
            {
              id: "custom-prop",
              name: "Custom Label",
              property: "font-size",
              type: "select",
              defaults: "32px",
              // List of options, available only for 'select' and 'radio'  types
              options: [
                { value: "12px", name: "Tiny" },
                { value: "18px", name: "Medium" },
                { value: "32px", name: "Big" },
              ],
            },
          ],
        },
      ],
    },
    // ...
    deviceManager: {
      devices: [
        {
          name: "Desktop",
          width: "", // default size
        },
        {
          name: "Tablet",
          width: "720px",
          widthMedia: "768px", // this value will be used on canvas width
        },
        {
          name: "Mobile",
          width: "320px", // this value will be used on canvas width
          widthMedia: "480px", // this value will be used in CSS @media
        },
      ],
    },

    // ...storage on local
    storageManager: {
      id: "gjs-", // Prefix identifier that will be used inside storing and loading
      // type: "local", // Type of the storage
      autosave: true, // Store data automatically
      autoload: true, // Autoload stored data on init
      // stepsBeforeSave: 1, // If autosave enabled, indicates how many changes are necessary before store method is triggered
      storeComponents: true, // Enable/Disable storing of components in JSON format
      storeStyles: true, // Enable/Disable storing of rules in JSON format
      storeHtml: true, // Enable/Disable storing of components as HTML string
      storeCss: true, // Enable/Disable storing of rules as CSS string
      type: "local",
      stepsBeforeSave: 10,
      urlStore: "http://store/endpoint",
      urlLoad: "http://load/endpoint",
      params: {}, // Custom parameters to pass with the remote storage request, eg. CSRF token
      headers: {}, // Custom headers for the remote storage request
    },

    // plugins: ["grapesjs-mjml"],
    // pluginsOpts: {
    //   "grapesjs-mjml": {
    //     resetDevices: false, // so we can use the device buttons
    //   },
    // },
  };
};

export default GrapesJSConfig;
