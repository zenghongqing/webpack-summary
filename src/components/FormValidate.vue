<template>
  <v-form :model="formData" :rules="rules" ref="form">
    <form-item label="姓名" prop="name">
      <input type="text" maxlength="16" v-model.trim="formData.name"/>
    </form-item>
    <form-item label="手机号" prop="tel">
      <input type="tel" maxlength="11" v-model.trim="formData.tel"/>
    </form-item>
    <div class="form-submit">
      <button @click="handleSubmit">保存</button>
    </div>
  </v-form>
</template>
<script>
import { VForm, FormItem } from './common/Form'
export default {
    name: 'form-validate',
    data () {
        return {
            formData: {
                name: '',
                tel: ''
            },
            rules: {
                name: [{required: true, message: '请填写姓名'}],
                tel: [
                    {required: true, message: '您的手机号码未输入'},
                    {pattern: /^1[34578]\d{9}$/, message: '您的手机号码输入错误'}
                ]
            }
        }
    },
    methods: {
        handleSubmit (e) {
            this.$refs.form.validate(errs => {
                console.log(errs)
            })
        }
    },
    components: {
        VForm,
        FormItem
    }
}
</script>
<style lang="scss" scoped>
  .form-submit {
    text-align: center;
    padding-top: 5px;
    button {
      display: inline-block;
      line-height: 24px;
      width: 50px;
      color: #fff;
      background-color: #337ab7;
    }
  }
</style>
