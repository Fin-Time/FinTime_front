export default function ScheduleModal({ $target }) {
  const $dialog = document.createElement("dialog");
  $target.appendChild($dialog);
  $dialog.setAttribute("open", "true");

  const hourList = () => {
    let retVal = "";
    for (let i = 9; i < 21; i++) {
      retVal += `<option value=${i}>${i}</option>`;
    }
    return retVal;
  };

  this.render = () => {
    $dialog.innerHTML = `
      <form method="dialog" style="width: 300px">
        <h3>시간표 수업 추가</h3>
        <label for="newSubject">과목명</label>
        <input
          type="text"
          36.3667
          127.3443
          placeholder="ex) 기초글쓰기"
          id="newSubject"
          required
        />
        <div id="timeAndPlace">
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
            </select>
          </div>
        </div>
        <div>
          <button value="cancel">Cancel</button>
          <button id="confirmBtn" value="default">Confirm</button>
        </div>
      </form>
    `;
  };

  this.render();
}
