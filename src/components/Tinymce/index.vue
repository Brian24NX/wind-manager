<template>
  <div :class="{fullscreen:fullscreen}" class="tinymce-container" :style="{width:containerWidth}">
    <textarea :id="tinymceId" class="tinymce-textarea" />
    <div class="editor-custom-btn-container">
      <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />
    </div>
  </div>
</template>

<script>
/**
 * docs:
 * https://panjiachen.github.io/vue-element-admin-site/feature/component/rich-editor.html#tinymce
 */
import editorImage from './components/EditorImage'
// import plugins from './plugins'
// import toolbar from './toolbar'
import load from './dynamicLoadScript'

// why use this cdn, detail see https://github.com/PanJiaChen/tinymce-all-in-one
const tinymceCDN = 'https://cdn.bootcdn.net/ajax/libs/tinymce/6.0.3/tinymce.min.js'
// const tinymceCDN = 'https://cdn.bootcdn.net/ajax/libs/tinymce/5.10.5/tinymce.min.js'

export default {
  name: 'Tinymce',
  components: { editorImage },
  props: {
    id: {
      type: String,
      default: function() {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    menubar: {
      type: String,
      default: ''
    },
    height: {
      type: [Number, String],
      required: false,
      default: 360
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      languageTypeList: {
        'en': 'en',
        'zh': 'zh_CN',
        'es': 'es_MX',
        'ja': 'ja'
      }
    }
  },
  computed: {
    language() {
      return this.languageTypeList[this.$store.getters.language]
    },
    containerWidth() {
      const width = this.width
      if (/^[\d]+(\.[\d]+)?$/.test(width)) { // matches `100`, `'100'`
        return `${width}px`
      }
      return width
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || ''))
      }
    },
    language() {
      this.destroyTinymce()
      this.$nextTick(() => this.initTinymce())
    }
  },
  mounted() {
    this.init()
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce()
    }
  },
  deactivated() {
    this.destroyTinymce()
  },
  destroyed() {
    this.destroyTinymce()
  },
  methods: {
    init() {
      // dynamic load tinymce from cdn
      load(tinymceCDN, (err) => {
        if (err) {
          this.$message.error(err.message)
          return
        }
        this.initTinymce()
      })
    },
    initTinymce() {
      const _this = this
      // window.tinymce.init({
      //   statusbar: false,
      //   fontsize_formats: '12px 14px 16px 18px 20px 24px 36px',
      //   language: this.language,
      //   language_url: '/tinymce/langs/zh_CN.js',
      //   selector: `#${this.tinymceId}`,
      //   height: this.height,
      //   body_class: 'panel-body ',
      //   element_format: 'html',
      //   object_resizing: false,
      //   toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
      //   menubar: this.menubar,
      //   plugins: plugins,
      //   end_container_on_empty_block: true,
      //   powerpaste_word_import: 'clean',
      //   code_dialog_height: 450,
      //   code_dialog_width: 1000,
      //   advlist_bullet_styles: 'square',
      //   advlist_number_styles: 'default',
      //   imagetools_cors_hosts: [],
      //   default_link_target: '_blank',
      //   link_title: false,
      //   nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
      //   init_instance_callback: editor => {
      //     if (_this.value) {
      //       editor.setContent(_this.value)
      //     }
      //     _this.hasInit = true
      //     editor.on('NodeChange Change KeyUp SetContent', () => {
      //       this.hasChange = true
      //       this.$emit('input', editor.getContent())
      //     })
      //   },
      //   setup(editor) {
      //     editor.on('FullscreenStateChanged', (e) => {
      //       _this.fullscreen = e.state
      //     })
      //   },
      //   // it will try to keep these URLs intact
      //   // https://www.tiny.cloud/docs-3x/reference/configuration/Configuration3x@convert_urls/
      //   // https://stackoverflow.com/questions/5196205/disable-tinymce-absolute-to-relative-url-conversions
      //   convert_urls: false
      //   // 整合七牛上传
      //   // images_dataimg_filter(img) {
      //   //   setTimeout(() => {
      //   //     const $image = $(img);
      //   //     $image.removeAttr('width');
      //   //     $image.removeAttr('height');
      //   //     if ($image[0].height && $image[0].width) {
      //   //       $image.attr('data-wscntype', 'image');
      //   //       $image.attr('data-wscnh', $image[0].height);
      //   //       $image.attr('data-wscnw', $image[0].width);
      //   //       $image.addClass('wscnph');
      //   //     }
      //   //   }, 0);
      //   //   return img
      //   // },
      //   // images_upload_handler(blobInfo, success, failure, progress) {
      //   //   progress(0);
      //   //   const token = _this.$store.getters.token;
      //   //   getToken(token).then(response => {
      //   //     const url = response.data.qiniu_url;
      //   //     const formData = new FormData();
      //   //     formData.append('token', response.data.qiniu_token);
      //   //     formData.append('key', response.data.qiniu_key);
      //   //     formData.append('file', blobInfo.blob(), url);
      //   //     upload(formData).then(() => {
      //   //       success(url);
      //   //       progress(100);
      //   //     })
      //   //   }).catch(err => {
      //   //     failure('出现未知问题，刷新页面，或者联系程序员')
      //   //     console.log(err);
      //   //   });
      //   // },
      // })
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        // skin:'oxide-dark',
        language: this.language,
        branding: false,
        toolbar_mode: 'wrap',
        elementpath: false,
        language_url: '/tinymce/langs/zh_CN.js',
        menubar: 'edit insert format table tools',
        menu: {
          edit: { title: 'Edit', items: 'undo redo | selectall' }
        },
        plugins: 'preview searchreplace autolink directionality visualblocks visualchars link table charmap hr nonbreaking insertdatetime advlist lists emoticons autosave autoresize',
        toolbar: 'undo redo styleselect formatselect fontselect fontsizeselect lineheight forecolor backcolor bold italic underline strikethrough link alignleft aligncenter alignright alignjustify outdent indent bullist numlist blockquote subscript superscript removeformat table charmap emoticons hr insertdatetime preview',
        height: 600, // 编辑器高度
        min_height: 600,
        max_height: 600,
        fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
        font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
        color_map: [
          'BFEDD2', 'Light Green',
          'FBEEB8', 'Light Yellow',
          'F8CAC6', 'Light Red',
          'ECCAFA', 'Light Purple',
          'C2E0F4', 'Light Blue',
          '2DC26B', 'Green',
          'F1C40F', 'Yellow',
          'E03E2D', 'Red',
          'B96AD9', 'Purple',
          '3598DB', 'Blue',
          '169179', 'Dark Turquoise',
          'E67E23', 'Orange',
          'BA372A', 'Dark Red',
          '843FA1', 'Dark Purple',
          '236FA1', 'Dark Blue',
          'ECF0F1', 'Light Gray',
          'CED4D9', 'Medium Gray',
          '95A5A6', 'Gray',
          '7E8C8D', 'Dark Gray',
          '34495E', 'Navy Blue',
          '031745', 'Blue Hover',
          '04246A', 'CMACGM Blue',
          '235AF6', 'Blue Link',
          'B20101', 'Red Hover',
          'E20101', 'CMACGM Red',
          '000000', 'Black',
          'FFFFFF', 'White'
        ],
        importcss_append: false,
        toolbar_sticky: false,
        autosave_ask_before_unload: false,
        convert_urls: false,
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        }
      })
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId)
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen')
      }

      if (tinymce) {
        tinymce.destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent()
    },
    imageSuccessCBK(arr) {
      arr.forEach(v => window.tinymce.get(this.tinymceId).insertContent(`<img class="wscnph" src="${v.url}" >`))
    }
  }
}
</script>

<style lang="scss">
.tinymce-container {
  position: relative;
  line-height: normal;
}

.tinymce-container {
  ::v-deep {
    .mce-fullscreen {
      z-index: 10000;
    }
  }
}

.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}

.editor-custom-btn-container {
  position: absolute;
  right: 6px;
  top: 6px;
  z-index: 1;
}

.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}

.editor-upload-btn {
  display: inline-block;
}

.tox-tinymce-aux {
  z-index: 9999 !important;
}
</style>
