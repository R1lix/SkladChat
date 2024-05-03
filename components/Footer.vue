<template>
    <footer class="layout-footer">
        <div class="container">
            <div class="layout-footer__info layout-footer__row">
                <div class="layout-footer__info-inner">
                    <div class="layout-footer__info-cell layout-footer__info-cell_company">
                        <div class="layout-footer__logo-area">
                            <a href="/" aria-label="Главная" class="layout-footer__link link-active">
                                <img src="@/assets/images/icon.png" loading="lazy" alt="Склад здоровья" width="300" height="25" class="layout-footer__logo">
                            </a>
                        </div>
                        <div class="layout-footer__copyright text text_size_small">
                            © 2024 ООО «Склад здоровья»
                        </div>
                        <div class="layout-footer__copyright text text_size_small">
                            ИНН 5903158326
                        </div>
                    </div>
                    <nav class="footer-navigation 
                                layout-footer__info-cell layout-footer__info-cell_navigation
                                ">
                        <div class="footer-navigation__column">
                            <div class="footer-navigation__label text text_size_small">
                                О компании
                            </div> 
                            <ul class="footer-navigation__list">
                                <li class="footer-navigation__list-item">
                                    <a href="#" class="footer-navigation__link text_weight_medium">
                                        Аптеки
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="footer-navigation__column">
                            <div class="footer-navigation__label text text_size_small">
                                Покупателю
                            </div>
                            <ul class="footer-navigation__list">
                                <li class="footer-navigation__list-item">
                                    <a href="/promos" aria-current="page" class="footer-navigation__link text_weight_medium link-active_exact link-active">
                                        Акции
                                    </a>
                                </li>
                                <li class="footer-navigation__list-item">
                                    <a href="#" class="footer-navigation__link text_weight_medium">
                                        Как заказать
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div class="footer-downloads 
                        layout-footer__info-cell layout-footer__info-cell_downloads
                        ">
                        <div class="footer-downloads__label text text_size_small">
                            Установите мобильное приложение
                        </div>
                        <div class="mobile-apps-list footer-downloads__apps">
                            <ul class="mobile-apps-list__inner">
                                <li class="mobile-apps-list__item">
                                    <a href="https://apps.apple.com/ru/app/%D1%81%D0%BA%D0%BB%D0%B0%D0%B4-%D0%B7%D0%B4%D0%BE%D1%80%D0%BE%D0%B2%D1%8C%D1%8F/id1126957166" target="_blank" rel="noopener noreferrer" class="mobile-apps-list__link">
                                        <img :src="getImageUrl('/_nuxt/img/999d077.png')" loading="lazy" alt="iOS приложение Склад здоровья" width="120" height="40" class="mobile-apps-list__image">
                                    </a>
                                </li>
                                <li class="mobile-apps-list__item">
                                    <a href="https://play.google.com/store/apps/details?id=ru.vigroup.apteka" target="_blank" rel="noopener noreferrer" class="mobile-apps-list__link">
                                        <img :src="getImageUrl('/_nuxt/img/6647a71.png')" loading="lazy" alt="Android приложение Склад здоровья" width="135" height="40" class="mobile-apps-list__image">
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
  name: 'Footer',
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