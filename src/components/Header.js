export default function Header({ $target }) {
  const $header = document.createElement("header");
  $header.setAttribute("id", "header");
  $target.appendChild($header);

  this.render = () => {
    $header.innerHTML = `
      <div id="header__logo" class="same-size">
        <img src="/src/images/logo.png" alt="Logo Image" />
      </div>
      <div id="header__anchors" class="same-size">
        <a href="">시간표</a>
        <a href="">지도</a>
      </div>
      <div class="same-size"></div>
      
    `;
  };

  this.render();
}
