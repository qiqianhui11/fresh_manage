<template>
  <div class="dialog brand">
    <h3 class="title">{{title}} <el-button class="fr" @click.native="clean">取消</el-button></h3>
    <el-form :model="addForm" :rules="addFormRules" label-width="150px" ref="addForm">
       
        <el-form-item label="店铺名称" required prop="storeId">
          <el-select v-model="addForm.storeId"   placeholder="请选择店铺">
            <el-option v-for="(item,index) in  storeData" :key="index" :value="item.storeId" :label="item.storeName"> </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="分类名称" prop="classId">
          <el-select v-model="addForm.classId"  placeholder="请选择分类">
            <el-option v-for="(item,index) in  classData" :key="index" :value="item.classId" :label="item.classTitle"> </el-option>
          </el-select>
        </el-form-item> -->
      <!-- <el-form-item label="品牌编号" prop="brandId">
        <el-input v-model="addForm.brandId" auto-complete="off">
        </el-input>
      </el-form-item> -->
      <el-form-item label="品牌名称" required prop="brandTitle">
        <el-input v-model="addForm.brandTitle" auto-complete="off" placeholder="请填写品牌名称"></el-input>
      </el-form-item>
        <el-form-item label="品牌LOGO" required prop="pics">
          <!-- 上传图片  -->
          <vue-core-image-upload 
          v-if="picShow"
           @getImg="getImg" 
           :cropRatio="selectPic.radio" 
           :picList="selectPic.picList" 
           :sizeBox='selectPic.size' 
           :multiple="selectPic.multiple" 
           :cropShow="selectPic.cropShow"
           >
          </vue-core-image-upload>
        </el-form-item>
       
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click.native="addSubmit">保存</el-button>
    </div>
  </div>
</template>

<script>
import vueCoreImageUpload from '@/components/uploadImg'
import { selectStore, addbrand, brandupdate } from '@/service/getData'
export default {
  data() {
    return {
      //图片
      picShow: false,
      storeData:[],
      classData:[],
      selectPic: {
        radio: '1200:350',
        size: ['1200', '350'],
        cropShow: false,
        multiple: false,
        picList: []
      },
      // 新增
      addLoading: false,
      addForm: {
        storeId: '',
        brandTitle: '',//品牌名称
        pics: [],
      },
      addFormRules:{
        storeId: [
          { required: true, message: '店铺不能为空', trigger: 'change' }
        ],
        brandTitle: [
          { required: true, message: '品牌名称不能为空', trigger: 'change' }
        ],
      }
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    FormData: {
      type: Object,
      default: null
    },
    type: {
      type: String,
      default: 'add'
    },
    
  },
  components: {
    vueCoreImageUpload
  },
  mounted() {
    this.getStore()
    this.addForm = Object.assign({},this.FormData)
    console.log('edit',this.addForm)
    this.selectPic.picList = []
    if (this.type == 'edit' && this.addForm.pics[0].path) {
      this.selectPic.picList.push(
        this.addForm.pics[0].path
      )
    }
    this.picShow = true
    
  },
  methods: {
    // 店铺
    getStore() {
      selectStore().then((res) => {
        console.log(res)
        this.storeData = res.data.content.content;
      })
    },
   
    clean() {
      this.$emit('close', false)
      this.$refs['addForm'].resetFields()
    },
    // 提交
    addSubmit() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          
           if(this.addForm.pics.length < 1){
                  this.$message('请上传品牌图标！')
                  return false
             }
             
              this.addLoading = false;
             let para = {
                brandTitle: this.addForm.brandTitle,
                pics: this.addForm.pics,
                storeId: this.addForm.storeId,
                classId:this.addForm.classId
              }
              para.pics = JSON.stringify(para.pics)
          if (this.type == 'add') {
            // this.$confirm('确定添加该品牌？', '提示', {}).then(() => {
             
              addbrand(para).then((res) => {
                console.log("ts",res)
                if (res.data.state == 200) {
                  this.addLoading = true;
                  // this.$emit('Success',true)
                  this.clean()
                }else{
                  this.$message(res.data.messages)
                }
              })
            // })
          } else if (this.type == 'edit') {
            // this.$confirm('确定改变该分类？', '提示', {}).then(() => {
              para.brandId = this.addForm.brandId
              brandupdate(para).then((res) => {
                this.addLoading = true;
                 
                if (res.data.state == 200) {
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  })
                  // this.$emit('Success',true)
                  this.clean()
                } else if (res.data == '') {
                  this.$message('登录超时，请重新登录')
                }else{
                  this.$message(res.data.messages)
                }
              })
            // })
          }

        }
      });
    },
    getImg(val) {
      this.addForm.pics = []
      this.addForm.pics.push({
        path: val[0]
      })
    },
  }
}
</script>

<style lang="scss" soped>
.dialog {
  width: 100%;
  height: 100%;
}

.dialog-footer {
  text-align: center;
}
</style>
 