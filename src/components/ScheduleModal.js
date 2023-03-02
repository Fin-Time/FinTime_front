import Button from "./Button.js";
import TimePlaceSelector from "./TimePlaceSelector.js";

export default function ScheduleModal({ $target, initialState, onSubmit }) {
  const $dialog = document.createElement("dialog");
  $target.appendChild($dialog);

  const $form = document.createElement("form");
  $form.setAttribute("method", "dialog");
  $dialog.appendChild($form);

  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
  };

  const placeCoordinate = {
    "공대 1호관": [36.367604, 127.344857],
    "공대 2호관": [36.3643, 127.3463],
    "공대 3호관": [36.3652, 127.3466],
    "공대 4호관": [36.3649, 127.3474],
    "공대 5호관": [36.36649, 127.344484],
    사회과학대학: [36.3664, 127.3422],
    교양관: [36.3679, 127.3406],
    인문대학: [36.3683, 127.342],
    사범대학: [36.3684, 127.3404],
    "자연과학대학 1호관": [36.3694, 127.3436],
    "자연과학대학 2호관": [36.3698, 127.3432],
    "자연과학대학 3호관": [36.3663, 127.34],
    "자연과학대학 4호관": [36.3669, 127.3401],
    경상대학: [36.3675, 127.3461],
    약학대학: [36.369, 127.3432],
    예술대학: [36.371, 127.3438],
    생활과학대학: [36.3763, 127.3432],
    생명시스템과학대학: [36.3759, 127.3438],
    "농업생명과학대학 1호관": [36.3696, 127.352],
    "농업생명과학대학 2호관": [36.3704, 127.3529],
    "농업생명과학대학 3호관": [36.3703, 127.3518],
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
    let retVal = "";
    for (const place in placeCoordinate) {
      retVal += `<option value=${place}>${place}</option>`;
    }
    return retVal;
  };

  this.open = () => {
    $dialog.showModal();
  };

  const inputValidation = () => {};

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
        $dialog.close();
      },
    });

    new Button({
      $target: $form,
      text: "완료",
      type: "confirm",
      onClick: () => {
        const newSubjectName = document.getElementById("newSubject");
        if (newSubjectName.value === "") {
          alert("괴목명을 입력해주세요.");
          newSubjectName.focus();
          return;
        }
        const subjectUnits = document.getElementsByClassName("timeAndPlace");
        console.log(Array.from(subjectUnits));
        Array.from(subjectUnits).forEach((v, idx) =>
          console.log(v.getElementById(`place${++idx}`))
        );
        console.log(this.state);
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
