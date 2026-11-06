<template>
    <div>
      <Header />
      <nuxt />
      <Chat/>
      <Footer />
    </div>
</template>
  
  <script>
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
  import Chat from '@/components/Chat.vue'
  
  export default {
    components: {
      Header,
      Footer,
      Chat
    }
  }
  </script>
  