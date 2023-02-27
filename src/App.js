import Scheduler from "./components/Scheduler.js";

const DUMMY_DATA = {
  monday: [
    {
      name: "헌법",
      place: "사강404",
      start_time: "9",
      end_time: "12",
    },
    {
      name: "인공지능과 미래사회",
      place: "교307",
      start_time: "13.5",
      end_time: "15",
    },
  ],
  tuesday: [
    {
      name: "노사관계론",
      place: "경N411",
      start_time: "10",
      end_time: "12",
    },
    {
      name: "자료구조",
      place: "공5414",
      start_time: "14",
      end_time: "16",
    },
    {
      name: "인공지능과 미래사회",
      place: "공5410",
      start_time: "16",
      end_time: "17.5",
    },
  ],
  wednesday: [
    {
      name: "자료구조",
      place: "공5405",
      start_time: "10",
      end_time: "12",
    },
    {
      name: "영미문예사조",
      place: "인0465",
      start_time: "13",
      end_time: "15",
    },
    {
      name: "열역학",
      place: "공4414",
      start_time: "16",
      end_time: "18",
    },
  ],
  thursday: [
    {
      name: "영미문예사조",
      place: "인0465",
      start_time: "10",
      end_time: "11",
    },
    {
      name: "노사관계론",
      place: "경N411",
      start_time: "11",
      end_time: "12",
    },
    {
      name: "열역학",
      place: "공4414",
      start_time: "13",
      end_time: "14",
    },
    {
      name: "동물생명정보분석및실습",
      place: "농2202",
      start_time: "16",
      end_time: "18",
    },
  ],
  friday: [
    {
      name: "동물생명정보분석및실습",
      place: "농2202",
      start_time: "15",
      end_time: "17",
    },
  ],
};

export default function App({ $target }) {
  new Scheduler({
    $target,
    initialState: DUMMY_DATA,
    onDelete: (name) => {},
  });
}
