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
              <label><input type="radio" name="day_select__radio${number}" class="day monday" checked/>월</label>
              <label><input type="radio" name="day_select__radio${number}" class="day tuesday"/>화</label>
              <label><input type="radio" name="day_select__radio${number}" class="day wednesday"/>수</label>
              <label><input type="radio" name="day_select__radio${number}" class="day thursday"/>목</label>
              <label><input type="radio" name="day_select__radio${number}" class="day friday"/>금</label>
            </div>
            <div class="time_select">
              <select class="time_select__start_hour">
                ${hourList(9, true)}
              </select>
              <select class="time_select__start_minutes">
                <option value="00" selected>00</option>
                <option value="30">30</option>
              </select>
              <span> ~ </span>
              <select class="time_select__end_hour">
                ${hourList(10)}
              </select>
              <select class="time_select__end_minutes">
                <option value="00" selected>00</option>
                <option value="30">30</option>
              </select>
            </div>
            <div class="place_select">
              <select name="place_choose" class="place_select__building">
                ${place()}
              </select>
              <input type="text" placeholder="강의실 [ ex) 410 ]" class='place' required/>
            </div>

            ${
              number > 1
                ? `<button type="button" class="select_cell_delete_btn">삭제</button>`
                : ""
            }
    `;
  };

  this.render();

  $div.addEventListener("change", (e) => {
    const $changeStartSelect = e.target.closest(".time_select__start_hour");
    if (!$changeStartSelect) return;
    const $changeEndSelect = $changeStartSelect.parentNode.children[3];
    $changeEndSelect.value = parseInt($changeStartSelect.value) + 1;
  });

  $div.addEventListener("click", (e) => {
    const $deleteBtn = e.target.closest(".select_cell_delete_btn");
    if (!$deleteBtn) return;

    const $deleteBtnParent = $deleteBtn.closest(".timeAndPlace");
    $deleteBtnParent.parentNode.removeChild($deleteBtnParent);
  });
}
