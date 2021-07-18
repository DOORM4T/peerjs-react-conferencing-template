import {ChakraProvider} from "../_snowpack/pkg/@chakra-ui/react.js";
import React from "../_snowpack/pkg/react.js";
import ReactDOM from "../_snowpack/pkg/react-dom.js";
import WebFont from "../_snowpack/pkg/webfontloader.js";
import App from "./App.js";
import "./styles.css.proxy.js";
WebFont.load({
  google: {families: ["Roboto"]}
});
ReactDOM.render(/* @__PURE__ */ React.createElement(ChakraProvider, null, /* @__PURE__ */ React.createElement(App, null)), document.getElementById("app"));
