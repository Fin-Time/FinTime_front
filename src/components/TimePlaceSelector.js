export default function TimePlaceSelector({ $target, number, place }) {
  const $div = document.createElement("div");
  $div.setAttribute("class", `timeAndPlace`);
  $target.appendChild($div);

  const hourList = (def) => {
    let retVal = "";
    for (let i = 9; i < 21; i++) {
      retVal += `<option value=${i} ${
        def === i ? "selected" : ""
      }>${i}</option>`;
    }
    return retVal;
  };

  this.render = () => {
    $div.innerHTML = `
          <div class="timeAndPlace__unit">
            <div class="day_select">
              <input type="radio" name="day_select__radio${number}" id="mon${number}" checked/>
              <label for="mon${number}">월</label>
              <input type="radio" name="day_select__radio${number}" id="tue${number}" />
              <label for="tue${number}">화</label>
              <input type="radio" name="day_select__radio${number}" id="wed${number}" />
              <label for="wed${number}">수</label>
              <input type="radio" name="day_select__radio${number}" id="thu${number}" />
              <label for="thu${number}">목</label>
              <input type="radio" name="day_select__radio${number}" id="fri${number}" />
              <label for="fri${number}">금</label>
            </div>
            <div class="time_select">
              <select name="time_select__start_hour">
                ${hourList(9)}
              </select>
              <select name="time_select__start_minutes">
                <option value="00" selected>00</option>
                <option value="30">30</option>
              </select>
              <span> ~ </span>
              <select name="time_select__end_hour">
                ${hourList(10)}
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
              <input type="text" placeholder="강의실 [ ex) 410 ]" id='place${number}' required/>
            </div>
          </div>
          
    `;
  };

  this.render();
}
