import type { Id } from "./common";
import type { ClassTime } from "./timetable";

/**
 * `GET /friends` 응답의 친구 1명. 닉네임 가나다순.
 * 공강 여부·남은 공강 시간은 서버가 주지 않으므로 `todayClasses`로 FE가 계산.
 */
export interface Friend {
  /** 친구의 유저 ID */
  friendId: Id;
  /** 친구 관계 ID */
  friendshipId: Id;
  /** 닉네임 */
  nickname: string;
  /** 오늘(KST) 수업 목록. 시작 시각 오름차순, 수업이 없으면 빈 배열. */
  todayClasses: ClassTime[];
}

/**
 * 친구 요청 처리 상태.
 * 친구 요청 API와 알림(`FRIEND_REQUEST`의 `requestStatus`)이 같이 쓴다.
 */
export type FriendRequestStatus = "PENDING" | "ACCEPTED" | "REJECTED";
