<template>
  <div>
    <div class="row q-gutter-xs q-pb-lg" v-show="submitted_movies.length > 0">
      <div
        class="col-4 col-md-3"
        :key="movie.id"
        v-for="movie in submitted_movies"
        @click="selected_movie_id = movie.id"
      >
        <div
          class="movie-item q-pa-sm"
          :class="{ selected: selected_movie_id === movie.id }"
        >
          <movie-image
            :title="movie.title"
            :state="movie.state"
            :show-state="false"
            :poster="movie.poster"
          />
        </div>
      </div>
      <div
        class="col-4 col-md-3 movie-item q-pa-sm"
        :class="{ selected: selected_movie_id == null }"
        @click="selected_movie_id = null"
      >
        <q-img
          :ratio="9 / 16"
          spinner-color="primary"
          spinner-size="24px"
          transition="fade"
        >
          <div
            class="
              absolute-full
              justify-center
              bg-primary
              column
              text-dark
              new-item
              row
            "
          >
            <div class="text-body1">Submit New</div>
          </div>
        </q-img>
      </div>
    </div>
    <q-form
      ref="submit"
      class="q-gutter-y-md"
      @submit="on_submit"
      v-show="selected_movie_id == null"
    >
      <div>
        <q-input
          type="text"
          v-model="submit_data.title"
          label="Film Title"
          :rules="[
            (val) => (val && val.length > 0) || 'Please enter film title',
            (val) =>
              (val && val.match(/^[\x00-\x7F]*$/)) ||
              'Please use alpha numeric characters only',
          ]"
          :error-message="submit_error.title"
          :error="!!submit_error.title"
          filled
        ></q-input>
      </div>
      <div>
        <q-input
          type="url"
          v-model="submit_data.link"
          :rules="[
            (val) => (val && val.length > 0) || 'Please provide film link',
          ]"
          hint="should be publicly accessible"
          label="Link"
          :error-message="submit_error.link"
          :error="!!submit_error.link"
          filled
        ></q-input>
      </div>
      <div>
        <q-select
          filled
          use-chips
          use-input
          v-model="submit_data.lang"
          :options="filtered_lang"
          @filter="lang_filter_fn"
          option-label="name"
          :hint="
            submit_data.lang
              ? submit_data.lang.name === 'English'
                ? ''
                : 'Subtitles required for film'
              : ''
          "
          label="Language"
          :rules="[(val) => val || 'Please select the language used in film']"
          :error-message="submit_error.lang"
          :error="!!submit_error.lang"
        />
      </div>

      <div>
        <q-input
          type="number"
          :rules="[
            (val) => (val && val.length > 0) || 'Please enter film runtime',
            (val) => parseInt(val) > 0 || 'Please enter valid film runtime',
            (val) => parseInt(val) <= 60 || 'That\'s too long for a short film',
          ]"
          v-model="submit_data.runtime"
          label="Runtime (in minutes)"
          :error-message="submit_error.runtime"
          :error="!!submit_error.runtime"
          filled
        ></q-input>
      </div>
      <div>
        <q-file
          v-model="original_poster"
          label="Poster"
          accept=".jpg, image/*"
          hint="Portrait poster of the film"
          filled
          clearable
          @rejected="poster_rejected"
          :error-message="submit_error.poster"
          :error="!!submit_error.poster"
        ></q-file>
      </div>
      <q-field
        borderless
        label="Select Genre"
        color="white"
        stack-label
        v-model="submit_data.genres"
        :rules="[
          (val) =>
            (val && val.length > 0) || 'Please select at-least one genre',
          (val) => (val && val.length < 4) || 'You can select max of 3',
        ]"
        :error-message="submit_error.genres"
        :error="!!submit_error.genres"
      >
        <div class="q-gutter-xs text-left q-ma-none">
          <q-checkbox
            v-model="submit_data.genres"
            :val="genre"
            :label="genre.name"
            v-for="genre in genres"
            :key="genre.name"
          />
        </div>
      </q-field>
      <div>
        <q-select
          filled
          multiple
          use-chips
          v-model="submit_data.roles"
          :options="roles"
          option-label="name"
          label="Your role(s) in film"
          :rules="[(val) => val.length > 0 || 'Please select at least one']"
          :error-message="submit_error.roles"
          :error="!!submit_error.roles"
        />
      </div>
      <p class="q-mt-xs" v-if="show_director_fields">
        Tell us about the Director of the film!
      </p>
      <div v-if="show_director_fields">
        <q-input
          type="text"
          v-model="submit_data.director.name"
          label="Name"
          :rules="[(val) => !!val || 'Please enter director\'s name']"
          filled
          :error-message="submit_error.director.name"
          :error="!!submit_error.director.name"
        ></q-input>
      </div>
      <div v-if="show_director_fields">
        <q-input
          type="email"
          v-model="submit_data.director.email"
          :rules="[(val) => !!val || 'Please enter director\'s email']"
          label="Email"
          filled
          :error-message="submit_error.director.email"
          :error="!!submit_error.director.email"
        ></q-input>
      </div>
      <div v-if="show_director_fields">
        <q-input
          type="tel"
          v-model="submit_data.director.contact"
          mask="+## ##########"
          :rules="[(val) => !!val || 'Please enter director\'s contact number']"
          label="Mobile"
          filled
          :error-message="submit_error.director.contact"
          :error="!!submit_error.director.contact"
        ></q-input>
      </div>
      <div class="text-negative">
        {{ error_msg }}
      </div>
    </q-form>
    <q-dialog v-model="poster_crop_dialog" ref="crop_dialog">
      <q-card style="width: 400px; max-width: 90vw">
        <q-card-section class="text-center">
          <div class="text-h6 q-mb-lg">Crop Poster</div>

          <vue-cropper
            ref="cropper"
            :aspect-ratio="9 / 16"
            :src="poster_image_url"
            alt="Film Poster"
          >
          </vue-cropper>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            v-close-popup
            :disabled="cropping_in_progress"
          />
          <q-btn
            flat
            color="primary"
            label="Done"
            @click="crop_poster"
            :loading="cropping_in_progress"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import langs from "@/extras/langs";
