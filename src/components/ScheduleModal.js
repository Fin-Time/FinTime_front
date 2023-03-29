import Button from "./Button.js";
import TimePlaceSelector from "./TimePlaceSelector.js";

export default function ScheduleModal({ $target, initialState, onSubmit }) {
  const $dialog = document.createElement("dialog");
  $target.appendChild($dialog);

  const $form = document.createElement("form");
  $form.setAttribute("method", "dialog");
  $dialog.appendChild($form);

  this.state = initialState;
  this.setState = ({ day, name, place, start_time, end_time }) => {
    this.state.schedule[day].push({
      name,
      place,
      start_time,
      end_time,
    });
    this.state.subjectNames.push(name);
  };

  this.open = () => {
    $dialog.showModal();
  };

  const getTime = (target, isStart, isHour) => {
    return target.querySelector(
      `.time_select__${isStart ? "start" : "end"}_${
        isHour ? "hour" : "minutes"
      }`
    );
  };

  const timeValidation = (target, isStart, times) => {
    const checkedDay = Array.from(target.getElementsByClassName("day")).filter(
      (it) => it.checked === true
    )[0].classList[1];

    const hour = getTime(target, isStart, true).value;
    const min = getTime(target, isStart, false).value;
    const start = parseFloat(hour) + (min === "00" ? 0 : 0.5);
    for (const cur of this.state.schedule[checkedDay]) {
      const validate_startTime = parseFloat(cur["start_time"]);
      const validate_endTime = parseFloat(cur["end_time"]);
      for (let i = validate_startTime; i < validate_endTime; i += 0.5) {
        if (i === start) {
          alert("겹치는 시간이 존재합니다");
          getTime(target, isStart, true).focus();
          return false;
        }
      }
    }

    for (const cur of times) {
      const validate_day = cur[0];
      const validate_startTime = cur[1];
      const validate_endTime = cur[2];
      if (checkedDay !== validate_day) continue;
      for (let i = validate_startTime; i < validate_endTime; i += 0.5) {
        if (i === start) {
          alert("위에서 작성한 시간표와 겹치는 시간이 존재합니다.");
          getTime(target, isStart, true).focus();
          return false;
        }
      }
    }
    return true;
  };

  const inputValidation = () => {
    // 과목명 체크
    const newSubjectName = document.getElementById("newSubject");
    if (newSubjectName.value === "") {
      alert("과목명을 입력해주세요.");
      newSubjectName.focus();
      return false;
    }
    if (this.state.subjectNames.includes(newSubjectName.value)) {
      alert("이미 존재하는 과목입니다.");
      newSubjectName.focus();
      return false;
    }

    const subjectUnits = document.getElementsByClassName("timeAndPlace");
    const times = [];

    for (const v of Array.from(subjectUnits)) {
      let start = parseFloat(getTime(v, true, true).value);
      start += getTime(v, true, false).value === "00" ? 0 : 0.5;
      let end = parseFloat(getTime(v, false, true).value);
      end += getTime(v, false, false).value === "00" ? 0 : 0.5;

      //시간 범위 체크
      if (start >= end) {
        alert("올바르지 않은 시간 범위 입력입니다.");
        getTime(v, false, true).focus();
        return false;
      }

      //겹치는 시간 체크
      if (!timeValidation(v, true, times)) return false;
      if (!timeValidation(v, false, times)) return false;

      //강의 건물 체크
      const newSubjectBuildingSelect = v.getElementsByClassName(
        "place_select__building"
      )[0];
      const newSubjectBuilding =
        newSubjectBuildingSelect.options[newSubjectBuildingSelect.selectedIndex]
          .value;
      if (newSubjectBuilding === "default") {
        alert("강의 건물을 선택해주세요.");
        newSubjectBuildingSelect.focus();
        return;
      }

      //강의실 체크
      const newSubjectPlace = v.getElementsByClassName("place")[0];
      if (newSubjectPlace.value === "") {
        alert("강의실을 입력해주세요.");
        newSubjectPlace.focus();
        return false;
      }

      const checkedDay = Array.from(v.getElementsByClassName("day")).filter(
        (it) => it.checked === true
      )[0].classList[1];
      times.push([checkedDay, start, end]);
    }

    return true;
  };

  const getInput = () => {
    const newSubjectName = document.getElementById("newSubject").value;
    const subjectUnits = document.getElementsByClassName("timeAndPlace");
    for (const v of Array.from(subjectUnits)) {
      const checkedDay = Array.from(v.getElementsByClassName("day")).filter(
        (it) => it.checked === true
      )[0].classList[1];

      let start = parseFloat(getTime(v, true, true).value);
      start += getTime(v, true, false).value === "00" ? 0 : 0.5;
      let end = parseFloat(getTime(v, false, true).value);
      end += getTime(v, false, false).value === "00" ? 0 : 0.5;

      const newSubjectBuildingSelect = v.getElementsByClassName(
        "place_select__building"
      )[0];
      const newSubjectBuilding =
        newSubjectBuildingSelect.options[newSubjectBuildingSelect.selectedIndex]
          .value;

      const newSubjectPlace = v.getElementsByClassName("place")[0].value;
      const place = newSubjectBuilding + newSubjectPlace;
      this.setState({
        day: checkedDay,
        name: newSubjectName,
        place: place,
        start_time: start,
        end_time: end,
      });
    }
  };

  const clearInput = () => {
    document.getElementById("newSubject").value = "";
    const subjectUnits = document.getElementsByClassName("timeAndPlace");
    while (subjectUnits[0].nextSibling !== null) {
      subjectUnits[0].parentNode.removeChild(subjectUnits[0].nextSibling);
    }
    subjectUnits[0].getElementsByClassName("monday")[0].checked = true;
    subjectUnits[0].getElementsByClassName(
      "time_select__start_hour"
    )[0].options[0].selected = true;
    subjectUnits[0].getElementsByClassName(
      "time_select__start_minutes"
    )[0].options[0].selected = true;
    subjectUnits[0].getElementsByClassName(
      "time_select__end_hour"
    )[0].options[1].selected = true;
    subjectUnits[0].getElementsByClassName(
      "time_select__end_minutes"
    )[0].options[0].selected = true;
    subjectUnits[0].getElementsByClassName(
      "place_select__building"
    )[0].options[0].selected = true;

    subjectUnits[0].getElementsByClassName("place")[0].value = "";
  };

  let count = 0;
  this.render = () => {
    $form.innerHTML = `
      <h3 id="scheduleModal__header">시간표 수업 추가</h3>
      <span id="scheduleModal__subject_name">
        <label for="newSubject">과목명</label>
        <input
          type="text"
          placeholder="ex) 기초글쓰기"
          id="newSubject"
          required
        />
      </span>
    `;

    new Button({
      $target: $form,
      text: "+ 시간/장소 추가",
      type: "add",
      onClick: () => {
        new TimePlaceSelector({
          $target: $form,
          number: ++count,
        });
      },
    });

    new Button({
      $target: $form,
      text: "취소",
      type: "cancel",
      onClick: () => {
        clearInput();
        $dialog.close();
      },
    });

    new Button({
      $target: $form,
      text: "완료",
      type: "confirm",
      onClick: () => {
        if (!inputValidation()) return;
        getInput();
        clearInput();
        $dialog.close();
        onSubmit(this.state);
      },
    });

    new TimePlaceSelector({
      $target: $form,
      number: ++count,
    });
  };

  this.render();
}
