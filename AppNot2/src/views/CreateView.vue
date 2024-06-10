<template>
  <main class="modal fixed w-full h-full left-0 flex items-center justify-center bg-gray-900"> 
     <form @submit.prevent="addNote" class="max-w-md mx-auto mt-20 p-6 bg-white border rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-6">AJOUTER UNE NOTE</h2>
    <div class="mb-4">
        <label  class="block text-gray-700 font-bold mb-2" for="title">
      Titre:
    </label>
        <input v-model.trim="newTitle" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        id="title" type="text" placeholder="Titre">
    </div>
   
    <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="note">
      Description:
    </label>
        <textarea v-model.trim="newNote" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="note" rows="5" placeholder="Description"></textarea>
    </div>
    <p v-if="showErrorMsg" class="text-red-500 text-sm mb-4"> 10 characters for the note and 5 characters for the title</p>
    <div class="flex justify-between">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
    Ajouter Note
  </button>
  <router-link to="/">
  <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
    Fermer
  </button>
</router-link>
</div>
</form>
</main>

</template>

<script>
import axios from 'axios'

export default {
  name: 'CreateView',
  data() {
    return {
      newTitle: '',
      newNote: '',
      showErrorMsg: false
    }
  },
  methods: {
    async addNote() {
      if (this.newTitle.length < 5 || this.newNote.length < 10) {
        this.showErrorMsg = true
      } else {
        this.showErrorMsg = false
        try {
          let response = await axios.post(
            'http://62.72.5.95:1999/notes',
            {
              title: this.newTitle,
              content: [this.newNote]
            },
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          )
          if (response.status === 201) {
            this.$emit('note-added', {
              _id: response.data.note_id,
              title: this.newTitle,
              content: this.newNote,
              createdAt: new Date().toISOString()
            })
            this.newTitle = ''
            this.newNote = ''
            this.$router.push('/')
          }
        } catch (error) {
          console.error(error.response.data.error.message)
          this.showErrorMsg = true
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
