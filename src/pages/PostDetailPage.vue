<script setup></script>

<template>
  <article class="post-detail">
    <header>
      <p class="post-category">카테고리</p>
      <h1>게시글 제목</h1>
      <p class="post-meta">작성자 · 작성일</p>
    </header>

    <section class="post-content">
      <p>본문 내용 표시 영역입니다.</p>
    </section>

    <section class="post-actions">
      <button type="button">수정</button>
      <button type="button">삭제</button>
      <button type="button">신고</button>
    </section>

    <section class="post-comments">
      <h2>댓글</h2>
      <p>댓글 컴포넌트를 연결할 예정입니다.</p>
    </section>
  </article>
</template>

<style scoped>
.post-detail {
  max-width: 720px;
  margin: 0 auto;
  padding: 32px 16px;
}

.post-category {
  font-size: 14px;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.post-meta {
  color: #6b7280;
  font-size: 14px;
}

.post-content {
  margin: 24px 0;
  line-height: 1.7;
}

.post-actions {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

.post-comments {
  border-top: 1px solid #e5e7eb;
  padding-top: 16px;
}
</style>
