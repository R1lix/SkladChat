<template>
    <div class="layout-default__page">
        <main class="promo-details-page page">
            <div itemtype="http://schema.org/BreadcrumbList" itemscope="itemscope" class="ui-breadcrumbs text text_weight_medium text text_size_caption container">
                <ul class="ui-breadcrumbs__list">
                    <li itemprop="itemListElement" itemtype="https://schema.org/ListItem" itemscope="itemscope" class="ui-breadcrumbs__item">
                        <a href="/" class="ui-link link-active ui-link_theme_primary" tabindex="0" itemprop="item"><!----> 
                            <span class="ui-link__text">
                                <span itemprop="name">Главная</span> 
                                <meta itemprop="position" content="1">
                            </span> <!---->
                        </a>
                    </li>
                    <li itemprop="itemListElement" itemtype="https://schema.org/ListItem" itemscope="itemscope" class="ui-breadcrumbs__item">
                        <a href="/promos" class="ui-link link-active ui-link_theme_primary" tabindex="0" itemprop="item"><!----> 
                            <span class="ui-link__text"><span itemprop="name">
                                Акции
                            </span> 
                            <meta itemprop="position" content="2">
                        </span> <!---->
                        </a>
                    </li>
                    <li itemprop="itemListElement" itemtype="https://schema.org/ListItem" itemscope="itemscope" class="ui-breadcrumbs__item">
                        <span itemprop="item">
                            <span itemprop="name">
                                {{ promos.title }}
                            </span>
                            <meta itemprop="position" content="3">
                        </span>
                    </li>
                </ul>
            </div>
            <section class="promo-details-page__details content-section-small container">
                <div class="promo-details-page__cover-area">
                    <div class="promo-details-page__cover">
                        <img :src="'https://sklad-zdorovo.ru' + promos.image + ''" 
                        :srcset="'https://sklad-zdorovo.ru' + promos.image + ''" 
                        alt="Здоровье и красота в один клик" 
                        class="promo-details-page__image" :alt="promos.title">
                    </div>
                </div> 
                <div class="promo-details-page__info">
                    <h1 class="text text_size_display-1 text_weight_bold">
                        {{ promos.title }}
                    </h1> 
                    <div class="promo-details-page__period">
                        {{ promos.dateStart }} — {{ promos.dateEnd }}
                    </div> <!---->
                </div>
            </section>          
            <section class="load-more-section content-section-large container">
                <h2 class="promo-details-page__subtitle text text_size_headline text_weight_bold">
                    Товары участвующие в акции
                </h2> 
            <div class="load-more-section__part">
                <div itemtype="http://schema.org/ItemList" itemscope="itemscope" class="goods-grid conainer-ignore-mobile">
                    <div class="goods-grid__inner">
                        <div v-for="(goods, index) in goods" :key="index" itemtype="https://schema.org/Product" itemscope="itemscope" itemprop="itemListElement" class="ui-card ui-card_size_default ui-card_outlined goods-card goods-grid__cell goods-grid__cell_size_4">
                            <div class="ui-card__preview ui-card__row ui-card__row_size_default">
                                <div class="goods-tags goods-card__tags text text_size_caption">
                                    <ul class="goods-tags__list goods-tags__list_direction_vertical">

                                    </ul>
                                </div> 
                                <div>
                                    <span class="goods-card__favorite">
                                        <span class="goods-favorite-icon">
                                            <i class="ui-icon ui-icon_size_24 ui-icon_heart-fill goods-favorite-icon__filled">
                                                <img src="@/assets/images/goods-heart.svg" alt="goods-heart">
                                            </i> 
                                            <i class="ui-icon ui-icon_size_24 ui-icon_heart goods-favorite-icon__outline">
                                                <img src="@/assets/images/goods-heart-no.svg" alt="goods-heart-no">
                                            </i>
                                        </span>
                                    </span> 
                                    <a href="#" class="" tabindex="-1">
                                        <img :src="'https://sklad-zdorovo.ru' + goods.images[0]" :alt="goods.title" loading="lazy" itemprop="image" class="goods-photo goods-card__image">
                                    </a>
                                </div>
                            </div> 
                            <div class="ui-card__content ui-card__row ui-card__row_size_default"> 
                                <div class="goods-card__name text text_size_default text_weight_medium">
                                    <a href="/catalog/Bioderma-AVSderm-Krem-intensivnyy-uhod-75g-0-mes_270078288" class="goods-card__link" itemprop="url">
                                        <span itemprop="name">{{goods.name}}</span>
                                    </a>
                                </div> 
                                <div class="goods-card__data text text_size_small goods-card__form_space_default">
                                    <div itemprop="manufacturer" itemtype="https://schema.org/Organization" itemscope="itemscope" class="goods-card__producer text">
                                        <span itemtype="location">{{ goods.country }}</span>,
                                        <span itemtype="legalName">{{goods.producer}}</span>
                                    </div>
                                    <div class="goods-card__delivery-availability text text_weight_medium">
                                        <a tabindex="0" class="ui-link ui-link_theme_primary"><!----> 
                                            <span class="ui-link__text">В наличии в 5 аптеках<span>
                                                <br></span>
                                            </span> <!---->
                                        </a>
                                    </div> 
                                    <div class="goods-card__delivery-date text text_weight_medium"><!----></div>
                                </div>  <!---->
                            </div> 
                            <div class="ui-card__footer ui-card__row ui-card__row_size_default">
                                <div itemprop="offers" itemtype="https://schema.org/Offer" itemscope="itemscope" class="goods-card__price"><!----></div> 
                                <div class="goods-card__form goods-card__form_space_default">
                                    <button tabindex="0" type="button" class="ui-button ui-button_theme_primary ui-button_corners_smooth ui-button_size_small ui-button_fluid">
                                        <span class="ui-button__inner">
                                            <i class="ui-icon ui-icon_size_24 ui-icon_pharmacy ui-button__icon ui-button__icon_prefix">
                                                <img src="@/assets/images/goods-icon-home-and-heart.svg" alt="goods-icon-home-and-heart">
                                            </i> 
                                            <span class="ui-button__content">В наличии <span>от {{ goods.startPrice}} ₽</span>
                                            </span> <!---->
                                        </span> <!---->
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="button-section">
                    <button class="button-section-load-more ui-button ui-button__inner" @click="LoadMore()">
                        <span class="button-section-load-more-inner">
                            <i class="button-section-load-more-icon">
                                <img src="@/assets/images/button-arrow-load-more.svg" alt="button-arrow-load-more">
                            </i>
                            <span class="button-section-load-more-inner-content">
                                Показать еще
                            </span>
                        </span>
                    </button>
                </div>
            </div>
        </section>
    </main>
