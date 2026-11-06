<script>
export default{
    name: 'Specials',
    data(){
        return{
            specials: [],
            offset: 0,
            limit: 24,
        };
    },
    async fetch(){
        try{

            const response = await fetch('/api/special?offset='+this.offset+'&limit='+this.limit);
            const dataSpecials = await response.json();
            this.specials = dataSpecials.specials;
            console.log(dataSpecials)

        } catch(error){
            console.error("Error in asyncData:", error);
        }
    }
}
</script>
<template>
    <section class="load-more-section content-section-large container">
        <div class="promos-page__section-header">
            <h2 class="promos-page__subtitle text text_size_display-1 text_weight_bold">Спецпредложения</h2> 
            <a href="/specials" class="ui-link promos-page__link-all ui-link_theme_primary ui-link_icon" tabindex="0">
                <span class="ui-link__text">
                    <span class="text text_weight_medium">
                        Смотреть все
                    </span>
                </span>
                <i class="ui-icon ui-icon_size_16 ui-icon_arrow-right ui-link__icon ui-link__icon_suffix">
                    <img src="@/assets/images/arrow-right.svg" alt="arrow-right">
                </i>
            </a>
         </div>
        <div class="load-more-section__part">
            <div class="specials-grid" >
                <ul class="specials-grid__inner">
                    <li class="specials-grid__cell specials-grid__cell_size_6" v-for="(special, index) in specials" :key="index">
                        <a href="#" class="special-preview" aria-label="Товары на каждый день">
                            <img :src="'https://sklad-zdorovo.ru'+special.image" loading="lazy" :alt="special.title" class="special-preview__image special-preview__image_smooth specials-grid__cell_size_6">
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>