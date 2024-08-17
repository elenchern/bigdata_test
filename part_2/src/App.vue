<template>
  <div>
    <h1>Информация о входах</h1>
    <table>
      <thead>
        <tr>
          <th>Ссылĸа на сайт</th>
          <th>Время, ĸогда был заход на сайт</th>
          <th>IP</th>
          <th>USER_AGENT</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entrance in entrances" :key="entrance.id" @click="openModal(entrance)">
          <td>{{ entrance.url }}</td>
          <td>{{ entrance.datetime }}</td>
          <td>{{ entrance.ip }}</td>
          <td>{{ entrance.user_agent }}</td>
        </tr>
      </tbody>
    </table>
    <div class="modal__container">
      <modal v-if="isModalOpen" @close="closeModal">
          <h3>Данные о входе</h3>
          <div class="entrance__container">
            <p>Браузер: {{ selectedEntrance.browser }}</p>
            <p>Девайс: {{ selectedEntrance.device }}</p>
            <p>Платформа (OS): {{ selectedEntrance.operating_system }}</p>
            <p>Время нахождение на сайте: {{ selectedEntrance.time_spent }} сек</p>
            <p>Маĸсимальный процент сĸролла: {{ selectedEntrance.max_scroll }}</p>
            <p>История ĸлиĸов: {{ selectedEntrance.history_click }}</p>
          </div>
          <button @click="closeModal">Закрыть</button>
      </modal>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      entrances: [], // Создаем массив для хранения данных
      isModalOpen: false,
      selectedEntrance: null,
    };
  },
  mounted() {
    this.fetchEntrances(); // Вызываем метод при загрузке компонента
  },
  methods: {
    async fetchEntrances() {
      try {
        const response = await fetch('http://bigdata-2/getEntrances.php');
        this.entrances = await response.json(); // Записываем ответ в массив entrances
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    },
    openModal(entrance) {
      this.selectedEntrance = entrance;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedEntrance = null;
    },
  }
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}
th{
  background-color: #0170b5;
  color: white;
}
tr:nth-child(even){
  background-color: #f2f2f2;
}
td, th {
  padding: 10px;
  text-align: left;
}
td:first-child, th:first-child {
  border-left: none;
}
h1 {
  margin-bottom: 50px;
  text-align: center;
}

.modal__container:has(.entrance__container) {
  background-color: rgb(0 0 0 / 30%);
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
}
modal {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  max-width: 700px;
  width: 90%;
}

modal h3 {
  font-size: 20px;
  text-align: center;
}

modal button {
  background-color: rgb(102, 18, 18);
  color: #fff;
  border: 0;
  border-radius: 7px;
  width: 300px;
  max-width: 100%;
  padding: 10px;
  margin: auto;
  margin-top: 40px;
  display: block;
  cursor: pointer;
}
</style>