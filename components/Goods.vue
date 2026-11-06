<script>
export default {
  name: 'Goods',
  data() {
    return {
      goods: [],
      limit: 12,
      offset: 0,
    };
  },
  async fetch() {
    try {
      const response = await fetch('/api/group/main?offset='+this.offset+'&limit='+this.limit);
      const dataGoods = await response.json();

      console.log(dataGoods);
      
      this.offset += this.limit;

      this.goods = dataGoods.goods;

    } catch (error) {
      console.error("Error in asyncData:", error);
    }
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch('/api/group/main?offset='+this.offset+'&limit='+this.limit);
        const data = await response.json();

        this.goods = this.goods.concat(data.goods);
        this.offset += this.limit;
      } catch (error) {
        console.error("Error in fetchData:", error);
      }
    },
  },
}
</script>

<template>
    <main class="promo-details-page page">        
        <section class="load-more-section content-section-large container">
                <h2 class="promo-details-page__subtitle text text_size_headline text_weight_bold">
                    Обратите внимание
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
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24" width="24" class="ui-icon__svg">
                                                    <path fill-rule="evenodd" d="M13.103 2.692c1.07-.52 2.003-.692 3.45-.692C20.258 2.015 23 5.12 23 9.075c0 3.02-1.694 5.935-4.849 8.755-1.656 1.48-3.77 2.945-5.285 3.724L12 22l-.866-.446c-1.515-.78-3.63-2.244-5.285-3.724C2.694 15.01 1 12.094 1 9.075 1 5.078 3.716 2 7.455 2c1.395 0 2.376.188 3.467.724.38.186.736.408 1.068.663.345-.27.717-.503 1.113-.695z" clip-rule="evenodd">

                                                    </path>
                                                </svg>
                                            </i> 
                                            <i class="ui-icon ui-icon_size_24 ui-icon_heart goods-favorite-icon__outline">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24" width="24" class="ui-icon__svg">
                                                    <path fill-rule="evenodd" d="M11.99 3.387a6.307 6.307 0 00-1.068-.663C9.832 2.188 8.85 2 7.455 2 3.716 2 1 5.078 1 9.075c0 3.02 1.694 5.935 4.849 8.755 1.656 1.48 3.77 2.945 5.285 3.724L12 22l.866-.446c1.515-.78 3.63-2.244 5.285-3.724C21.306 15.01 23 12.094 23 9.075 23 5.12 20.258 2.015 16.553 2c-1.447 0-2.38.171-3.45.692a6.172 6.172 0 00-1.113.695zM16.549 4c-1.235 0-1.848.138-2.572.49-.27.131-.52.288-.753.47l-1.223.96-1.231-.948a4.305 4.305 0 00-.73-.454C9.285 4.148 8.62 4 7.455 4 5.008 4 3 5.986 3 9.075c0 2.213 1.235 4.63 4.182 7.264 1.53 1.367 3.477 2.713 4.818 3.412 1.34-.699 3.288-2.045 4.818-3.412C19.765 13.705 21 11.289 21 9.075 21 6.034 18.97 4.012 16.549 4z" clip-rule="evenodd">

                                                    </path>
                                                </svg>
                                            </i>
                                        </span>
                                    </span> 
                                    <a href="/catalog/Bioderma-AVSderm-Krem-intensivnyy-uhod-75g-0-mes_270078288" class="" tabindex="-1">
                                        <img :src="'https://sklad-zdorovo.ru' + goods.images[0]" loading="lazy" alt="Bioderma АВСдерм Крем интенсивный уход 75г 0+мес" itemprop="image" class="goods-photo goods-card__image">
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
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24" width="24" class="ui-icon__svg">
                                                    <path d="M8.5 19c.33-.328.66-.613.966-.88.856-.742 1.534-1.33 1.534-2.245 0-1.26-1.707-2.087-2.5-.51-.793-1.577-2.5-.75-2.5.51 0 .915.678 1.503 1.534 2.245.307.266.636.552.966.88z">

                                                    </path>
                                                    <path fill-rule="evenodd" d="M20.491 2a2 2 0 011.923 1.45l1.135 4.33A3.5 3.5 0 0122 12.663v8.338h1.001a1 1 0 110 2H1a1 1 0 110-2h1v-8.337A3.5 3.5 0 01.45 7.781l1.136-4.33A2 2 0 013.509 2H20.49zM2.651 7H21.35l-.858-3H3.51L2.65 7zm-.566 2a1.5 1.5 0 102.83 0h-2.83zm5.5 0a1.5 1.5 0 102.83 0h-2.83zm6 0a1.5 1.5 0 102.83 0h-2.83zm5.5 0a1.5 1.5 0 102.83 0h-2.83zM4 12.965V21h8v-2.5a3 3 0 116 0V21h2v-8.035a3.497 3.497 0 01-2.25-1.3 3.498 3.498 0 01-5.75-.361 3.498 3.498 0 01-5.75.361 3.497 3.497 0 01-2.25 1.3zM16 21v-2.5a1 1 0 10-2 0V21h2z" clip-rule="evenodd">

                                                    </path>
                                                </svg>
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
            </div>
            <div class="button-section">
                <button class="button-section-load-more ui-button ui-button__inner" @click="fetchData()" :id="'button'">
                    <span class="button-section-load-more-inner">
                        <i class="button-section-load-more-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24" width="24" class="ui-icon__svg"><path d="M18.707 13.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L11 17.586V4a1 1 0 112 0v13.586l4.293-4.293a1 1 0 011.414 0z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                        </i>
                        <span class="button-section-load-more-inner-content">
                            Показать еще
                        </span>
                    </span>
                </button>
            </div>
        </section>
    </main>
</template>