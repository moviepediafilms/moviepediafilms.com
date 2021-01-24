<template>
  <base-layout>
    <div class="q-ma-md text-center q-pt-sm">
      <div class="text-primary text-h1">Notifications</div>
      <transition
        appear
        v-on:enter="enter"
        v-on:leave="leave"
        tag="div"
        v-show="notification_count > 0"
      >
        <div class="q-mt-md">
          <transition-group
            appear
            v-on:enter="enter"
            v-on:leave="leave"
            tag="div"
            v-for="(item, index) in all_items"
            :key="index"
          >
            <template v-if="item.movie">
              <movie-request
                v-bind:key="index"
                v-bind:data-index="index"
                :id="item.movie.id"
                :poster="item.movie.poster"
                :title="item.movie.title"
                :loadingApproved="loading === `movie_Approve_${item.movie.id}`"
                :loadingDeclined="loading === `movie_Decline_${item.movie.id}`"
                @approve="
                  on_movie_update(item.movie.id, 'Approve', true, index)
                "
                @decline="
                  on_movie_update(item.movie.id, 'Decline', false, index)
                "
              ></movie-request>
            </template>
            <template v-if="item.crew">
              <crew-request
                v-bind:key="index"
                v-bind:data-index="index"
                :id="item.crew.id"
                :role="item.crew.role"
                :user="item.crew.user"
                :movie-title="item.crew.movie_title"
                @approve="on_crew_update(item.crew.id, 'Approve', 'A', index)"
                @decline="on_crew_update(item.crew.id, 'Decline', 'D', index)"
                :approve-loading="loading === `crew_Approve_${item.crew.id}`"
                :decline-loading="loading === `crew_Decline_${item.crew.id}`"
              ></crew-request>
            </template>
            <template v-if="item.info">
              <info-item
                v-bind:key="index"
                v-bind:data-index="index"
                :title="item.info.title"
                :content="item.info.content"
              ></info-item>
            </template>
          </transition-group>
        </div>
      </transition>
      <div v-show="notification_count == 0">
        <transition v-on:enter="enter" tag="div" v-on:leave="leave">
          <empty-state
            class="q-mt-lg"
            icon="mdi-bell-check"
            title="You're all caught up"
            desc=""
          />
        </transition>
      </div>
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
import CrewRequest from "@/components/notification/CrewRequest";
import MovieRequest from "@/components/notification/MovieRequest";
import InfoItem from "@/components/notification/InfoItem";

import {
  profile_service,
  crew_request_service,
  movie_service,
} from "@/services";
export default {
  name: "notification-page",
  components: {
    BaseLayout,
    CrewRequest,
    MovieRequest,
    InfoItem,
  },
  metaInfo: {
    title: "Notifications",
  },
  data() {
    return {
      loading: true,
      error_msg: "",
      all_items: [],
      notifications: [],
      movie_approvals: [],
      crew_approvals: [],
    };
  },
  computed: {
    notification_count() {
      return this.all_items.length;
    },
  },
  mounted() {
    Promise.all([
      this.fetch_notifications(),
      this.fetch_movie_approvals(),
      this.fetch_crew_approvals(),
    ]).then(() => {
      this.loading = false;
      this.movie_approvals.forEach((item) => {
        this.all_items.push({ movie: item });
      });
      this.crew_approvals.forEach((item) => {
        this.all_items.push({ crew: item });
      });
      this.notifications.forEach((item) => {
        this.all_items.push({ info: item });
      });
    });
  },
  methods: {
    enter(el, done) {
      this.$gsap.from(el, {
        y: 300,
        opacity: 0,
        delay: el.dataset.index * 0.2,
        ease: "back",
        onComplete: done,
      });
    },
    leave(el, done) {
      this.$gsap.to(el, {
        x: -300,
        opacity: 0,
        onComplete: done,
      });
    },
    enter_container(el, done) {
      this.$gsap.from(el, {
        opacity: 0,
        ease: "back",
        onComplete: done,
      });
    },
    leave_container(el, done) {
      this.$gsap.to(el, {
        opacity: 0,
        onComplete: done,
      });
    },
    fetch_notifications() {
      return new Promise((resolve) => {
        profile_service
          .get({}, `${this.my_profile.id}/notifications`)
          .then((data) => {
            this.notifications.push(...data.results);
            resolve();
          })
          .catch((error) => {
            this.error_msg = this.decode_error_message(error);
            resolve();
          });
      });
    },
    fetch_movie_approvals() {
      return new Promise((resolve) => {
        profile_service
          .get({}, `${this.my_profile.id}/movie-approvals`)
          .then((data) => {
            this.movie_approvals.push(...data.results);
            resolve();
          })
          .catch((error) => {
            this.error_msg = this.decode_error_message(error);
            resolve();
          });
      });
    },
    fetch_crew_approvals() {
      return new Promise((resolve) => {
        profile_service
          .get({}, `${this.my_profile.id}/crew-approvals`)
          .then((data) => {
            this.crew_approvals.push(...data.results);
            resolve();
          })
          .catch((error) => {
            this.error_msg = this.decode_error_message(error);
            resolve();
          });
      });
    },
    get_message() {},
    on_movie_update(movie_id, action, approved, index) {
      this.loading = `movie_${action}_${movie_id}`;
      movie_service.patch({ approved: approved }, movie_id).then((data) => {
        var success = data.approved === approved;
        if (success) {
          this.all_items.splice(index, 1);
        }
        var success_action = action === "Approve" ? "approved" : "declined";
        var error_action = action === "Approve" ? "approval" : "decline";
        var message = success
          ? `Film ${success_action} successfully`
          : `Film ${error_action} was unsuccessful`;
        this.$q.notify({
          message: message,
          color: success ? "positive" : "negative",
          icon: success ? "mdi-check" : "mdi-close",
          textColor: "white",
        });
        this.loading = "";
      });
    },
    on_crew_update(crew_req_id, action, state, index) {
      this.loading = `crew_${action}_${crew_req_id}`;
      crew_request_service.patch({ state: state }, crew_req_id).then((data) => {
        var success = data.state === state;
        if (success) {
          this.all_items.splice(index, 1);
        }
        var success_action = action === "Approve" ? "approved" : "declined";
        var error_action = action === "Approve" ? "approval" : "decline";
        var message = success
          ? `Crew request ${success_action} successfully`
          : `Crew request ${error_action} was unsuccessful`;
        this.$q.notify({
          message: message,
          color: success ? "positive" : "negative",
          icon: success ? "mdi-check" : "mdi-close",
          textColor: "white",
        });
        this.loading = "";
      });
    },
  },
};
</script>
