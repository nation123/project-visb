<template>
  <el-dialog
    :title="data && data.id ? '编辑市场资源' : '添加市场资源'"
    :visible.sync="mVisible"
    append-to-body
    width="750px"
    top="15vh"
  >
    <div>
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        style="width:80%;"
        class
      >
        <el-form-item
          label="单位名称"
          :label-width="formLabelWidth"
          prop="company"
        >
          <el-input
            class="inline-input"
            style="width:500px;"
            v-model="form.company"
            placeholder="请输入单位名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系人" :label-width="formLabelWidth" prop="name">
          <el-input
            class="inline-input"
            style="width:500px;"
            v-model="form.name"
            placeholder="请输入联系人"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="联系电话"
          :label-width="formLabelWidth"
          prop="phone"
        >
          <el-input
            class="inline-input"
            style="width:500px;"
            v-model="form.phone"
            placeholder="请输入联系电话"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="联系地址"
          :label-width="formLabelWidth"
          prop="address"
        >
          <el-input
            class="inline-input"
            style="width:500px;"
            v-model="form.address"
            placeholder="请输入联系地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input
            class="inline-input"
            style="width:500px;"
            type="textarea"
            :rows="5"
            v-model="form.remark"
            placeholder="请输入备注"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="mVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "DialogAddJobFair",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      formLabelWidth: "120px",
      form: {},
      rules: {
        name: [{ required: true, message: "请输入联系人", trigger: "blur" }],
        address: [
          { required: true, message: "请输入联系地址", trigger: "blur" }
        ],
        company: [
          { required: true, message: "请输入公司名称", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请输入联系电话", trigger: "blur" }]
      }
    };
  },
  watch: {
    data(v) {
      this.form = {
        id: v.id || null,
        name: v.name || "",
        remark: v.remark || "",
        phone: v.phone || "",
        address: v.address || "",
        company: v.company || ""
      };
      if (this.$refs["ruleForm"]) {
        this.$refs["ruleForm"].resetFields();
      }
    },
    mVisible(v) {}
  },
  computed: {
    mVisible: {
      get() {
        return this.visible;
      },
      set(s) {
        this.$emit("update:visible", s);
      }
    },
    uploadUrl() {
      return upload;
    }
  },
  methods: {
    handleSubmit() {
      let _this = this;
      this.$refs["ruleForm"].validate(valid => {
        if (!valid) {
          return false;
        }
        let form = this.form;
        let data = {
          ...form
        };
        if (form.id) {
          let body = {
            id: form.id,
            data: data
          };
          _this.$api.r.market_resource.patchMarket_resource(body).then(res => {
            _this.$message.success("更新市场资源成功");
            _this.mVisible = false;
            _this.$emit("onOk");
          });
        } else {
          _this.$api.r.market_resource
            .postMarket_resource({ data })
            .then(res => {
              _this.$message.success("创建市场资源成功");
              _this.mVisible = false;
              _this.$emit("onOk");
            });
        }
      });
    }
  }
};
</script>

<style scoped lang="scss"></style>
