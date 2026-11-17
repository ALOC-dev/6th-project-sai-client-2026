/** 서버 Long ID. */
export type Id = number;

/**
 * 서버 일시 문자열 `yyyy-MM-dd'T'HH:mm:ss`. 시간대 정보 없이 KST 기준.
 * `new Date()`로 바로 파싱하지 말고 공용 날짜 함수를 거칠 것.
 * @example "2026-10-06T10:00:00"
 */
export type LocalDateTime = string;

/**
 * 서버 시각 문자열 `HH:mm` (KST).
 * @example "09:00"
 */
export type LocalTime = string;

export type DayOfWeek = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

export type Semester = "FIRST" | "SECOND";

/** 커서 방식 목록 조회의 쿼리 파라미터. */
export interface CursorParams {
  /** 이전 응답의 nextCursor. 첫 요청에서는 생략. */
  cursor?: Id;
  size?: number;
}

/**
 * 커서 방식 목록 응답. 목록 키 이름이 API마다 달라서 키를 인자로 받는다.
 * @example CursorResponse<"notifications", Notification>
 *   → { notifications: Notification[]; nextCursor: number | null }
 */
export type CursorResponse<K extends string, T> = {
  [P in K]: T[];
} & {
  /** 다음 페이지 커서. 마지막 페이지면 null */
  nextCursor: Id | null;
};
