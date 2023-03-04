export default function TimePlaceSelector({ $target, number, place }) {
  const $div = document.createElement("div");
  $div.setAttribute("class", `timeAndPlace`);
  $target.appendChild($div);

  const hourList = (def, isStart) => {
    let retVal = "";
    for (let i = 9; i < 21; i++) {
      if (isStart && i === 20) break;
      retVal += `<option value=${i} ${
        def === i ? "selected" : ""
      }>${i}</option>`;
    }
    return retVal;
  };

  this.render = () => {
    $div.innerHTML = `
            <div class="day_select">
              <label><input type="radio" name="day_select__radio${number}" class="monday" checked/>월</label>
              <label><input type="radio" name="day_select__radio${number}" class="tuesday"/>화</label>
              <label><input type="radio" name="day_select__radio${number}" class="wednesday"/>수</label>
              <label><input type="radio" name="day_select__radio${number}" class="thursday"/>목</label>
              <label><input type="radio" name="day_select__radio${number}" class="friday"/>금</label>
            </div>
            <div class="time_select">
              <select id="time_select__start_hour__${number}">
                ${hourList(9, true)}
              </select>
              <select id="time_select__start_minutes__${number}">
                <option value="00" selected>00</option>
                <option value="30">30</option>
              </select>
              <span> ~ </span>
              <select id="time_select__end_hour__${number}">
                ${hourList(10)}
              </select>
              <select id="time_select__end_minutes__${number}">
                <option value="00" selected>00</option>
                <option value="30">30</option>
              </select>
            </div>
            <div class="place_select">
              <select name="place_choose">
                ${place()}
              </select>
              <input type="text" placeholder="강의실 [ ex) 410 ]" id='place${number}' required/>
            </div>

            ${
              number > 1
                ? `<button type="button" class="select_cell_delete_btn">삭제</button>`
                : ""
            }
    `;
  };

  this.render();

  document
    .getElementById(`time_select__start_hour__${number}`)
    .addEventListener("change", () => {
      document.getElementById(`time_select__end_hour__${number}`).value =
        parseInt(
          document.getElementById(`time_select__start_hour__${number}`).value
        ) + 1;
    });

  $div.addEventListener("click", (e) => {
    const $deleteBtn = e.target.closest(".select_cell_delete_btn");
    if (!$deleteBtn) return;
    const $deleteBtnParent = $deleteBtn.closest(".timeAndPlace");
    $deleteBtnParent.parentNode.removeChild($deleteBtnParent);
  });
}
