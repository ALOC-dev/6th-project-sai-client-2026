import type { DayOfWeek, Id, LocalDateTime, LocalTime, Semester } from "./common";

/**
 * 수업 시작·종료 시각. 공강 계산의 기본 단위.
 * 친구 목록의 `todayClasses`와 시간표 항목이 같이 쓴다.
 */
export interface ClassTime {
  /** 수업 시작 시각 (KST) */
  startTime: LocalTime;
  /** 수업 종료 시각 (KST) */
  endTime: LocalTime;
}

/** 시간표 항목에 붙는 건물 정보. 위도·경도가 있는 전체 건물 정보는 건물 목록 API에서만 씀. */
export interface BuildingSummary {
  buildingId: Id;
  buildingName: string;
}

/** 시간표의 수업 1건. */
export interface TimetableItem extends ClassTime {
  timetableItemId: Id;
  /** 연결된 학교 과목(분반) ID. 직접 입력한 수업은 null. */
  courseId: Id | null;
  /** 교과목번호. 직접 입력한 수업은 null. */
  subjectNo: string | null;
  /** 분반번호. 직접 입력한 수업은 null. */
  dvclNo: string | null;
  /** 과목명. 최대 50자. */
  courseName: string;
  /** 요일 */
  dayOfWeek: DayOfWeek;
  /** 건물. 입력하지 않았으면 null. */
  building: BuildingSummary | null;
  /** 강의실. 최대 50자. 입력하지 않았으면 null. */
  room: string | null;
}

/** `GET /timetables/me`, `GET /friends/{friendId}/timetable` 응답. */
export interface Timetable {
  /** 시간표가 아직 없으면 null (items는 빈 배열). */
  timetableId: Id | null;
  /** 연도 */
  academicYear: number;
  /** 학기 */
  semester: Semester;
  /** 시간표 마지막 수정 일시. 시간표가 없으면 null. `today=true`여도 시간표 전체 기준. */
  updatedAt: LocalDateTime | null;
  /** 요일·시작 시각순. `today=true`면 오늘 요일(KST) 수업만. */
  items: TimetableItem[];
}
