export default function Button({ $target, text, type = "default", onClick }) {
  const $button = document.createElement("button");
  $button.setAttribute("class", `buttons buttons_${type}`);
  $target.appendChild($button);

  this.render = () => {
    $button.innerText = `${text}`;
  };

  this.render();

  $button.addEventListener("click", (e) => {
    e.preventDefault();
    onClick();
  });
}
