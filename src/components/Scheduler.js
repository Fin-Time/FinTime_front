export default function Scheduler({ $target, initialState, onDelete }) {
  const $scheduler = document.createElement("table");
  $target.appendChild($scheduler);
  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const translateTimeToPosition = (time) => {
    let position = 0;
    for (let i = 10; i <= time; i++) {
      position += 50;
    }
    return time % 1 !== 0 ? position + 25 : position;
  };

  const calcHeight = (start, end) => {
    let height = 0;
    for (let i = 0; i < Math.floor(end - start); i++) {
      height += 50;
    }
    return !Number.isInteger(end - start) ? height + 25 : height;
  };

  const makeSubject = (
    $target,
    name,
    place,
    start_time,
    end_time,
    subjects
  ) => {
    const $div = document.createElement("div");
    $target.appendChild($div);
    if (subjects.includes(name)) {
      $div.setAttribute("class", `subject color${subjects.indexOf(name) + 1}`);
    } else {
      $div.setAttribute("class", `subject color${subjects.length + 1}`);
      subjects.push(name);
    }

    $div.setAttribute(
      "style",
      `top: ${translateTimeToPosition(start_time)}px; height: ${calcHeight(
        start_time,
        end_time
      )}px;`
    );

    $div.innerHTML = `
        <div class="subject_info">
          <div class="subject_info__name">
            <span>${name}</span>
            <span class="delete">X</span>
          </div>
          <div class="subject_info__place">${place}</div>
        </div>
    `;
  };

  this.render = () => {
    $scheduler.innerHTML = `
        <tr>
          <th></th><td>월</td><td>화</td><td>수</td><td>목</td><td>금</td>
        </tr>
        <tr>
          <th>
            <div class="times">
              <div class="time">오전 9시</div>
              <div class="time">오전 10시</div>
              <div class="time">오전 11시</div>
              <div class="time">오후 12시</div>
              <div class="time">오후 1시</div>
              <div class="time">오후 2시</div>
              <div class="time">오후 3시</div>
              <div class="time">오후 4시</div>
              <div class="time">오후 5시</div>
              <div class="time">오후 6시</div>
              <div class="time">오후 7시</div>
              <div class="time">오후 8시</div>
            </div>
          </th>
          ${`<td class="days">
              <div class="container"></div>
              <div class="grids">
                <div class="grid"></div>
                <div class="grid"></div>
                <div class="grid"></div>
                <div class="grid"></div>
                <div class="grid"></div>
                <div class="grid"></div>
                <div class="grid"></div>
                <div class="grid"></div>
                <div class="grid"></div>
                <div class="grid"></div>
                <div class="grid"></div>
                <div class="grid"></div>
              </div>
            </td>`.repeat(5)}
        </tr>
      `;
    const subjects = [];
    for (const key in this.state.schedule) {
      this.state.schedule[key].map(({ name, place, start_time, end_time }) => {
        let current;
        switch (key) {
          case "monday":
            current = document.getElementsByClassName("days")[0].children[0];
            break;
          case "tuesday":
            current = document.getElementsByClassName("days")[1].children[0];
            break;
          case "wednesday":
            current = document.getElementsByClassName("days")[2].children[0];
            break;
          case "thursday":
            current = document.getElementsByClassName("days")[3].children[0];
            break;
          case "friday":
            current = document.getElementsByClassName("days")[4].children[0];
            break;
        }
        makeSubject(current, name, place, start_time, end_time, subjects);
      });
    }
  };

  this.render();

  $scheduler.addEventListener("click", (e) => {
    const $scheduleDelete = e.target.closest(".delete");
    if (!$scheduleDelete) return;
    onDelete($scheduleDelete.parentNode.children[0].textContent);
  });
}
