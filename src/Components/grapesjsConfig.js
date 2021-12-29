import "grapesjs/dist/css/grapes.min.css";
const GrapesJSConfig = () => {
  return {
    // Indicate where to init the editor. You can also pass an HTMLElement
    container: "#gjs",
    // Get the content for the canvas directly from the element
    // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
    fromElement: true,
    // Size of the editor
    height: "500px",
    width: "auto",
    // Disable the storage manager for the moment
    storageManager: false,
    // Avoid any default panel
    panels: { defaults: [] },
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
        {
          id: "layers",
          el: ".panel__right",
          // Make the panel resizable
          resizable: {
            maxDim: 350,
            minDim: 200,
            tc: 0, // Top handler
            cl: 1, // Left handler
            cr: 0, // Right handler
            bc: 0, // Bottom handler
            // Being a flex child we need to change `flex-basis` property
            // instead of the `width` (default)
            keyWidth: "flex-basis",
          },
        },
      ],
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
