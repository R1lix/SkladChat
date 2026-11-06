<template>
    <div>
      <main class="promos-page page">
          <header class="page-header container">
              <div itemtype="http://schema.org/BreadcrumbList" itemscope="itemscope" class="ui-breadcrumbs text text_weight_medium page-header__breadcrumbs text text_size_caption">
                  <ul class="ui-breadcrumbs__list">
                      <li itemprop="itemListElement" itemtype="https://schema.org/ListItem" itemscope="itemscope" class="ui-breadcrumbs__item">
                          <a href="/" class="ui-link link-active ui-link_theme_primary" tabindex="0" itemprop="item">
                              <span class="ui-link__text">
                                  <span itemprop="name">
                                      Главная
                                  </span>
                                  <meta itemprop="position" content="1">
                              </span> <!----></a>
                      </li>
                      <li itemprop="itemListElement" itemtype="https://schema.org/ListItem" itemscope="itemscope" class="ui-breadcrumbs__item">
                          <span itemprop="item">
                              <span itemprop="name">Акции</span>
                              <meta itemprop="position" content="2">
                          </span>
                      </li>
                  </ul>
              </div>
              <h1 class="text text_size_display-2 text_weight_bold">Акции</h1>
          </header>
          <section class="content-section container">
              <div class="promos-grid">
                  <ul class="promos-grid__inner">
                      <li class="promos-grid__cell" v-for="(promo, index) in promos.promos" :key="index" >
                      <div class="promo-card">
                          <div class="promo-card__preview">
                          <a :href="'/promos/'+ promo.id" class="promo-preview" :aria-label="promo.title">
                              <img :src="'https://sklad-zdorovo.ru' + promo.image" loading="lazy" :alt="promo.title" class="promo-preview__image">
                          </a> 
                          </div>
                          <div class="promo-card__details">
                          <a :href="'/promo'" class="promo-card__link text text_size_lead text_weight_bold">
                              {{ promo.title }}
                          </a>
                          <div class="promo-card__date text text_size_small">
                              {{ promo.dateStart }} — {{ promo.dateEnd }}
                          </div>
                          </div>
                      </div>
                      </li>
                  </ul>
              </div>
              <div class="ui-pagination text text_weight_medium promos-page__pagination">               
              </div>
          </section>
          <Specials/>
      </main>
    </div>
  </template>
  
  <script>
  import moment from 'moment';
  import Specials from '@/components/Specials.vue';
  
  export default {
    name: 'IndexPage',
    components: {Specials},
    title: 'Акции',
    data() {
      return {
        promos: {},
      };
    },
    async asyncData(){
        try {
            
            // выполнение запросов, парсинг ответа и преобразование даны в нужный формат
              const response = await fetch(process.env.baseUrl+'/promo', {
                  method: "GET",
              });
  
              const data = await response.json();   
  
              data.promos.forEach(promo => {
                  promo.dateStart = moment(promo.dateStart).format('DD.MM.YYYY');
                  promo.dateEnd = moment(promo.dateEnd).format('DD.MM.YYYY');
              });

              // возвращаем данные на страницу
              return {promos: data}
          } 
          catch (error) {
              console.error("Error in fetchData:", error);
          }
    },
  };
  </script>