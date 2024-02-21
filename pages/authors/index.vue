<template>
  <div class="content">
    <h1>Наши авторы</h1>
    <div class="author">
        <img src="/authors/1.png" alt="author1">
        <div class="author-info">
            <div class="author-name">Алексей Иванов</div>
            <div class="author-bio">
              Ведущий разработчик с более чем 10-летним опытом в программировании на Python. Алексей разработал множество успешных проектов и является автором курса "Основы программирования для начинающих".
            </div>
        </div>
    </div>
    <div class="author">
        <img src="/authors/2.png" alt="author2">
        <div class="author-info">
            <div class="author-name">Мария Сергеева</div>
            <div class="author-bio">
              Профессиональный фотограф с более чем 15-летним опытом. Мария провела множество мастер-классов и экспедиций и является автором курса "Основы фотографии".
            </div>
        </div>
    </div>
    <div class="author">
        <img src="/authors/3.png" alt="author3">
        <div class="author-info">
            <div class="author-name">Дмитрий Васильев</div>
            <div class="author-bio">
              Эксперт в области цифрового маркетинга с более чем 12-летним опытом. Дмитрий помог многим компаниям вывести их бизнес на новый уровень и является автором курса "Основы цифрового маркетинга".
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
useHead({ title: `EE | Авторы` })
</script>

<style scoped>
.author {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}
.author img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    margin-right: 20px;
}
.author-info {
    flex: 1;
}
.author-name {
    font-size: 20px;
    font-weight: bold;
}
.author-bio {
    margin-top: 5px;
    font-size: 16px;
}
</style>