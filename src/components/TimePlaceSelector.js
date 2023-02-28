export default function TimePlaceSelector({ $target, num, place }) {
  const $div = document.createElement("div");
  $div.setAttribute("id", `timeAndPlace${num}`);
  $target.appendChild($div);

  const hourList = () => {
    let retVal = "";
    for (let i = 9; i < 21; i++) {
      retVal += `<option value=${i}>${i}</option>`;
    }
    return retVal;
  };

  this.render = () => {
    $div.innerHTML = `
          <div class="timeAndPlace__unit">
            <div class="day_select">
              <input type="radio" name="day_select__radio" id="mon" />
              <label for="mon">월</label>
              <input type="radio" name="day_select__radio" id="thu" />
              <label for="tue">화</label>
              <input type="radio" name="day_select__radio" id="wed" />
              <label for="wed">수</label>
              <input type="radio" name="day_select__radio" id="thu" />
              <label for="thu">목</label>
              <input type="radio" name="day_select__radio" id="fri" />
              <label for="fri">금</label>
            </div>
          </div>
          <div class="time_select">
            <select name="time_select__start_hour">
              ${hourList()}
            </select>
            <select name="time_select__start_minutes">
              <option value="00" selected>00</option>
              <option value="30">30</option>
            </select>
            <span> ~ </span>
            <select name="time_select__end_hour">
              ${hourList()}
            </select>
            <select name="time_select__end_minutes">
              <option value="00" selected>00</option>
              <option value="30">30</option>
            </select>
          </div>
          <div class="place_select">
            <select name="place_choose">
              ${place()}
            </select>
            <input type="text" placeholder="강의실 [ ex) 410 ]" />
          </div>
    `;
  };

  this.render();
}
