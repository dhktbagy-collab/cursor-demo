# cursor-demo

멤버 목록에서 이메일을 추출·검증하는 Node.js 유틸리티 프로젝트입니다.

## 실행 방법

```bash
npm test
```

## API

| 함수 | 설명 |
|------|------|
| `extractEmails(members)` | 멤버 객체 배열에서 이메일 목록 추출 |
| `isValidEmail(email)` | RFC 5322 기준 이메일 형식 검증 |
| `getValidEmails(members)` | 유효한 이메일만 필터링 (앞뒤 공백 제거) |
| `getUniqueValidEmails(members)` | 유효 이메일 중복 제거 (대소문자 무시) |

구현: [`src/email.js`](src/email.js)

---

## 릴리스 노트

### v1.0.0 (2026-06-30)

**멤버 목록에서 RFC 5322 기준으로 이메일을 검증·추출하는 유틸과 Cursor 개발 도구를 첫 릴리스합니다.**

#### ✨ 기능

- **이메일 검증·추출 유틸** (`src/email.js`)
  - `extractEmails` — 멤버 객체 배열에서 이메일 목록 추출
  - `isValidEmail` — RFC 5322 정규식 기반 형식 검증 (앞뒤 공백 trim)
  - `getValidEmails` — 유효한 이메일만 필터링
  - `getUniqueValidEmails` — 유효 이메일 중복 제거 (대소문자 무시, 최초 등장 순서 유지)
- **단위 테스트** (`src/email.test.js`) — 7개 테스트, `npm test`로 실행

#### 🧹 기타

- **Cursor 코딩 규칙** (`.cursor/rules/coding-style.mdc`) — 한국어 주석/커밋, JSDoc, ES Module 사용 규칙
- **PR 준비 커맨드** (`.cursor/commands/prep-pr.md`) — `/prep-pr`로 테스트·요약·커밋 메시지 점검
- **릴리스 노트 스킬** (`.cursor/skills/release-notes/`) — 태그/커밋 구간 커밋 수집 및 한국어 릴리스 노트 작성 워크플로
- **`package.json`** — `test` 스크립트를 `node --test src/email.test.js`로 설정
