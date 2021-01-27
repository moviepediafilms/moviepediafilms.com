<template>
  <div class="row justify-center">
    <q-avatar size="110px" style="margin-left: 8px">
      <img :src="profile.image" @error="on_user_img_error" />
    </q-avatar>
    <div class="self-end" style="margin-left: -24px" v-if="editable">
      <q-btn
        round
        flat
        @click="on_change_icon"
        size="8px"
        color="white"
        v-ripple
        class="q-pa-xs bg-grey-7"
        icon="mdi-camera"
      />
      <div style="display: none">
        <q-file
          ref="file_select"
          v-model="profile_image.file"
          accept=".jpg, image/*"
          @rejected="on_profile_image_reject"
        />
      </div>
    </div>

    <q-dialog v-model="change_icon_dialog" v-if="editable">
      <q-card style="width: 400px; max-width: 80vw">
        <q-card-section class="text-center">
          <div class="text-h6 q-mb-lg">Change Picture</div>

          <vue-cropper
            style="height: 60vw; width: 100%"
            ref="cropper"
            :aspect-ratio="1"
            :src="profile_image_url"
            alt="Profile Picture"
          >
          </vue-cropper>
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
</template>
<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import { PROFILE_IMAGE_UPDATE } from "@/store/actions";
export default {
  props: {
    editable: {
      type: Boolean,
      default: true,
    },
    profile: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    VueCropper,
  },
  data() {
    return {
      change_icon_dialog: false,
      profile_image: {
        file: null,
        error: "",
        loading: false,
      },
    };
  },
  watch: {
    profile_image_url() {
      // called when the select file has changed then reset the error
      this.profile_image.error = "";
      if (this.profile_image.file) this.change_icon_dialog = true;
    },
  },
  computed: {
    profile_image_url() {
      if (this.profile_image.file)
        return URL.createObjectURL(this.profile_image.file);
      return this.profile.image;
    },
  },
  methods: {
    on_profile_image_reject() {
      this.profile_image.error = "Select an image";
    },
    on_change_icon() {
      this.$refs.file_select.$el.click();
    },
    save_profile_image() {
      this.profile_image.loading = true;
      this.$refs.cropper
        .getCroppedCanvas({
          width: 400,
          height: 400,
        })
        .toBlob((blob) => {
          this.$store
            .dispatch(PROFILE_IMAGE_UPDATE, blob)
            .then(() => {
              this.profile_image.loading = false;
              this.profile_image.file = null;
              this.change_icon_dialog = false;
            })
            .catch((error) => {
              this.profile_image.loading = false;
              // TODO: show error message wither on the popup or seperately
              this.change_icon_dialog = false;
              console.log(error);
            });
        }, "image/png");
    },
  },
};
</script>