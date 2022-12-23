<template>
  <div tabindex="-1" :hidden="true" class=" w-[100%] h-[100%] bg-gray-900/40 fixed top-0  right-0 left-0 z-50 ">
    <div tabindex="1" class="w-full flex justify-center absolute">

    </div>
    <div   class="overflow-y-auto overflow-x-hidden w-full md:inset-0 h-modal md:h-full flex items-center justify-center">
      <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">

          </div>
          <!-- Modal body -->
          <div class="p-6 space-y-6 text-center text-2xl">


            Вы сообщили клиенту что заказ задерживается на?

          </div>
          <!-- Modal footer -->
          <div class="flex items-center justify-end p-6 pl-96 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">

            <button
                @click="closeDrag"
                type="button"
                class="text-white
                     w-[20px]
                     ml-32
                     bg-blue-700
                     hover:bg-blue-800
                     focus:ring-4
                     focus:outline-none
                     focus:ring-blue-300
                     font-medium rounded-lg
                     text-sm px-5 py-2.5
                     text-center dark:bg-blue-600
                     dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center justify-center">
              Да
              <v-icon>mdi-right-row</v-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DragAndDropModal",
  props:{

  },
  data:()=>({
    openDrag:true
  }),
  methods:{
    closeDrag: async function(){
      this.$emit('closemodal',this.openDrag)
    },
  }
}
</script>

<style scoped>

</style>