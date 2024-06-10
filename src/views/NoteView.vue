<template>
  <div class="modal fixed w-full h-full left-0 flex items-center justify-center">

<div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

<div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
  
    <div class="modal-content py-4 text-left px-6">
        <div class="flex justify-between items-center pb-3">
            <p class="text-2xl font-bold">{{ note.title }}</p>
          
        </div>
        <p>{{ note.content[0] }}</p>
        <span class="text-l font-bold">{{ new Date(note.createdAt) }}</span>

        <div class="mt-4 flex justify-end">
          <router-link to="/">
            <button class="modal-close px-4 bg-gray-100 p-3 rounded-lg text-black hover:bg-gray-200">Retour</button>
          </router-link>
            <button @click.stop="removeNote(note._id)" class="px-4 bg-red-500 p-3 ml-3 rounded-lg text-white hover:bg-purple-400">Supprimer</button>
        </div>
    </div>
</div>

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
        content: [],
        createdAt: ''
      }
    }
  },
  mounted() {
    this.fetchNote()
  },
  methods: {
    fetchNote() {
      fetch('http://62.72.5.95:1999/notes/' + this.id)
        .then((res) => res.json())
        .then((data) => (this.note = data))
        .catch((err) => console.log(err.message))
    },
    removeNote(id) {
      fetch(`http://62.72.5.95:1999/notes/${id}`, {
        method: 'DELETE'
      })
        .then(() => {
          this.$router.push('/')
        })
        .catch((err) => {
          console.error('Failed to delete note:', err.message)
        })
    }
  }
}
</script>

<style scoped>

</style>
