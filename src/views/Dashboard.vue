<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-container class="my-5">
      <v-layout row wrap class="mb-3">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn dark v-on="on" color="grey" small flat @click="sortBy('title')">
              <v-icon small left>folder</v-icon>
              <span class="text-lowercase">by Folder</span>
            </v-btn>
          </template>
          <span class="caption text-lowercase">Sort by Project name</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn dark v-on="on" color="grey" small flat @click="sortBy('person')">
              <v-icon small left>person</v-icon>
              <span class="text-lowercase">by Person</span>
            </v-btn>
          </template>
          <span class="caption text-lowercase">Sort by Person name</span>
        </v-tooltip>
      </v-layout>
      <v-card flat v-for="project in projects" :key="project.title">
        <v-layout row wrap :class="`pa-3 project ${project.status}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">{{project.title}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">{{project.person}}</div>
            <div>The net Ninja</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">{{project.due}}</div>
            <div>12th Jan 2019</div>
          </v-flex>
          <v-flex xs12 sm4 md2>
            <div class="right">
              <v-chip small :class="`${project.status} white--text caption my-2`">{{project.status}}</v-chip>
            </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
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
  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    }
  }
};
</script>

<style scoped>
.project.complete {
  border-left: 4px solid #3cd1c2;
}
.project.ongoing {
  border-left: 4px solid orange;
}
.project.overdue {
  border-left: 4px solid tomato;
}
.v-chip.complete {
  background: #3cd1c2;
}
.v-chip.ongoing {
  background: orange;
}
.v-chip.overdue {
  background: tomato;
}
</style>

