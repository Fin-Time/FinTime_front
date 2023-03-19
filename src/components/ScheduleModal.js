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
    this.state[day].push({
      name,
      place,
      start_time,
      end_time,
    });
  };

  const placeCoordinate = {
    공대1호관: [36.367604, 127.344857],
    공대2호관: [36.3643, 127.3463],
    공대3호관: [36.3652, 127.3466],
    공대4호관: [36.3649, 127.3474],
    공대5호관: [36.36649, 127.344484],
    사회과학대학: [36.3664, 127.3422],
    교양관: [36.3679, 127.3406],
    인문대학: [36.3683, 127.342],
    사범대학: [36.3684, 127.3404],
    자연과학대학1호관: [36.3694, 127.3436],
    자연과학대학2호관: [36.3698, 127.3432],
    자연과학대학3호관: [36.3663, 127.34],
    자연과학대학4호관: [36.3669, 127.3401],
    경상대학: [36.3675, 127.3461],
    약학대학: [36.369, 127.3432],
    예술대학: [36.371, 127.3438],
    생활과학대학: [36.3763, 127.3432],
    생명시스템과학대학: [36.3759, 127.3438],
    농업생명과학대학1호관: [36.3696, 127.352],
    농업생명과학대학2호관: [36.3704, 127.3529],
    농업생명과학대학3호관: [36.3703, 127.3518],
    법과대학: [36.3767, 127.345],
    "테니스장(종합)": [36.3747, 127.3434],
    "테니스장(체육관앞)": [36.3713, 127.3425],
    음악1호관: [36.3731, 127.3441],
    음악2호관: [36.3739, 127.3442],
    종합운동장: [36.3731, 127.3426],
    실내체육관: [36.3716, 127.3416],
    골프연습장: [36.3716, 127.3483],
  };

  const place = () => {
    let retVal = "<option value=default hidden>===강의실 건물===</option>";
    for (const place in placeCoordinate) {
      retVal += `<option value=${place}>${place}</option>`;
    }
    return retVal;
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
    for (const cur of this.state[checkedDay]) {
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
      <h3>시간표 수업 추가</h3>
      <label for="newSubject">과목명</label>
      <input
        type="text"
        placeholder="ex) 기초글쓰기"
        id="newSubject"
        required
      />
    `;

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

    new Button({
      $target: $form,
      text: "+ 시간/장소 추가",
      type: "add",
      onClick: () => {
        new TimePlaceSelector({
          $target: $form,
          number: ++count,
          place,
        });
      },
    });

    new TimePlaceSelector({
      $target: $form,
      number: ++count,
      place,
    });
  };

  this.render();
}
