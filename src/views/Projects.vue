<template>
  <div class="projects">
    <v-container class="my-5">
      <v-expansion-panel>
        <v-expansion-panel-content v-for="project in myProjects" :key="project.name" class="pb-1">
          <template v-slot:header>
            <div>{{project.title}}</div>
          </template>
          <v-card>
            <v-card-text class="px-4 grey--text">
              <div class="font-weight-bold">{{project.due}}</div>
              <div>{{project.content}}</div>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>
  </div>
</template>

<script>
import db from "../fb.js";

export default {
  data() {
    return {
      projects: []
    };
  },
  created() {
    db.collection("projects").onSnapshot(res => {
      const changes = res.docChanges();

      changes.forEach(change => {
        if ((change.type = "added")) {
          this.projects.push({
            ...change.doc.data(),
            id: change.doc.id
          });
        }
      });
    });
  },
  computed: {
    myProjects() {
      return this.projects.filter(
        project => project.person === "The Net Ninja"
      );
    }
  }
};
</script>
