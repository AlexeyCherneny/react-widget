import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

class ReactWidget extends HTMLElement {
  mountPoint: any;
  componentAttributes: any = {};
  componentProperties: any = {};

  connectedCallback() {
    this.mountReactApp();
  }

  disconnectedCallback() {
    ReactDOM.unmountComponentAtNode(this.mountPoint);
  }

  static get observedAttributes() {
    return ["menutitle", "menucolor"];
  }

  attributeChangedCallback(name: any, oldVal: any, newVal: any) {
    this.componentAttributes[name] = newVal;

    this.mountReactApp();
  }

  get name() {
    return this.componentProperties.name;
  }

  set name(newValue) {
    this.componentProperties.name = newValue;

    this.mountReactApp();
  }

  reactProps() {
    return { ...this.componentAttributes, ...this.componentProperties };
  }

  mountReactApp() {
    if (!this.mountPoint) {
      this.mountPoint = document.createElement("div");
      this.attachShadow({ mode: "open" }).appendChild(this.mountPoint);
    }

    ReactDOM.render(<App {...this.reactProps()} />, this.mountPoint);
  }
}

window.customElements.define("react-widget", ReactWidget);
