import Button from "../components/Button.js";
import ScheduleModal from "../components/ScheduleModal.js";
import Scheduler from "../components/Scheduler.js";
import { setItem } from "../utils/storage.js";
import { config } from "../Keys.js";

export default function SchedulerPage({ $target, initialState }) {
  this.state = initialState;
  this.setState = (nextState) => {
    this.state = nextState;
    scheduler.setState(this.state);
    setItem(config.STORAGE_KEY, this.state);
  };

  new Button({
    $target,
    text: "과목 추가",
    type: "open_modal_box",
    onClick: () => {
      scheduleModal.open();
    },
  });

  const scheduler = new Scheduler({
    $target,
    initialState: this.state,
    onDelete: (name) => {
      if (!confirm(`${name} 과목을 삭제하시겠습니까?`)) return;
      const changedSchedule = { ...this.state };
      for (const key in changedSchedule) {
        changedSchedule[key].forEach((cur, idx) => {
          if (cur.name === name) {
            changedSchedule[key].splice(idx, 1);
          }
        });
      }
      this.setState({
        ...changedSchedule,
      });
    },
  });

  const scheduleModal = new ScheduleModal({
    $target,
    initialState: this.state,
    onSubmit: (state) => {
      this.setState(state);
    },
  });
}
