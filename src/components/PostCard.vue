<script setup>
const props = defineProps({
  title: { type: String, default: "게시글 제목" },
  excerpt: { type: String, default: "내용 요약이 여기 들어갑니다." },
  author: { type: String, default: "작성자" },
  category: { type: String, default: "DEV" },
  createdAt: { type: String, default: "2025-01-01" },
});
</script>

<template>
  <article class="post-card">
    <header>
      <span class="category">{{ props.category }}</span>
      <h3>{{ props.title }}</h3>
    </header>
    <p class="excerpt">{{ props.excerpt }}</p>
    <footer>
      <span>{{ props.author }}</span>
      <span>{{ props.createdAt }}</span>
    </footer>
  </article>
</template>

<style scoped>
.post-card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.category {
  font-size: 12px;
  letter-spacing: 0.08em;
  color: #6b7280;
}

.excerpt {
  color: #4b5563;
}

footer {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #6b7280;
}
</style>
