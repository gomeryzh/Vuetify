<template>
  <v-dialog width="600" v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn class="success" dark v-on="on">Add new project</v-btn>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>Add new project</v-card-title>

      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field
            name="Title"
            label="Title"
            :rules="inputRules"
            prepend-icon="folder"
            v-model="title"
          ></v-text-field>
          <v-textarea
            name="Info"
            label="Info"
            :rules="inputRules"
            prepend-icon="edit"
            v-model="projectInfo"
          ></v-textarea>

          <v-menu full-width max-width="290">
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="formattedDate"
                clearable
                label="Due date"
                prepend-icon="date_range"
                readonly
                v-on="on"
                :rules="inputRules"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date"></v-date-picker>
          </v-menu>

          <v-btn flat class="mb-3 mx-0 success" @click="formSubmit" :loading="loading">Add Project</v-btn>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>
    </v-card>
  </v-dialog>
</template>

<script>
import format from "date-fns/format";
import db from "../fb.js";

export default {
  data() {
    return {
      title: "",
      projectInfo: "",
      date: null,
      inputRules: [v => v.length > 3 || "Minimum length is 4 symbols"],
      loading: false,
      dialog: false
    };
  },
  methods: {
    formSubmit() {
      if (!this.$refs.form.validate()) return;
      this.loading = true;
      const project = {
        title: this.title,
        content: this.projectInfo,
        due: format(this.date, "Do MMM YYYY"),
        person: "The Net Ninja",
        status: "ongoing"
      };

      db.collection("projects")
        .add(project)
        .then(res => {
          console.log("added to DB:", res);
          this.loading = false;
          this.dialog = false;
          this.$emit("projectAdded");
        });
    }
  },
  computed: {
    formattedDate() {
      return this.date ? format(this.date, "Do MMM YYYY") : "";
    }
  }
};
</script>

<style scoped>
</style>