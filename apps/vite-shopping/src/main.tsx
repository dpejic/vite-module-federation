import { createRoot } from "react-dom/client";
import ShoppingModal from "./ShoppingModal";
import "./index.css";

class ShoppingModalElement extends HTMLElement {
  connectedCallback() {
    const root = createRoot(this);
    root.render(<ShoppingModal />);
  }
}

customElements.define("shopping-modal", ShoppingModalElement);
