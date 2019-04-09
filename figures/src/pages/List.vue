<template>
  <div v-if='figures.length' class="container list-section">
    <div class="text-center">
      <table 
        class="table table-bordered table-hover table-striped"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <caption>List added figures</caption>

        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">Type figures</th>
            <th scope="col">Area</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="figure in figures.slice((currentPage-1) * limit,(currentPage-1) * limit + limit)" :key="figure.id">
            <th scope="row">{{ figure.id }}</th>
            <td> {{ figure.type }} </td>
            <td> {{ figure.area }} </td>
            <td>
              <button class="btn btn-sm btn-outline-danger">Delete</button>
            </td>
          </tr>
        </tbody>

      </table>

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