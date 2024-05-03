<template>
    <header class="header">
      <!-- HEADER START -->
      <div class="header-top-container">
        <div class="header-top-text">        
          <nav class="header-navbar">
            <div class="header-top-left">
              <div class="logo-icon">
                <a href="/">
                  <img class="icon-logo" src="@/assets/images/icon.png" alt="" width="300" height="25">
                </a>
              </div>
            </div>
            <ul class="list-menu">
              <li class="list-menu-item"><a href="/">Главная</a></li>
              <li class="list-menu-item"><a href="/promos">Акции</a></li>
              <li class="list-menu-item"><nuxt-link to="#">Аптеки</nuxt-link></li>
              <li class="list-menu-item"><nuxt-link to="#">Как заказать</nuxt-link></li>
            </ul>
          </nav>
          <div class="btn-controls">
            <div class="button-favorite">
              <a href="#" class="button-favorite-btn button-main button-theme ui-button_corners_smooth button_size_default">
                <span class="span-button-inner">
                  <i class="ui-icon ui-icon_size_24 ui-button__icon ui-button__icon_prefix button-theme">
                    <img src="@/assets/images/favorite.svg" alt="favorite_icon" class="icon-svg">
                  </i>
                  <!-- Это текст после сердечка -->
                  Избранное
                </span>
              </a>
            </div>
            <div class="button-enter">
              <a href="#" class="button-enter-btn button-main button-theme ui-button_corners_smooth button_size_default">
                <span class="span-button-inner">
                  <i class="ui-icon ui-icon_size_24 ui-button__icon ui-button__icon_prefix">
                    <img src="@/assets/images/profile.svg" alt="profile_icon">
                  </i>
                  <!-- Это текст после пользователя -->
                  Войти
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- HEADER END -->
      <!-- CATALOG START -->
      <div class="layout-catalog-bar layout-default__catalog-bar desktop-content">
        <div class="layout-catalog-bar__container container">
          <div class="layout-catalog-bar__catalog-trigger">
            <button tabindex="0" type="button" class="ui-button ui-button_theme_primary ui-button_corners_smooth ui-button_size_default">
              <span class="ui-button__inner">
              <i class="ui-icon ui-icon_size_24 ui-icon_list ui-button__icon ui-button__icon_prefix">
                <img src="@/assets/images/catalog-icon.svg" alt="catalog-icon">
              </i> 
                <span class="ui-button__content">
                  Каталог
                </span> <!---->
              </span> <!---->
            </button>
          </div>
          <div tabindex="-1" class="ui-dropdown layout-catalog-bar__search">
            <form class="layout-search-form">
              <div class="ui-input-group"><!---->
                <div class="ui-input-group__part ui-input-group__part_inner">
                  <div class="ui-input ui-input_theme_white ui-input_size_default ui-input_icon_prefix">
                    <span class="ui-input__icon ui-input__icon_prefix">
                      <i class="ui-icon ui-icon_size_24 ui-icon_search">
                        <img src="@/assets/images/search-input.svg" alt="search-input">
                      </i>
                    </span>
                    <input type="text" value="" placeholder="Название товара" title="Поиск" aria-label="Поиск" name="q" autocomplete="off" class="ui-input__field">
                    <span><!---->
                    </span>
                  </div>
                </div>
                <div class="ui-input-group__part ui-input-group__part_append">
                  <button tabindex="0" aria-label="Найти" type="submit" class="ui-button ui-button_theme_primary ui-button_corners_smooth ui-button_size_default">
                    <span class="ui-button__inner"><!---->
                      <span class="ui-button__content">
                        <i class="ui-icon ui-icon_size_24 ui-icon_search layout-search-form__search-label layout-search-form__search-label_mobile">
                          <img src="@/assets/images/search-btn.svg" alt="search-btn">
                        </i>
                        <span class="
                            layout-search-form__search-label layout-search-form__search-label_desktop">Найти
                        </span>
                      </span> <!---->
                    </span> <!---->
                  </button>
                </div>
              </div>
            </form> <!---->
          </div> 
          <a href="#" tabindex="0" class="ui-button ui-button_theme_ghost ui-button_corners_smooth ui-button_size_default ui-button_outline">
            <span class="ui-button__inner">
              <i class="ui-icon ui-icon_size_24 ui-icon_cart ui-button__icon ui-button__icon_prefix">
                <img src="@/assets/images/basket-icon.svg" alt="basket-icon">
              </i>
              <span class="ui-button__content">Корзина</span> <!---->
            </span> <!---->
          </a>
        </div>
      </div>
      <!-- CATALOG END -->
    </header>
  </template>
  
  <script>
  export default {
    name: 'Header',
    data() {
        return {};
    },
    methods: {
        getImageUrl(relativePath) {
        const baseUrl = "https://sklad-zdorovo.ru";
        return `${baseUrl}${relativePath}`;
    },
  },
}
  </script>

<!-- <style scoped>
.icon-svg{
  color: #4eb8a5;
}
</style> -->