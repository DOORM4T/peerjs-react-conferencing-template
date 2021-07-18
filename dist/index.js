import {ChakraProvider} from "./pkg/@chakra-ui/react.js";
import React from "./pkg/react.js";
import ReactDOM from "./pkg/react-dom.js";
import WebFont from "./pkg/webfontloader.js";
import App from "./App.js";
import "./styles.css.proxy.js";
WebFont.load({
  google: {families: ["Roboto"]}
});
ReactDOM.render(/* @__PURE__ */ React.createElement(ChakraProvider, null, /* @__PURE__ */ React.createElement(App, null)), document.getElementById("app"));
