<template>
    <div class="vue-uploader" :class="[{'loading loading-light-bg': isLoading}, {'success': isSuccess}]">
        <label ref="preview">
            <div class="title">{{  text  }}</div>
            <input type="file" @change="handleFileChange" accept="image/*"/>
        </label>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "image-uploader",
        data() {
            return {
                isLoading: false,
                isSuccess: false
            }
        },
        props: {
            name: {
                type: String,
                default: ''

            },
            text: {
                type: String,
                default: '上传文件'

            },
            limit: { //容量限制，以M为单位
                type: Number,
                default: 3
            },
            showprocess: {
                type: String,
                default: ''
            },
            defaultUrl: {
                type: String,
                default: ''
            }
        },
        mounted() {
            this.init();
        },
        watch: {
        },
        computed: {
        },
        methods: {
            init() {
                if (this.defaultUrl != '') {
                    this.$refs.preview.style.backgroundImage = `url(${this.defaultUrl})`;
                }
            },
            handleFileChange: function (e) {
                var files = e.target.files;
                if (files.length) {
                    this.uploadAction(files[0])
                }
            },
            uploadAction: function (file) {
                if (file.size > this.limit * 1024 * 1024) {
                    return this.$message.error("文件大小不能大于${this.limit}M，请压缩后再重新上传");
                }

                var reader = new FileReader();

                reader.readAsDataURL(file); //读取file

                reader.onload = function (e) {
                    this.handleSubmit(file, function () {
                        this.success = true;
                        this.$refs.preview.style.backgroundImage = 'url(' + e.target.result + ')'
                    }.bind(this));
                }.bind(this);
            },
            handleSubmit: function (file, handleFile) {
                let formData = new FormData();
                formData.append("file", file);
                let url = "http://wyapp.rkph.com.cn/sys/attachment/handover-upload";
                axios({
                    method: 'post',
                    url: url,
                    data: formData,
                    config: { headers: {'Content-Type': 'multipart/form-data' }}
                    })
                    .then(function (res) {
                        //handle success
                        this.isLoading = false;
                        handleFile();
                        this.$emit('success', this.name, res.data);
                        //this.$message.success("图片上传成功")
                    }.bind(this))
                    .catch(function (response) {
                        this.isLoading = false;
                        this.isSuccess = false;
                        //this.$message.error("图片上传失败")
                    }.bind(this));
                // ax.post(url, formData).then((res) => {
                //     console.log(res);
                //     this.isLoading = false;
                //     handleFile();
                //     this.$emit('success', res);
                // }).catch((err) => {
                //     this.isLoading = false;
                //     this.isSuccess = false;
                //     console.log('图片上传失败:'+err);
                // })
            }
        }
    }
</script>

<style>
    .vue-uploader {
        position: relative;
    }

    .vue-uploader.success {
        border: 2px solid #FF8E43;
    }

    .vue-uploader label {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 10;
        margin: 0;
        cursor: pointer;
        background: transparent;
        background-size: contain !important;
        background-repeat: no-repeat !important;
        background-position: center center !important;
    }

    .vue-uploader input[type=file] {
        display: none;
    }
</style>
