<script>
import Specials from '@/components/Specials.vue';
import Goods from '@/components/Goods.vue';

export default {
    name: 'mainPage',
    components: {Specials, Goods},
    data() {
    return {
      promos: {},// объект с промо-акциями
      message: ''
    };
  },

  async asyncData() {
    try {

      const response = await fetch(process.env.baseUrl+'/promo', { // запрос ко всем промо-акциям
        method: "GET",
      });

      // парсим ответ
      const data = await response.json();

      // возвращаем дату в объект с акциями
      return { promos: data }; 
    } catch (error) {
        // в случае оишбки вывод ошибки в консоль
      console.error("Error in asyncData:", error); 
      // возврат пустого объекта с акциями
      return { promos: {} }; 
    }
  },
  computed: {
  isPromosAvailable() {
    return this.promos?.promos?.length >= 3;
  },
}
}
</script>

<template>
    <div>
        <div class="default-page">
            <main class=" index-page">
                <section class="container">
                    <div class="promos-into">
                        <div class="promos-into-list" v-if="isPromosAvailable" >
                            <div class="promos-into-list-firts">
                                <a :href="'/promos/'+promos.promos[2].id" class="promos-into-list-link">
                                    <img :src="'https://sklad-zdorovo.ru'+ promos.promos[2].image" loading="lazy" :alt="promos.promos[2].title">
                                </a>
                            </div>
                            <div class="promos-into-list-second">
                                <a :href="'/promos/'+promos.promos[0].id" class="promos-into-list-link">
                                    <img :src="'https://sklad-zdorovo.ru' + promos.promos[0].image" loading="lazy" :alt="promos.promos[0].title">
                                </a>
                            </div>
                            <div class="promos-into-list-third">
                                <a :href="'/promos/'+promos.promos[1].id" class="promos-into-list-link">
                                    <img :src="'https://sklad-zdorovo.ru' + promos.promos[1].image" loading="lazy" :alt="promos.promos[1].title">
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                <Specials/>
                <Goods/>
            </main>
        </div>
    </div>
</template>

<style scoped>
.popup-chat {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 9999;
}

.close-chat {
  position: absolute;
  top: 5px;
  right: 5px;
}

.chat-messages {
  max-height: 200px;
  overflow-y: auto;
}

.chat-input {
  width: 80%;
  margin-right: 10px;
}

.send-button {
  padding: 5px 10px;
}

.open-chat{
  cursor: pointer;
  position: absolute;
}
</style>