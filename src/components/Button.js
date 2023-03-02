export default function Button({ $target, text, type = "default", onClick }) {
  const $button = document.createElement("button");
  $target.appendChild($button);

  this.render = () => {
    $button.setAttribute("class", `buttons buttons_${type}`);
    $button.setAttribute("value", type === "cancel" ? "cancel" : undefined);
    $button.innerText = `${text}`;
  };

  this.render();

  $button.addEventListener("click", (e) => {
    e.preventDefault();
    onClick();
  });
}
