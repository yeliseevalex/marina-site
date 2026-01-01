class HeaderComponent extends HTMLElement {
  connectedCallback() {
    fetch("../components/header.html")
      .then(res => res.text())
      .then(html => {
        this.innerHTML = html;

        document.dispatchEvent(new Event("headerLoaded"));
      });
  }
}

class FooterComponent extends HTMLElement {
  connectedCallback() {
    fetch("../components/footer.html")
      .then(res => res.text())
      .then(html => {
        this.innerHTML = html;
      });
  }
}

customElements.define("my-header", HeaderComponent);
customElements.define("my-footer", FooterComponent);
