# 허산의 블로그 (Astro)

Astro로 만든 정적 블로그입니다. 모든 글은 `src/content/blog/` 폴더 안의
마크다운 파일로 관리됩니다. 새 글 추가·기존 글 수정·게시 전 과정을 자동화하기 쉽습니다.

---

## 1. 폴더 구조 한눈에 보기

```
블로그/
├─ src/
│  ├─ content/blog/      ← 여기에 글(.md)을 넣으면 자동으로 블로그에 올라감
│  │   ├─ welcome.md
│  │   └─ markdown-guide.md
│  ├─ pages/            ← 홈, 글 목록, 소개 페이지
│  ├─ layouts/          ← 글 페이지 디자인
│  ├─ components/       ← 헤더, 푸터 등 공통 부품
│  ├─ styles/global.css ← 색상·폰트 등 전체 디자인
│  └─ consts.ts         ← 사이트 제목/설명 (여기서 이름 바꾸기)
├─ public/              ← 파비콘, 이미지 등 정적 파일
├─ astro.config.mjs     ← 사이트 주소(site) 설정
└─ package.json
```

가장 자주 건드릴 곳은 **`src/content/blog/`(글)** 와 **`src/consts.ts`(사이트 이름)** 둘뿐입니다.

---

## 2. 새 글 쓰는 법

`src/content/blog/` 안에 `.md` 파일을 하나 만들고, 맨 위에 아래 형식을 붙입니다.

```markdown
---
title: '글 제목'
description: '검색·미리보기에 쓰이는 한 줄 요약'
pubDate: 2026-07-06
tags: ['태그1', '태그2']
---

여기부터 본문을 마크다운으로 씁니다.
```

- `title`, `description`, `pubDate` 는 필수입니다.
- `updatedDate: 2026-07-10` 을 추가하면 글에 "수정" 날짜가 표시됩니다.
- 파일 이름(예: `my-post.md`)이 곧 주소가 됩니다 → `/blog/my-post/`

## 3. 기존 글 수정하는 법

해당 `.md` 파일을 열어 내용을 고치고 저장하면 됩니다. 게시(4번)하면 반영됩니다.

---

## 4. 배포 — 인터넷에 올리기 (한 번만 설정)

가장 추천하는 방식은 **GitHub + Vercel** 조합입니다. 한 번 연결해두면,
이후에는 파일을 고치고 올리기만 하면 사이트가 **자동으로** 갱신됩니다.

1. GitHub에 이 폴더를 저장소로 올립니다. (`git init` → `git push`)
2. [vercel.com](https://vercel.com) 에 GitHub으로 로그인 → 이 저장소를 Import.
3. Vercel이 Astro를 자동 인식합니다. 그대로 Deploy.
4. `블로그.vercel.app` 같은 주소가 생기고, 이후 GitHub에 올릴 때마다 자동 배포됩니다.

> 배포 후, `astro.config.mjs` 의 `site:` 값을 실제 주소로 바꿔주세요.
> (RSS·사이트맵·SEO에 사용됩니다.)

Netlify, GitHub Pages도 같은 방식으로 가능합니다. 원하시면 세팅을 도와드릴게요.

---

## 5. "자동화" — 앞으로 이렇게 쓰시면 됩니다

이 블로그의 자동화 핵심은 **글이 전부 파일이라는 점**입니다. 그래서 저(Claude)에게
이렇게 말씀하시면 제가 파일을 직접 만들고 고칩니다.

- "OO 주제로 블로그 글 하나 써줘" → 제가 `src/content/blog/`에 새 `.md`를 작성
- "welcome 글 마지막 문단 고쳐줘" → 제가 해당 파일을 수정
- "지난주에 쓴 글 제목 좀 다듬어줘" → 제가 찾아서 수정
- "새 글 쓰고 배포까지 해줘" → 작성 후 git으로 올리면 Vercel이 자동 게시

4번 배포 연결까지 해두면, 이 흐름이 **작성 → 저장 → 자동 게시**로 완전히 이어집니다.

---

## 6. 로컬에서 미리보기 (선택)

컴퓨터에서 직접 확인하고 싶다면 터미널에서:

```bash
npm install      # 최초 1회 (의존성 설치)
npm run dev      # http://localhost:4321 에서 미리보기
npm run build    # 게시용 정적 파일 생성 (dist/ 폴더)
```

`npm install` 시 `node_modules/` 폴더가 생기는데, 이건 배포할 때 자동 생성되므로
GitHub에 올리지 않습니다. (`.gitignore`에 이미 설정돼 있습니다.)
