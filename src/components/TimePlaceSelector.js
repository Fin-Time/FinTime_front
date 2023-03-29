import { placeCoordinate } from "../utils/buildingCoords.js";
import { markMap } from "../utils/tmap.js";

export default function TimePlaceSelector({ $target, number }) {
  const $div = document.createElement("div");
  $div.setAttribute("class", `timeAndPlace`);
  $target.appendChild($div);

  const hourList = (def, isStart = false) => {
    let retVal = "";
    for (let i = 9; i < 21; i++) {
      if (isStart && i === 20) break;
      retVal += `<option value=${i} ${
        def === i ? "selected" : ""
      }>${i}</option>`;
    }
    return retVal;
  };

  const place = () => {
    let retVal = "<option value=default hidden>===강의실 건물===</option>";
    for (const place in placeCoordinate) {
      retVal += `<option value=${place}>${place}</option>`;
    }
    return retVal;
  };

  const removeAll = (id) => {
    const parent = document.getElementById(id);
    while (parent.hasChildNodes()) {
      parent.removeChild(parent.firstChild);
    }
  };

  this.render = () => {
    $div.innerHTML = `
          <div class="time_place__title">
            ${number === 1 ? "시간 / 장소" : ""}
          </div>
          <div class="time_place__content">
            <div class="day_select">
              <input type="radio" name="day_select__radio${number}" id="mon_${number}" class="day monday" checked/><label for="mon_${number}" class="day_label">월</label>
              <input type="radio" name="day_select__radio${number}" id="tue_${number}" class="day tuesday"/><label for="tue_${number}" class="day_label">화</label>
              <input type="radio" name="day_select__radio${number}" id="wed_${number}" class="day wednesday"/><label for="wed_${number}" class="day_label">수</label>
              <input type="radio" name="day_select__radio${number}" id="thu_${number}" class="day thursday"/><label for="thu_${number}" class="day_label">목</label>
              <input type="radio" name="day_select__radio${number}" id="fri_${number}" class="day friday"/><label for="fri_${number}" class="day_label">금</label>
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
          </div>
          <div id="map_mark_${number}" class="maps"></div>
    `;
  };

  this.render();

  $div.addEventListener("change", (e) => {
    const $changeStartSelect = e.target.closest(".time_select__start_hour");
    if (!$changeStartSelect) return;
    const $changeEndSelect = $changeStartSelect.parentNode.children[3];
    $changeEndSelect.value = parseInt($changeStartSelect.value) + 1;
  });

  $div.addEventListener("change", (e) => {
    const $changeBuilding = e.target.closest(".place_select__building");
    if (!$changeBuilding) return;
    const coords = placeCoordinate[$changeBuilding.value];
    const targetMap =
      $changeBuilding.parentNode.parentNode.parentNode.children[2].id;
    removeAll(targetMap);
    markMap(targetMap, coords[0], coords[1], "400px", "250px");
  });

  $div.addEventListener("click", (e) => {
    const $deleteBtn = e.target.closest(".select_cell_delete_btn");
    if (!$deleteBtn) return;

    const $deleteBtnParent = $deleteBtn.closest(".timeAndPlace");
    $deleteBtnParent.parentNode.removeChild($deleteBtnParent);
  });
}
