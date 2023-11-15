<script>
  export default {
    name: 'Modal',
    props: ['id', 'size', 'temp', 'ice_level', 'sugar_level', 'toppings'],
    setup(props) {

    },
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<template>
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          <slot name="header">
            Modify the drink
          </slot>
          <button
            type="button"
            class="btn-close"
            @click="close"
          >
            x
          </button>
        </header>
  
        <section class="modal-body">
          <slot name="body">
            <h1>{{ id }}</h1>
            <div>Size: {{ _size }}
                <input type="radio" id="m" value="medium" v-model="_size" />
                <label for="m">Medium</label>

                <input type="radio" id="l" value="large" v-model="_size" />
                <label for="l">Large</label>
            </div>
            <div>Temp: {{ _temp }}
                <input type="radio" id="c" value="cold" v-model="_temp" />
                <label for="c">Cold</label>

                <input type="radio" id="h" value="hot" v-model="_temp" />
                <label for="h">Hot</label>
            </div>
            <div>Ice Level: {{ _ice_level }}
                <select v-model="_ice_level"> 
                    <option value="more">More</option> 
                    <option value="regular">Regular</option> 
                    <option value="less">Less</option> 
                    <option value="no ice">No Ice</option> 
                </select> 
            </div>
            <div>
                Sugar Level: {{ _sugar_level }}
                <select v-model="_sugar_level"> 
                <option value="100">100%</option> 
                <option value="70">70%</option> 
                <option value="50">50%</option> 
                <option value="30">30%</option> 
                <option value="0">0%</option> 
              </select> 
            </div>
            <div>Toppings: {{ _toppings }}
                <select v-model="_toppings"> 
                    <option value="Bubble">Bubble</option> 
                    <option value="Mango Jelly">Mango Jelly</option> 
                    <option value="Aloe Jelly">Aloe Jelly</option> 
                    <option value="Nata Jelly">Nata Jelly</option> 
                </select> 
            </div>
          </slot>
         </section>
        <footer class="modal-footer">
          <!-- <slot name="footer">
            This is the default footer!
          </slot> -->
          <button
            type="button"
            class="btn-green"
            @click="$emit('updateCustom', id, _size, _temp, _ice_level, _sugar_level, _toppings)"
          >
            Save Modification
          </button>
        </footer>
      </div>
    </div>
  </template>

  <style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    color: black;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #333;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 10px 20px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #333;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #333;
    border: 1px solid #333;
    border-radius: 2px;
  }
</style>