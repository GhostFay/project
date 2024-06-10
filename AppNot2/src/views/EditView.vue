<template>
  <div class="modal fixed w-full h-full left-0 flex items-center justify-center bg-gray-900">
   <form @submit.prevent="updateNote" class="max-w-md mx-auto mt-20 p-6 bg-white border rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-6">MODIFIEZ LA NOTE</h2>
    <div class="mb-4">
        <label  class="block text-gray-700 font-bold mb-2" for="title">
      Titre:
    </label>
        <input v-model.trim="note.title" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        id="title" type="text" placeholder="Titre">
    </div>
   
    <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="note">
      Description:
    </label>
        <textarea v-model.trim="note.content[0]" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="note" rows="5" placeholder="Description"></textarea>
    </div>
    <p v-if="showErrorMsg" class="text-red-500 text-sm mb-4"> 10 characters for the note and 5 characters for the title</p>
    <div class="flex justify-between">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
    Modifiez Note
  </button>
  <router-link to="/">
  <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
    Fermer
  </button>
</router-link>
</div>
</form>
</div>
</template>

<script>
export default {
  props: ['_id'],
  data() {
    return {
      id: this.$route.params.id,
      note: {
        title: '',
        content: [''],
        createdAt: ''
      },
      showErrorMsg: false
    }
  },
  mounted() {
    this.fetchNote()
  },
  methods: {
    fetchNote() {
      fetch('http://62.72.5.95:1999/notes/' + this.id)
        .then((res) => res.json())
        .then((data) => {
          this.note = data
          if (!this.note.content.length) {
            this.note.content.push('')
          }
        })
        .catch((err) => console.log(err.message))
    },
    updateNote() {
      if (this.note.title.length < 5 || this.note.content[0].length < 10) {
        this.showErrorMsg = true
      } else {
        fetch(`http://62.72.5.95:1999/notes/${this.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.note)
        })
          .then(() => {
            this.$router.push('/')
          })
          .catch((err) => {
            console.error('Failed to update note:', err.message)
          })
      }
    }
  }
}
</script>

<style scoped>
</style>