</div>
</template>
<script>
import moment from 'moment';

export default {
  name: 'promoPage',
  validate({params}){
    return /^\d+$/.test(params.id); // проверка параметров на валидность
  },
  data() {
    return {
      promos: {},
      goods: [],
      limit: 12,
      offset: 0,
      promoId: 0,
    };
  },
  async asyncData({params}){
    try {

        const response = await fetch(process.env.baseUrl+'/promo/' + params.id, { // запрос к акциями по id
          method: 'GET',
        });

        const responseGoods = await fetch(process.env.baseUrl+'/promo/'+ params.id +'/goods?limit='+12+'&offset=' + 0,{ //запрос к товарам по акции
            method: 'GET',
        });

        // парсим ответы
        const data = await response.json();      
        const dataGoods = await responseGoods.json();

        // преобразуем дату в нужный формат
        data.dateStart = moment(data.dateStart).format('DD.MM.YYYY');
        data.dateEnd = moment(data.dateEnd).format('DD.MM.YYYY'); 

        // возвращаем данные на страницу
        return {promos: data, goods: dataGoods.goods, promoId: params.id}

      } catch (error) {
        console.error("Error in fetchData:", error);
      }
  },

  methods: {
    async LoadMore(){

        const responseGoods = await fetch('/api/promo/'+ this.promoId +'/goods?limit='+this.limit+'&offset=' + this.offset,{ //запрос к товарам по акции
            method: 'GET',
        });

        // парсим ответ
        const dataGoods = await responseGoods.json();
        
        // добавляем к существующиму goods новые элементы
        this.goods = this.goods.concat(dataGoods.goods);

        // условие на проверку пустого объекта, чтобы дальше запросы не проходили
        if (Object.keys(this.goods) != null) {
            console.log(Object.keys(this.goods));
            this.offset += this.limit;
        } else {
            // document.getElementById('button').classList.add('hidden'); <-- не работает
        }
    }
  },
};
</script>