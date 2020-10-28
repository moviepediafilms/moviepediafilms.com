<template>
  <base-layout>
    <div class="q-pa-md">
      <div class="row justify-center">
        <div class="col text-center">
          <div class="row justify-center">
            <q-avatar size="100px" style="margin-left: 24px">
              <img :src="my_profile.image" />
            </q-avatar>
            <div class="self-end">
              <q-icon
                @click="on_change_icon"
                size="16px"
                v-ripple
                class="q-pa-xs"
                name="mdi-border-color"
              />
            </div>
          </div>
          <div class="text-h5 text-weight-bold q-mt-md">
            {{ my_profile.name }}
          </div>
        </div>
      </div>
      <div class="row q-mt-lg">
        <div class="col-8 offset-2">
          <div class="row">
            <div class="col-4 text-center">
              <div class="text-uppercase text-title text-weight-bolder">
                cinephile
              </div>
              <div class="q-mt-xs text-uppercase text-caption">level</div>
            </div>
            <div class="col-4 text-center">
              <div class="text-uppercase text-title text-weight-bolder">
                100
              </div>
              <div class="q-mt-xs text-uppercase text-caption">rank</div>
            </div>
            <div class="col-4 text-center">
              <div class="text-uppercase text-title text-weight-bolder">
                300
              </div>
              <div class="q-mt-xs text-uppercase text-caption">review</div>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-center q-mt-md">
        <q-linear-progress
          size="5px"
          :value="engagement"
          track-color="white"
          class="row q-mt-sm"
          style="max-width: 180px"
        />
        <span class="text-xs q-ml-sm">
          65 <q-icon name="mdi-percent" /> <q-icon name="mdi-chevron-down"
        /></span>
      </div>
      <div class="row justify-around q-mt-none q-pa-none">
        <div
          class="text-overline text-uppercase"
          style="font-size: 9px; line-height: 1em"
        >
          Engagement meter
        </div>
      </div>
      <div class="q-mt-md">
        <q-card flat>
          <q-tabs
            v-model="tab"
            dense
            class="white"
            indicator-color="primary"
            align="justify"
            inline-label
            outside-arrows
            mobile-arrows
          >
            <q-tab name="watchlist" label="Watchlist" />
            <q-tab name="recommends" label="Recommends" />
            <q-tab name="lists" label="Lists" />
            <q-tab name="followers" :label="followers.length + ' Followers'" />
            <q-tab
              name="followings"
              :label="followings.length + ' Followings'"
            />
          </q-tabs>
          <q-separator />
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="watchlist" class="q-px-none">
              <movie-list
                :source="watchlist"
                @item-selected="on_movie_click"
              ></movie-list>
            </q-tab-panel>
            <q-tab-panel name="recommends">
              <movie-list
                :source="recommends"
                @item-selected="on_movie_click"
              ></movie-list>
            </q-tab-panel>
            <q-tab-panel name="lists">
              <q-list>
                <q-item
                  v-for="list in my_lists"
                  :key="list.id"
                  class="q-ma-none"
                  v-ripple
                  clickable
                  @click="on_list_click(list)"
                >
                  <q-item-section>
                    <q-item-label class="text-title">
                      {{ list.name }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label class="text-center">
                      <div class="text-title">{{ list.movies.length }}</div>
                      <div
                        class="text-caption text-uppercase"
                        style="font-size: 0.7em"
                      >
                        Movies
                      </div>
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-item-label class="text-center">
                      <div class="text-title">{{ list.like_count }}</div>
                      <div
                        class="text-caption text-uppercase"
                        style="font-size: 0.7em"
                      >
                        Likes
                      </div>
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn
                      size="sm"
                      flat
                      round
                      icon="mdi-dots-vertical"
                      @click.stop="list_item_menu = !list_item_menu"
                    >
                    </q-btn>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>
            <q-tab-panel name="followings"> </q-tab-panel>
            <q-tab-panel name="follows"> </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
      <q-dialog v-model="list_item_menu">
        <q-card class="" style="width: 400px; max-width: 50vw">
          <q-card-section>
            <q-list class="">
              <q-item clickable v-ripple v-close-popup>
                <q-item-section side>
                  <q-icon name="mdi-border-color" size="xs" />
                </q-item-section>
                <q-item-section> Edit </q-item-section>
              </q-item>
              <q-item clickable v-ripple v-close-popup>
                <q-item-section side>
                  <q-icon name="mdi-trash-can" size="xs" />
                </q-item-section>
                <q-item-section> Delete </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </q-dialog>
      <q-dialog v-model="change_icon_dialog">
        <q-card class="" style="width: 400px; max-width: 80vw">
          <q-card-section class="text-center">
            <div class="text-h6">Change Picture</div>
            <q-avatar size="100px" class="q-mt-md">
              <img :src="profile_image_url" />
            </q-avatar>
            <q-file
              filled
              class="q-mt-md"
              style="max-width: 300px"
              v-model="profile_image.file"
              label="Select File"
              accept=".jpg, image/*"
              max-file-size="1000000"
              @rejected="on_profile_image_reject"
              :error="!!profile_image.error"
              :error-message="profile_image.error"
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn
              flat
              :loading="profile_image.loading"
              :disable="!profile_image.file"
              color="primary"
              label="Upload"
              @click="save_profile_image"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </base-layout>
</template>
<script>
import BaseLayout from "@/layouts/Base";
import MovieList from "@/components/MovieList";
import {
  PROFILE_WATCHLIST_REQUEST,
  PROFILE_RECOMMENDS_REQUEST,
  PROFILE_IMAGE_UPDATE,
} from "@/store/actions";
import { mapState } from "vuex";
export default {
  name: "profile-page",
  components: {
    BaseLayout,
    MovieList,
  },
  metaInfo: {
    title: "Profile",
  },
  data() {
    return {
      hover: false,
      tab: "lists",
      engagement: 0.8,
      followers: [],
      followings: [],
      profile_image: {
        file: null,
        error: "",
        loading: false,
      },
      new_profile_image: null,
      selected_file_error: "",
      xp_info_dialog: false,
      earning_info_dialog: false,
      badge_info_dialog: false,
      edit_name_dialog: false,
      change_icon_dialog: false,
      list_item_menu: false,
    };
  },
  computed: {
    ...mapState("profile", ["watchlist", "recommends"]),
    ...mapState("list", ["my_lists"]),
    profile_image_url() {
      if (this.profile_image.file)
        return URL.createObjectURL(this.profile_image.file);
      return this.my_profile.image;
    },
  },
  watch: {
    profile_image_url() {
      // called when the select file has changed then reset the error
      this.profile_image.error = "";
    },
  },
  mounted() {
    this.$store.dispatch(PROFILE_WATCHLIST_REQUEST);
    this.$store.dispatch(PROFILE_RECOMMENDS_REQUEST);
  },
  methods: {
    show_xp_info_dialog() {
      this.xp_info_dialog = true;
    },
    show_earning_info_dialog() {
      this.earning_info_dialog = true;
    },
    show_badge_info_dialog() {
      this.badge_info_dialog = true;
    },
    show_edit_popup() {
      this.edit_name_dialog = true;
    },
    on_movie_click(item) {
      this.$router.push({
        name: "movie-detail",
        params: { id: item.id, slug: this.slugify(item.title) },
      });
    },
    on_list_click(list) {
      // redirect to page where he can see his list stats and movies in it
      console.log(list);
    },
    on_change_icon() {
      this.change_icon_dialog = true;
    },
    list_description(list) {
      var plural = list.movies.length == 0 || list.movies.length > 1 ? "s" : "";
      var prefix = list.movies.length == 0 ? "No" : list.movies.length;
      return `${prefix} Movie${plural}`;
    },
    list_like_text(list) {
      var plural = list.like_count == 0 || list.like_count > 1 ? "s" : "";
      var prefix = list.like_count == 0 ? "No" : list.like_count;
      return `${prefix} like${plural}`;
    },
    on_profile_image_reject() {
      this.profile_image.error = "Select an image file with size < 1MB";
    },
    save_profile_image() {
      this.profile_image.loading = true;
      this.$store
        .dispatch(PROFILE_IMAGE_UPDATE, this.profile_image.file)
        .then(() => {
          this.profile_image.loading = false;
        })
        .catch((error) => {
          this.profile_image.loading = false;
          console.log(error);
        });
    },
  },
};
</script>
<style lang="scss">
.q-linear-progress__track {
  opacity: 1;
}
.q-linear-progress__model {
  background: linear-gradient(45deg, yellow, green);
}
</style>