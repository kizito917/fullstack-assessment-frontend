<template>
  <div class="mt-10 rounded bg-300 mx-6 lg:mx-36">
    <div class="flex flex-row ml-8 pt-5">
      <button @click="triggerModal('add')" class="modal-open bg-green-500 hover:bg-green-700 text-white text-center py-2 px-4 rounded">Add new client</button>
    </div>
    <div class="container">
      <h1 class="font-bold text-center text-2xl">Clients</h1>
      <table class=" ml-9 w-11/12 flex flex-col flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
        <thead class="text-green">
          <tr class="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
            <th class="p-3 text-left">Name</th>
            <th class="p-3 text-left">Email</th>
            <th class="p-3 text-left">Phone</th>
            <th class="p-3 text-left">Providers</th>
            <th class="p-3 text-left" width="110px">Actions</th>
          </tr>
        </thead>
        <tbody class="flex-1 sm:flex-none" v-for="client in clients" :key="client._id">
          <tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
            <td class="border-grey-light border hover:bg-gray-100 p-3">{{ client.name }}</td>
            <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">{{ client.email }}</td>
            <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">{{ client.phone }}</td>
            <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">{{ client.providers }}</td>
            <td class="border-grey-light border hover:bg-gray-100 p-3 truncate">
              <button @click="triggerModal('edit', client._id)" class="bg-green-500 hover:bg-green-700 text-white text-center py-2 px-4 rounded">Edit</button>
              <button @click="promptDelete(client._id)" class="bg-red-500 hover:bg-red-700 text-white text-center py-2 px-4 ml-2 rounded">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
      <!--add /edit client Modal-->
      <div class="modal opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center">
        <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
        
        <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <div class="modal-content py-4 text-left px-6">
            <!--Title-->
            <div class="flex justify-between items-center pb-3">
              <p class="text-2xl font-bold">{{ modalTitle }}</p>
            </div>
            <hr>
            <div>
              <div class="bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md" role="alert" v-if="clientAdded">
                <div class="flex">
                  <div class="py-1"><svg class="fill-current h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                  <div>
                    <p class="font-bold">Client added successfully</p>
                  </div>
                </div>
              </div>
              <div class="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md" role="alert" v-if="noClientAdded">
                <div class="flex">
                  <div class="py-1"><svg class="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                  <div>
                    <p class="font-bold">Unable to add client</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!--Body-->
            <div class="mt-5 mb-5">
              <form>
                <div class="form-group mb-3">
                  <label for="name">Name: </label>
                  <br />
                  <input type="text" v-model="form.name" name="name">
                </div>
                <div class="form-group mb-3">
                  <label for="name">Email: </label>
                  <br />
                  <input type="text" v-model="form.email" name="name">
                </div>
                <div class="form-group mb-3">
                  <label for="name">Phone: </label>
                  <br />
                  <input type="text" v-model="form.phone" name="name">
                </div>
                <div class="form-group mb-3">
                  <label for="name">Providers: </label>
                  <br />
                  <input type="text" v-model="providerName" name="name">
                  <button v-if="addProvider" @click.prevent="addNewProvider" class="ml-2 bg-green-500 p-1 rounded-lg text-white hover:bg-green-400"> Add Provider</button>
                  <button v-else @click.prevent="updateProvider" class="ml-2 bg-green-500 p-1 rounded-lg text-white hover:bg-green-400"> Update Provider</button>
                </div>
                <div class="w-60 form-group providers mb-3">
                  <div class="grid ml-2 mt-2 mb-2">
                    <div class="flex flex-row gap-x-4 gap-y-2" v-for="provider in providers" :key="provider.id">
                      <input class="mt-1" type="checkbox" id="check" @click="getcheckboxval(provider.id , provider.name)" :value="provider.id">
                      <span class="text-sm w-32">{{ provider.name }}</span>
                      <div @click="promptEditProvider(provider.id)" style="cursor: pointer;">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                          width="16" height="16"
                          viewBox="0 0 16 16"
                          style=" fill:#000000;">
                          <path d="M 12.03125 2.023438 C 11.535156 2.023438 11.066406 2.269531 10.675781 2.65625 L 2.5625 10.726563 L 1.207031 14.785156 L 5.265625 13.433594 L 5.351563 13.351563 L 13.386719 5.367188 C 13.773438 4.976563 14.015625 4.507813 14.015625 4.011719 C 14.015625 3.515625 13.773438 3.046875 13.386719 2.65625 C 12.996094 2.269531 12.527344 2.023438 12.03125 2.023438 Z M 10.027344 4.710938 L 11.320313 6.007813 L 4.726563 12.5625 L 2.789063 13.207031 L 3.4375 11.265625 Z">
                          </path>
                        </svg>
                      </div>
                      <div @click="deleteProvider(provider.id)" style="cursor: pointer;">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                          width="16" height="16"
                          viewBox="0 0 16 16"
                          style=" fill:#000000;">
                          <path d="M 6.496094 1 C 5.675781 1 5 1.675781 5 2.496094 L 5 3 L 2 3 L 2 4 L 3 4 L 3 12.5 C 3 13.328125 3.671875 14 4.5 14 L 10.5 14 C 11.328125 14 12 13.328125 12 12.5 L 12 4 L 13 4 L 13 3 L 10 3 L 10 2.496094 C 10 1.675781 9.324219 1 8.503906 1 Z M 6.496094 2 L 8.503906 2 C 8.785156 2 9 2.214844 9 2.496094 L 9 3 L 6 3 L 6 2.496094 C 6 2.214844 6.214844 2 6.496094 2 Z M 5 5 L 6 5 L 6 12 L 5 12 Z M 7 5 L 8 5 L 8 12 L 7 12 Z M 9 5 L 10 5 L 10 12 L 9 12 Z">
                          </path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <hr>

            <!--Footer-->
            <div class="flex justify-end pt-2">
              <button @click="closeModalOfAddClient" class="px-4 bg-red p-3 rounded-lg bg-red-500 hover:bg-red-100 hover:text-white-400 mr-2">Cancel</button>
              <button v-if="add" @click.prevent="addClient" class="modal-close px-4 bg-green-500 p-3 rounded-lg text-white hover:bg-green-400">Add Client</button>
              <button v-else @click.prevent="updateClient" class="modal-close px-4 bg-green-500 p-3 rounded-lg text-white hover:bg-green-400">Update Client</button>
            </div>
            
          </div>
        </div>
      </div>

      <!-- Delete prompt modal -->
      <div class="modal2 opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center">
        <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
        
        <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
          <div class="modal-content py-4 text-left px-6">
            <!--Title-->
            <div class="flex justify-between items-center pb-3">
              <p class="text-2xl font-bold">Delete Client</p>
            </div>
            <hr>
            <div>
              <div class="bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md" role="alert" v-if="clientAdded">
                <div class="flex">
                  <div class="py-1"><svg class="fill-current h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                  <div>
                    <p class="font-bold">Client deleted successfully</p>
                  </div>
                </div>
              </div>
              <div class="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md" role="alert" v-if="noClientAdded">
                <div class="flex">
                  <div class="py-1"><svg class="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                  <div>
                    <p class="font-bold">Unable to delete client</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!--Body-->
            <div class="mt-5 mb-5">
              <h2 class="text-center">Are you sure you want to delete Client ?</h2>
            </div>
            <hr>

            <!--Footer-->
            <div class="flex justify-end pt-2">
              <button @click="closeModalOfDeleteClient" class="px-4 bg-red p-3 rounded-lg bg-red-500 hover:bg-red-100 hover:text-white-400 mr-2">Cancel</button>
              <button @click.prevent="deleteClient" class="modal-close px-4 bg-green-500 p-3 rounded-lg text-white hover:bg-green-400">Delete Client</button>
            </div>
            
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
  data() {
    return {
      modalTitle: "",
      providers: [],
      clients: [],
      form: {
        name: '',
        email: '',
        phone: '',
        providers: []
      },
      clientAdded: false,
      noClientAdded: false,
      selectedClientId: '',
      add: true,
      addProvider: true,
      providerName: '',
      providerId: ''
    }
  },
  methods: {
    triggerModal(param1, param2) {
      if (param1 === 'add') {
        this.add = true
        this.modalTitle = "New Client"
        this.toggleModal()
      } else {
        this.add = false
        this.selectedClientId = param2
        this.getOneClientDetails(param2)
        this.modalTitle = "Edit Client"
        this.toggleModal()
      }
      
    },
    triggerDeleteModal() {
      this.toggleDeleteModal()
    },
    closeModalOfAddClient() {
      this.form = {}
      this.toggleModal()
    },
    closeModalOfDeleteClient() {
      this.toggleDeleteModal()
    },
    toggleModal() {
      const body = document.querySelector('body')
      const modal = document.querySelector('.modal')
      modal.classList.toggle('opacity-0')
      modal.classList.toggle('pointer-events-none')
      body.classList.toggle('modal-active')
    },
    toggleDeleteModal() {
      const body = document.querySelector('body')
      const modal = document.querySelector('.modal2')
      modal.classList.toggle('opacity-0')
      modal.classList.toggle('pointer-events-none')
      body.classList.toggle('modal-active')
    },
    //fetch all providers
    fetchProviders() {
      axios.get('/get-providers')
      .then((response) => {
        this.providers = response.data.response
      })
      .catch(() => {
        this.providers = []
      })
    },
    getcheckboxval(param1, param2) {
      const val = {
        id: param1,
        name: param2
      }
      this.form.providers.push(val)
    },
    //add a new client
    addClient() {
      axios.post('/create-client', this.form)
      .then(() => {
        this.clientAdded = true
        this.fetchClients()
        setTimeout(() => {
          this.clientAdded = false
        }, 2000);
      })
      .catch(() => {
        this.noClientAdded = true
        setTimeout(() => {
          this.noClientAdded = false
        }, 2000);
      })
    },
    //fetch all clients
    fetchClients() {
      axios.get('/clients')
      .then((response) => {
        this.clients = response.data.arr
      })
      .catch((err) => {
        console.log(err)
      })
    },
    //prompt delete modal
    promptDelete(id) {
      this.selectedClientId = id
      this.triggerDeleteModal();
    },
    //delete a client from database
    deleteClient() {
      axios.delete(`/clients/${this.selectedClientId}`)
      .then(() => {
        this.clientAdded = true
        this.fetchClients()
        setTimeout(() => {
          this.clientAdded = false
        }, 2000);
      })
      .catch(() => {
        this.noClientAdded = true
        setTimeout(() => {
          this.noClientAdded = false
        }, 2000);
      })
    },
    getOneClientDetails(id) {
      axios.get(`/clients/${id}`)
      .then((response) => {
        this.form = response.data.arr[0]
        this.form.providers = []
      })
      .catch((err) => {
        console.log(err)
      })
    },
    updateClient() {
      axios.patch(`/clients/${this.selectedClientId}`, this.form)
      .then(() => {
        alert("Client details updated successfully")
        this.form = {}
        this.fetchClients()
      })
      .catch(() => {
        alert("Unable to update details")
      })
    },
    addNewProvider() {
      axios.post('/create-provider', {
        providerName: this.providerName
      })
      .then(() => {
        alert('New Provider created')
        this.fetchProviders()
        this.providerName = ''
      })
      .catch(() => {
        alert('Unable to create a new provider')
      })
    },
    deleteProvider(id) {
      axios.delete(`/delete-provider/${id}`)
      .then(() => {
        alert("Provider deleted successfully")
        this.fetchProviders()
      })
      .catch(() => {
        alert("unable to delete provider")
      })
    },
    promptEditProvider(id) {
      this.addProvider = false
      axios.get(`/get-provider/${id}`)
      .then((response) => {
        this.providerName = response.data.response.name
        this.providerId = response.data.response.id
      })
      .catch(() => {
        this.providerName = ""
      })
    },
    updateProvider() {
      axios.patch(`/update-provider/${this.providerId}`, 
      {providerName: this.providerName})
      .then(() => {
        alert("Provider updated successfully")
        this.fetchProviders()
        this.providerName = ""
      })
      .catch(() => {
        alert("Unable to update provider")
      })
    }
  },
  mounted() {
    this.fetchProviders();
    this.fetchClients();
  }
}
</script>
<style scoped>
input {
  border-top: 1px solid grey;
  border-left: 1px solid grey;
  border-right: 1px solid grey;
  border-bottom: 1px solid grey;
}
.providers {
  border: 1px solid grey;
}
@media (min-width: 640px) {
    table {
      display: inline-table !important;
    }

    thead tr:not(:first-child) {
      display: none;
    }
  }

  td:not(:last-child) {
    border-bottom: 0;
  }

  th:not(:last-child) {
    border-bottom: 2px solid rgba(0, 0, 0, .1);
  }
</style>