import { mapState } from "vuex";
import VueCropper from "vue-cropperjs";
import MovieImage from "@/components/movie/Image";
import "cropperjs/dist/cropper.css";
import { submission_service, profile_service } from "@/services";
import { GENRE_REQUEST } from "@/store/actions";
export default {
  props: {
    initData: {
      type: Object,
      default() {
        return {};
      },
    },
    triggerSubmit: {
      type: Number,
      default: 0,
    },
  },
  components: {
    VueCropper,
    MovieImage,
  },
  data() {
    return {
      selected_movie_id: null,
      submitted_movies: [],
      cropping_in_progress: false,
      loading: false,
      error_msg: "",
      languages: Object.values(langs),
      filtered_lang: [],
      submit_error: {
        title: "",
        link: "",
        lang: "",
        runtime: "",
        poster: "",
        roles: "",
        genres: "",
        director: {
          name: "",
          email: "",
          contact: "",
        },
      },
      original_poster: undefined,
      poster: undefined,
      poster_crop_dialog: false,
      submit_data: {
        title: "",
        link: "",
        lang: undefined,
        runtime: "",
        poster: "",
        roles: [],
        genres: [],
        director: {
          name: "",
          email: "",
          contact: "91",
        },
      },
    };
  },
  computed: {
    ...mapState({
      roles: (state) => state.role.roles,
      genres: (state) => state.genre.genres,
    }),
    show_director_fields() {
      var show = true;
      this.submit_data.roles.forEach((role) => {
        if (role.name === "Director") show = false;
      });
      return show;
    },
    poster_image_url() {
      if (this.original_poster)
        return URL.createObjectURL(this.original_poster);
      return this.original_poster;
    },
    selected_movie() {
      var selected_movie = {};
      this.submitted_movies.forEach((movie) => {
        if (movie.id === this.selected_movie_id) selected_movie = movie;
      });
      return selected_movie;
    },
  },
  watch: {
    genres() {
      var new_genres = [];
      this.submit_data.genres.forEach((g) => {
        this.genres.forEach((genre) => {
          if (g.id === genre.id) {
            new_genres.push(genre);
          }
        });
      });
      this.submit_data.genres.splice(0, this.submit_data.genres.length);
      this.submit_data.genres.push(...new_genres);
    },
    triggerSubmit() {
      // called when attempt_submit is changed in parent to trigger submittion attempt here
      if (this.selected_movie_id) {
        this.submit_data.selected_movie_id = this.selected_movie_id;
        this.$emit(
          "complete",
          Object.assign(
            {
              id: this.selected_movie_id,
              original_poster: this.original_poster,
            },
            this.submit_data
          ),
          this.selected_movie
        );
      } else {
        this.on_submit();
      }
    },
    poster_crop_dialog(value) {
      if (!value && !this.submit_data.poster) {
        this.original_poster = undefined;
      }
    },
    original_poster(value) {
      if (value && value !== this.initData.original_poster) {
        this.submit_data.poster = undefined;
        this.poster_crop_dialog = true;
      }
    },
    loading() {
      this.$emit("loading", this.loading);
    },
  },
  mounted() {
    this.get_submissions();
    this.$store.dispatch(GENRE_REQUEST);
    this.filtered_lang = this.languages;
    this.selected_movie_id = this.initData.selected_movie_id;
    delete this.initData["selected_movie_id"];
    Object.assign(this.submit_data, this.initData);
    this.original_poster = this.initData.original_poster;
  },
  methods: {
    get_submissions() {
      profile_service
        .get({}, `${this.my_profile.id}/submissions`)
        .then((data) => {
          data.results.forEach((sub) => {
            if (sub.id !== this.submit_data.id) this.submitted_movies.push(sub);
          });
        })
        .catch((error) => {
          this.error_msg = this.decode_error_message(error);
        });
    },
    map_error_fields(error) {
      var has_errors1 = false;
      var has_errors2 = false;
      if (error.response && error.response.data) {
        if (error.response.data.payload)
          has_errors1 = this.check_fields_for_error(
            error.response.data.payload,
            this.submit_error,
            ["poster", "title", "link", "runtime", "genres"]
          );
        if (error.response.data.payload.director) {
          this.submit_error.director = {};
          has_errors2 = this.check_fields_for_error(
            error.response.data.payload.director,
            this.submit_error.director,
            ["name", "email", "contact"]
          );
        }
      }
      return has_errors1 || has_errors2;
    },
    build_director_data() {
      var director = JSON.parse(JSON.stringify(this.submit_data.director));
      // if only country prefix was there
      director.contact =
        director.contact.length == 2 ? undefined : director.contact;
      if (director.name || director.email) {
        var name = director.name;
        if (name) {
          var name_segs = name.split(/[\s,]+/);
          director.last_name = "";
          if (name_segs.length > 0) director.first_name = name_segs.shift();
          if (name_segs.length > 0) director.last_name = name_segs.join(" ");
          delete director["name"];
        }
        return director;
      }
    },
    build_form_data() {
      //  copy the submit_data
      const data = JSON.parse(JSON.stringify(this.submit_data));
      delete data["poster"];

      const form_data = new FormData();
      if (this.submit_data.poster)
        form_data.append("poster", this.submit_data.poster, "poster.png");

      data.director = this.build_director_data(data.director);
      // undefined values are ommited by JSON.stringify, hence director key will be removed in value is undefined
      form_data.append("payload", JSON.stringify(data));
      return form_data;
    },
    clear_errors() {
      this.submit_error = {
        title: "",
        link: "",
        lang: "",
        runtime: "",
        poster: "",
        roles: "",
        genres: "",
        director: {
          name: "",
          email: "",
          contact: "",
        },
      };
      this.error_msg = "";
    },
    poster_rejected() {
      this.submit_error.poster = "Only image files are supported";
    },
    crop_poster() {
      this.cropping_in_progress = true;
      this.$refs.cropper
        .getCroppedCanvas({
          width: 1824,
          height: 1026,
          fillColor: "#fff",
        })
        .toBlob((blob) => {
          this.cropping_in_progress = false;
          this.submit_data.poster = blob;
          this.poster_crop_dialog = false;
        }, "image/png");
    },
    lang_filter_fn(val, update) {
      update(() => {
        if (val === "") {
          this.filtered_lang = this.languages;
        } else {
          const needle = val.toLowerCase();
          this.filtered_lang = this.languages.filter(
            (v) => v.name.toLowerCase().indexOf(needle) > -1
          );
        }
      });
    },
    on_submit() {
      this.clear_errors();
      this.$refs.submit.validate().then((valid) => {
        if (!valid) {
          return;
        }
        this.loading = true;

        var form_data = this.build_form_data();
        // if the movie was earlier submitted, perform an PATCH call otherwwise do a POST
        var action = this.initData.id ? "patch" : "post";
        var movie_id = this.initData.id ? this.initData.id : "";
        // movie_id will be ignored if its a POST
        submission_service[action](form_data, movie_id)
          .then((res_data) => {
            this.loading = false;
            this.$emit(
              "complete",
              Object.assign(
                { id: res_data.id, original_poster: this.original_poster },
                this.submit_data
              ),
              res_data
            );
          })
          .catch((err) => {
            this.loading = false;
            var found_field_error = this.map_error_fields(err);
            if (found_field_error) {
              this.error_msg = "Please fix the error(s) above to continue";
            } else
              this.error_msg =
                this.decode_error_message(err) || "There was an error !";
          });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.new-item {
  padding: 0px;
}
.movie-item {
  border-radius: 5px;
}
.selected {
  border: 1px solid orange;
}
</style> 