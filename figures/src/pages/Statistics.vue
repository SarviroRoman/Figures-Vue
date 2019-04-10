<template>

  <Spinner v-if='!getFiguresIsSuccess'></Spinner>

  <div v-else class="container statistics-section">

    <div v-if="figures.length === 0">
      <b-alert variant="info" show >
        <h5 class="d-flex justify-content-center align-content-center flex-wrap waring-text">Added figures not found - <router-link class="nav-link" to="/AddFigures">add them now</router-link></h5>
      </b-alert>
    </div>

    <div v-else class="text-center">
      <b-table bordered hover striped 
        :items="getStatistics"
      >
        <template slot="table-caption">Statistics</template>
      </b-table>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios'
import Spinner from '@/components/Spinner'

export default {
  name: 'statistics',
  components: {
    Spinner
  },
  data() {
    return {
      figures: [],
      getFiguresIsSuccess: false,
    }
  },
  computed: {
    getStatistics() {
      let totalArea = 0; 
      let circlesArea = 0; 
      let squaresArea = 0; 
      let rectanglesArea = 0; 
      let trianglesArea = 0; 

      const Circles = this.figures.filter(figure => figure.type === 'Circle'); 
      for (let item of Circles){ 
        circlesArea += item.area; 
        totalArea += item.area; 
      } 

      const Squares = this.figures.filter(figure => figure.type === 'Square'); 
      for (let item of Squares){ 
        squaresArea += item.area; 
        totalArea += item.area; 
      } 

      const Rectangles = this.figures.filter(figure => figure.type === 'Rectangle'); 
      for (let item of Rectangles){ 
        rectanglesArea += item.area; 
        totalArea += item.area; 
      } 

      const Triangles = this.figures.filter(figure => figure.type === 'Triangle'); 
      for (let item of Triangles){ 
        trianglesArea += item.area; 
        totalArea += item.area; 
      } 

      const circlePercent = 100*circlesArea/totalArea; 
      const squarePercent = 100*squaresArea/totalArea; 
      const rectanglePercent = 100*rectanglesArea/totalArea; 
      const trianglePercent = 100*trianglesArea/totalArea; 

      const statistics = [
        {
          type: 'Circle',
          area: circlesArea,
          percent: Math.round(circlePercent * 1000) / 1000 
        },
        {
          type: 'Square',
          area: squaresArea,
          percent: Math.round(squarePercent * 1000) / 1000 
        },
        {
          type: 'Rectangle',
          area: rectanglesArea,
          percent:  Math.round(rectanglePercent * 1000) / 1000  
        },
        {
          type: 'Triangle',
          area: trianglesArea,
          percent:  Math.round(trianglePercent * 1000) / 1000 
        },
      ]
      return statistics;
    }
  },
  mounted(){
    axios
    .get('http://localhost:7000/figures')
    .then(response => {
      this.figures = response.data;
      this.getFiguresIsSuccess = true; 
    });
  }
}
</script>

<style scoped>
  .statistics-section{
    margin-top: 35px;   
  }
  .waring-text{
    margin-top: 8px;
  }
  .nav-link{
    padding: 0 0.5rem !important;
  }
</style>