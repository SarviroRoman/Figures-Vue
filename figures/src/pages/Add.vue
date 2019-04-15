<template>
  <div class="container">
    <div class="add-figures-section">
      <div class="row">
        <div class="col-3">
          <b-list-group class="text-center">
            <b-list-group-item router-link :to='APP.routes.pathAddFigures+"/"+APP.types.circle'>{{ APP.types.circle }}</b-list-group-item>
            <b-list-group-item router-link :to='APP.routes.pathAddFigures+"/"+APP.types.square'>{{ APP.types.square }}</b-list-group-item>
            <b-list-group-item router-link :to='APP.routes.pathAddFigures+"/"+APP.types.rectangle'>{{ APP.types.rectangle }}</b-list-group-item>
            <b-list-group-item router-link :to='APP.routes.pathAddFigures+"/"+APP.types.triangle'>{{ APP.types.triangle }}</b-list-group-item>
          </b-list-group>
        </div>
        <div class="col-9 text-center">
          <!-- <keep-alive> -->
            <router-view v-on:addFigures='addFigures' :responseIsSuccess='responseIsSuccess'></router-view>
          <!-- </keep-alive> -->

          <!-- <b-alert
            :show="dismissCountDown"
            dismissible
            variant="success"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged"
            class="deleteAlert"
          >
            <p class="text-center">{{ textAlertMessage }}</p>
            <b-progress
              variant="success"
              :max="dismissSecs"
              :value="dismissCountDown"
              height="4px"
            ></b-progress>
          </b-alert> -->

          <b-alert v-model="showAddAlert" variant="success" class="addAlert" dismissible>
            <p class="text-center">{{ textAlertMessage }}</p>
          </b-alert>
          
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { APP } from '../application-constants'

export default {
  name: 'add',
  data() {
    return {
      responseIsSuccess: false,
      textAlertMessage: String,
      showAddAlert: false,
      APP
    }
  },
  methods: {
    addFigures(type, area){
      this.responseIsSuccess = true;
      const newFigure = {
        type: type,
        area: area
      };

      axios
      .post(`${APP.endpoints.baseUrl}${APP.endpoints.figures}`, newFigure)
      .then(response => {
        if(response.data.success){
          this.responseIsSuccess = false;
          this.textAlertMessage = `${type} #${response.data.id} with ${area} area successfully added`;
          this.showAddAlert = true;
        }
      })
    },

  }
}
</script>

<style scoped>
  .add-figures-section{
    margin-top: 35px;   
  }
  .addAlert{
    margin: 0 50px; 
  }
  .addAlert p{
    margin-bottom: 0px;
  }
</style>
