export default function Header({ $target }) {
  const $header = document.createElement("header");
  $target.appendChild($header);

  this.render = () => {
    $header.innerHTML = `
      <div id="header__anchors">
        <a href="">시간표</a>
        <a href="">지도</a>
      </div>
      <div id="header__logo">
        <img src="/src/images/logo.png" alt="Logo Image" />
      </div>
      <div id="header__user"></div>
    `;
  };

  this.render();
}
