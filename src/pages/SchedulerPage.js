import Button from "../components/Button.js";
import ScheduleModal from "../components/ScheduleModal.js";
import Scheduler from "../components/Scheduler.js";

export default function SchedulerPage({ $target, initialState }) {
  this.state = {
    schedule: initialState,
  };
  this.setState = (nextState) => {
    this.state.schedule = nextState;

    scheduler.setState(this.state.schedule);
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
    initialState: this.state.schedule,
    onDelete: (name) => {
      if (!confirm(`${name} 과목을 삭제하시겠습니까?`)) return;
      const changedSchedule = { ...this.state.schedule };
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
    initialState: this.state.schedule,
    onSubmit: (state) => {
      this.setState(state);
    },
  });
}
