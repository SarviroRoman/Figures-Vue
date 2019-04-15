<template>
  <div class="container row">
    <div class="col-md-12 mb-12">

      <TitleMessage typeFigures='Square'></TitleMessage>

      <div class="row form-content">

        <div class='col-md-6 mb-6'>
          <b-form @submit="addSquare" class="form-row">
          <label for='square' class="text-left">Square length:</label>
          <b-form-input 
            id='square' 
            v-model.number='square'
            type='number'
            placeholder='10' 
            :min='minSquare' 
            :max='maxSquare' 
            step='0.1'   
            :state="squareState"
          ></b-form-input>
          <b-form-invalid-feedback id="input-live-feedback" class="text-left">
            Plese enter valid square
          </b-form-invalid-feedback>

          <b-button 
            type="submit"
            class="add-square-button"
            :variant='squareState ? "success": "danger"' 
            :disabled='!squareState || responseIsSuccess'
          >
            Add Square
            <template v-if="responseIsSuccess">
              <b-spinner small type="grow"></b-spinner>
              <span class="sr-only">Loading...</span>
            </template>
          </b-button>

        </b-form>
      </div>
        
        <div class="col-md-6 mb-6 text-center">
          <FiguresInformation formula='S=a²' imageName='square.jpg'></FiguresInformation>
        </div>
        
      </div>
      
    </div>
  </div>
</template>

<script>
import TitleMessage from '@/components/Figures/TitleMessage'
import FiguresInformation from '@/components/Figures/FiguresInformation'

export default {
  name: 'Square',
  components: {
    TitleMessage,
    FiguresInformation,
  },
  props: ['responseIsSuccess'],
  data() {
    return {
      square: 10,
      minSquare: 0,
      maxSquare: 10000,
    }
  },
  computed: {
    squareState() {
      if (this.square > this.minSquare && this.square <= this.maxSquare) {
        return true;
      }
      return false
    }
  },
   methods: {

    getSquareArea() {
      const area = Math.pow(Number(this.square),2);
      return Math.round(area * 10000)/10000;
    },

    addSquare(evt) {
      evt.preventDefault();
      const area = this.getSquareArea();
      this.$emit('addFigures', 'Square', area);
    },
    
  }
}
</script>

<style scope>
  .form-content{
      margin: 25px;
  }
  .add-square-button{
    margin-top: 15px;
  }
</style>
