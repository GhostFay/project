<template>


  <main class="p-8">
    <div class="grid gap-4" style="grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));">
      <div v-for="note in paginatedNotes" :key="note._id"
        class="relative overflow-hidden bg-orange-500 rounded-lg shadow-lg">
        <router-link :to="{ name: 'Note', params: { id: note._id } }">
          <div class="relative text-white p-6">
            <div class="flex justify-between">
              <span class="block font-semibold text-xl">{{ note.title.slice(0, 20) + '..' }}</span>
            </div>
            <p class="text-xs font-medium text-indigo-500 uppercase">------------</p>
          </div>
          <svg class="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none"
            style="transform: scale(1.5); opacity: 0.1;">
            <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white" />
            <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white" />
          </svg>
          <div class="relative text-white px-6 pb-6">
            <span class="block opacity-75 -mb-1">{{ note.content[0].slice(0, 30) + '...' }}</span>
          </div>
        </router-link>
        <div class="relative text-white px-6 pb-6 mt-6">
          <span class="block opacity-75 -mb-1">{{ new Date(note.createdAt).toLocaleDateString('fr-FR') }}</span>
          <div class="flex pt-2 justify-between">
            <router-link :to="{ name: 'Note', params: { id: note._id } }">
              <span
                class="block bg-white rounded-full text-orange-500 text-xs font-bold px-2 py-2 leading-none flex items-center">
                Voir <svg class="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

              </span>
            </router-link>
            <router-link :to="{ name: 'EditView', params: { id: note._id } }">
              <span
                class="block bg-white rounded-full text-orange-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
                Edit<svg class="h-5 w-5 text-red-500" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                  fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                  <line x1="16" y1="5" x2="19" y2="8" />
                </svg>
              </span>
            </router-link>
          </div>
        </div>
      </div>

    </div>
    <vue-awesome-paginate :total-items="totalItems" :items-per-page="itemsPerPage" :max-pages-shown="10"
      v-model="currentPage" :on-click="onClickHandler" :show-breakpoint-buttons="false" :show-jump-buttons="true" />
  </main>





</template>

<script>
import 'vue-awesome-paginate/dist/style.css';
export default {
  data() {
    return {
      notes: [],
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    totalItems() {
      return this.notes.length;
    },
    paginatedNotes() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.notes.slice(start, end);
    },
  },
  mounted() {
    this.fetchNotes();
    this.interval = setInterval(this.fetchNotes, 12000);
  },
  methods: {
    async fetchNotes() {
      try {
        const response = await fetch('http://62.72.5.95:1999/notes');
        const data = await response.json();
        this.notes = data.notes;
      } catch (err) {
        console.log(err.message);
      }
    },
    onClickHandler(page) {
      this.currentPage = page;
    },
  }
}
</script>

<style>
.pagination-container {
  padding: 10px;
  /* display: flex; */
  column-gap: 10px;
}

.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}

.paginate-buttons:hover {
  background-color: #d8d8d8;
}

.active-page {
  background-color: #f77811;
  border: 1px solid #3498db;
  color: white;
}

.active-page:hover {
  background-color: #f77811;
}
</style>
