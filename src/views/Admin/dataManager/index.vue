<template>
  <div class="">
    <header-indicates
      title="数据管理"
      :btn-option="{ text: '添加', onClick: showAdd }"
    >
      <div slot="titleRight" class="row align">
        <el-input
          placeholder="输入联系人进行搜索"
          v-model="content"
          @input="keyTable++"
          clearable
        ></el-input>
      </div>
      <div slot="headRight" class="align">
        <el-upload
          class="upload-demo"
          ref="upload"
          multiple
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          action
          :with-credentials="true"
          :http-request="httpRequest"
          :on-change="fileChange"
          :on-success="onSuccess"
          :show-file-list="false"
          :auto-upload="true"
        >
          <!-- :file-list="fileList"
          :data="datas" -->
          <el-button
            slot="trigger"
            title="只能导入excel文件"
            size="small"
            type="success"
            >数据导入</el-button
          >
        </el-upload>
        <!-- <el-button size="mini" type="success" @click="showUploadFile"
          >导入</el-button
        > -->
      </div>
    </header-indicates>
    <hx-table
      :key="keyTable"
      :fetch-fun="$api.r.market_resource.getMarket_resourcePage"
      :fetch-argument="{
        params: {
          content,
          type: 2
        }
      }"
    >
      <template slot="tableColumn">
        <el-table-column
          align="center"
          prop="company"
          label="单位名称"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="联系人"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="phone"
          label="手机号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="联系地址"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="remark"
          label="备注"
        ></el-table-column>

        <el-table-column align="center" prop="" width="160" label="操作">
          <template slot-scope="{ row }">
            <div>
              <el-button type="primary" size="mini" @click="showEdit(row)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                size="mini"
                v-delete="{
                  name: row.company,
                  fetchFun: $api.r.market_resource.deleteMarket_resource,
                  fetchArgument: { id: row.id },
                  cb: () => keyTable++
                }"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </template>
    </hx-table>
    <DialogAddJobFair
      :data="data"
      :visible.sync="isShowAdd"
      @onOk="keyTable++"
    ></DialogAddJobFair>
  </div>
</template>

<script>
import DialogAddJobFair from "./components/DialogAddJobFair";
import { baseUrl } from "_u/config";
import axios from "axios";
import { getToken } from "_u/auth";
export default {
  components: { DialogAddJobFair },
  data() {
    return {
      data: {},
      content: "",
      isShowAdd: false,
      keyTable: 0
    };
  },
  computed: {},

  methods: {
    showAdd() {
      this.data = {};
      this.isShowAdd = true;
    },
    showEdit(row) {
      this.data = row;
      this.isShowAdd = true;
    },
    showUploadFile() {},
    httpRequest(param) {
      console.log(param);
      let _this = this;
      let fileObj = param.file; // 相当于input里取得的files
      let fd = new FormData(); // FormData 对象
      fd.append("file", fileObj); // 文件对象
      let url = baseUrl + "/market_resource/import";
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          token: getToken(),
          "x-auth-token": getToken()
        }
      };
      axios
        .post(url, fd, config)
        .then(res => {
          if (res.data.code === 200) {
            _this.$message.success("上传数据成功");
            _this.dialogFormVisible = false;
            _this.keyTable++;
          }
        })
        .catch(err => {
          _this.$alert("上传数据失败", "提示", {
            confirmButtonText: "确定",
            callback: action => {
              console.log("上传失败");
            }
          });
        });
    },
    fileChange(file, fileList) {
      // this.dataList = fileList;
    },
    onSuccess(res) {
      let _this = this;
      _this.$message.success("上传数据成功");
      _this.dialogFormVisible = false;
      _this.keyTable++;
    },
    onError(res) {
      this.$alert("创建失败", "提示", {
        confirmButtonText: "确定",
        callback: action => {
          console.log("上传失败");
        }
      });
    }
  },
  mounted() {},
  filters: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
