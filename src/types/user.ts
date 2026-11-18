import type { Id, LocalDateTime } from "./common";

/** 다른 타입에 끼워 쓰는 최소 사용자 정보. 알림 actor, 채팅 참여자 등. */
export interface UserSummary {
  userId: Id;
  /** UK, 최대 20자. 친구 검색·초대 링크에 사용. */
  nickname: string;
}

/** `GET /users/me`, `PATCH /users/me`, `PUT /users/me/profile-image` 응답. */
export interface UserProfile extends UserSummary {
  profileImageUrl: string | null;
  /** 최대 50자. */
  statusMessage: string | null;
  /**
   * 초기 설정 완료 전에는 서버에 값이 없음.
   * 초기 설정은 필수이고 완료 전엔 `/users/me`를 부르는 화면에 들어갈 수 없으므로 non-null로 둠.
   */
  studentId: string;
  /**
   * 초기 설정 완료 전에는 서버에 값이 없음.
   * 초기 설정은 필수이고 완료 전엔 `/users/me`를 부르는 화면에 들어갈 수 없으므로 non-null로 둠.
   */
  department: string;
  /** 가입 일시 */
  createdAt: LocalDateTime;
  // TODO: marketingAgreed, marketingAgreedAt — 응답 포함 여부 백엔드 확인 중
  // profileCompleted: 초기 설정 여부를 서버에서 받아올 경우 추가
}
