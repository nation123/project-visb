<template>
  <div class="">
    <header-indicates
      title="会员管理"
      :btn-option="{ text: '添加', onClick: showAdd }"
    >
    </header-indicates>
    <hx-table
      :key="keyTable"
      :fetch-fun="$api.r.member.getMemberPage"
      :fetch-argument="{}"
    >
      <template slot="tableColumn">
        <el-table-column
          align="center"
          prop="name"
          label="会员姓名"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="phone"
          label="手机号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="deviceCode"
          label="绑定设备号"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="createTime"
          label="创建时间"
        ></el-table-column>

        <el-table-column align="center" prop="" width="250" label="操作">
          <template slot-scope="{ row }">
            <div>
              <el-button type="primary" size="mini" @click="showEdit(row)"
                >编辑</el-button
              >
              <el-button type="warning" size="mini" @click="unbind(row)"
                >解除绑定</el-button
              >
              <el-button
                type="danger"
                size="mini"
                v-delete="{
                  name: row.name,
                  fetchFun: $api.r.member.deleteMember,
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
export default {
  components: { DialogAddJobFair },
  data() {
    return {
      data: {},
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
    unbind(row) {
      // 解除绑定
      let _this = this;
      this.$confirm("此操作将解绑该会员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this.$api.r.member
            .patchMemberUnbind({
              memberId: row.id
            })
            .then(res => {
              _this.$message({
                type: "success",
                message: "解绑成功!"
              });
              _this.keyTable++;
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消解绑"
          });
        });
    }
  },
  mounted() {},
  filters: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped></style>
