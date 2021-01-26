<template>
  <v-app>
    <v-row v-if="error.statusCode === 404">
      <v-col class="mx-16">
        <h2>
          <v-icon color="red" class="mb-1"> 
            mdi-alert 
          </v-icon>
          {{ pageNotFoundEn }}
        </h2>
        <p>
          {{ error404TxtEn }}
        </p>
        <li class="mx-10">
          Return to the
          <a :href="baseURL">
            home page
          </a>
        </li>
      </v-col>
      <v-col class="mx-16">
        <h2>
          <v-icon color="red" class="mb-1"> 
            mdi-alert 
          </v-icon>
          {{ pageNotFoundFr }}
        </h2>
        <p>
          {{ error404TxtFr }}
        </p>
        <li class="mx-10">
          Retournez à la
          <a :href="baseURL">
            page d'accueil		            
          </a>
        </li>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col class="mx-16">
        <h2>
          <v-icon color="red" class="mb-1">
            mdi-alert-circle
          </v-icon>
          {{ otherErrorEn }}
        </h2>
        <p>
          {{ otherErrorTxtEn }} 
        </p>
        <li class="mx-10">
          Return to the
          <a :href="baseURL">
            home page
          </a>
        </li>
      </v-col>
      <v-col class="mx-16">
        <h2>
          <v-icon color="red" class="mb-1">
            mdi-alert-circle
          </v-icon>
          {{ otherErrorFr }}
        </h2>
        <p>
          {{ otherErrorTxtFr }}
        </p>
        <li class="mx-10">
          Retournez à la
          <a :href="baseURL">
            page d'accueil 
          </a>
        </li>
      </v-col>
    </v-row>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFoundEn: 'We were unable to find that web page (Error 404)',
      pageNotFoundFr: 'Nous ne pouvons trouver cette page Web (Erreur 404)',
      error404TxtEn: 'We\'re sorry you ended up here. The page you are looking for may have been moved or deleted.',
      error404TxtFr: 'Nous sommes désolés que vous ayez abouti ici. La page que vous recherchez peut avoir déménagé ou été supprimé.',
      otherErrorEn: 'An error has occurred',
      otherErrorFr: 'Une erreur s\'est produite',
      otherErrorTxtEn: 'Something went wrong and we were unable to display this page.',
      otherErrorTxtFr: 'Une erreur s’est produite et il n’est pas possible d’afficher cette page.',
      baseURL: process.env.BASE_URL
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFoundEn : this.otherErrorEn
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
