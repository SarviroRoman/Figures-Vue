<template>
  <div v-if='figures.length' class="container list-section">
    <div class="overflow-auto">
      <div class="text-center">
        <b-table bordered hover striped 
          id="figures-table"
          :items="figures"
          :per-page="perPage"
          :current-page="currentPage"
        >
          <template slot="table-caption">List added figures</template>
        </b-table>

        <b-pagination v-if='figures.length>limit'
          align="center"
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          :limit='limit'
          aria-controls="figures-table"
        ></b-pagination>
      </div>
    </div>
  </div>
  <div v-else class="spinner-section">
    <b-spinner variant="primary" label="Loading..."></b-spinner>
  </div>
  
</template>

<script>
import axios from 'axios'
export default {
  name: 'list',
  data() {
    return {
      perPage: 7,
      currentPage: 1,
      limit: 7, 
      figures: []
    }
  },
  computed: {
    rows() {
      return this.figures.length
    }
  },
  mounted(){
    axios
    .get('http://localhost:7000/figures')
    .then(response => (this.figures = response.data));
  }
}
</script>

<style scoped>
  .list-section{
    margin-top: 35px;   
  }
  .spinner-section{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: fixed;
}
</style>