<template>
  <el-dialog :title="title" width="50%" v-model="visible">
    <el-form class="form" status-icon :model="form" :rules="rules" ref="formRef" size="default" label-width="100px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入名称" clearable />
      </el-form-item>

      <el-form-item label="年龄" prop="age">
        <el-input-number v-model="form.age" :min="1" :max="100" placeholder="请输入年龄" />
      </el-form-item>

      <el-form-item label="开始时间" prop="beginTime">
        <el-date-picker clearable v-model="form.beginTime" type="date" placeholder="请选择开始时间" value-format="yyyy-MM-dd" />
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-select v-model="form.sex" placeholder="请选择性别" clearable filterable>
          <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item label="描述信息" prop="des">
        <el-input v-model="form.des" :rows="5" placeholder="请输入描述信息" />
      </el-form-item>

      <el-row type="flex" justify="center">
        <el-button type="primary" @click="submitForm(formRef)">确定</el-button>
        <el-button @click="resetForm(formRef)">取消</el-button>
      </el-row>
    </el-form>
  </el-dialog>
  <el-row style="margin-bottom: 20px">
    <el-button @click="add">add</el-button>
    <el-button @click="batchDelete(false)" type="danger"> 批量删除 </el-button>
  </el-row>

  <el-table v-loading="loading" :data="table.data" @selection-change="handleSelect">
    <el-table-column type="selection" width="55"> </el-table-column>

    <el-table-column label="开始时间" prop="beginTime" align="center">
      <template #default="scope">
        <el-date-picker v-if="scope.row.editing" v-model="scope.row.beginTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        <span v-else>{{ scope.row.beginTime }}</span>
      </template>
    </el-table-column>

    <el-table-column label="性别" prop="sex" align="center">
      <template #default="scope">
        <template v-if="scope.row.editing">
          <el-select v-model="scope.row.sex" placeholder="请选择">
            <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </template>
        <template v-else>
          <span>{{ scope.row.sex === 0 ? "男" : "女" }}</span>
        </template>
        <!--          <el-input size="small" v-model="scope.row.rspd_status" placeholder="状态"></el-input>-->
        <!--          <span>{{ scope.row.rspd_status }}</span>-->
      </template>
    </el-table-column>

    <el-table-column label="年龄" prop="age" align="center">
      <template #default="scope">
        <el-input-number v-if="scope.row.editing" v-model="scope.row.age" :min="0" :max="100" label="年龄"></el-input-number>
        <span v-else>{{ scope.row.age }}</span>
      </template>
    </el-table-column>

    <el-table-column label="名称" prop="name" align="center">
      <template #default="scope">
        <el-input v-if="scope.row.editing" v-model="scope.row.name" label="名称"></el-input>
        <span v-else>{{ scope.row.name }}</span>
      </template>
    </el-table-column>

    <el-table-column label="描述信息" prop="des" align="center">
      <template #default="scope">
        <el-input v-if="scope.row.editing" v-model="scope.row.des" label="描述信息"></el-input>
        <span v-else>{{ scope.row.des }}</span>
      </template>
    </el-table-column>

    <!--    align="center"-->
    <el-table-column prop="ac" label="操作">
      <template #default="scope">
        <el-button v-if="scope.row.editing" size="small" @click="saveInfo(scope.row)">保存</el-button>
        <el-button type="text" v-else size="small" @click="editColumn(scope.row, true)">修改</el-button>

        <el-button size="small" v-if="scope.row.editing" @click="editColumn(scope.row, false)">取消</el-button>
        <el-button type="danger" v-else size="small" @click="batchDelete(true, scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-row type="flex" justify="end" style="margin-top: 20px">
    <el-pagination
      :page-sizes="[10, 20, 50, 100]"
      background
      layout="prev, pager, next, sizes, total"
      :current-page="table.page"
      @update:current-page="handleCur"
      @update:page-size="handleSizeChange"
      :page-size="table.pageSize"
      :total="table.total"
    />
  </el-row>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";

import { FormInstance, FormRules, ElMessageBox } from "element-plus";
import { getMockDataList, deleteExam } from "@/api/user";
const formRef = ref<FormInstance>();
const instance = getCurrentInstance();
const visible = ref(false);
const title = ref("");

interface Exam {
  [index: string]: any;
}

let form = reactive<Record<string, any>>({
  name: undefined,
  age: undefined,
  beginTime: undefined,
  sex: undefined,
  des: undefined,
});
const table = ref<{
  page: number;
  pageSize: number;
  total: number;
  data: Exam[];
  selected: Exam[];
}>({
  page: 1,
  pageSize: 10,
  total: 0,
  data: [],
  selected: [],
});
const loading = ref(false);
const rules = reactive<FormRules>({
  name: [{ required: true, message: "请输入名称", trigger: "change" }],
  age: [{ required: true, message: "请输入年龄", trigger: "change" }],
  beginTime: [{ required: true, message: "请选择开始时间", trigger: "change" }],
  sex: [{ required: true, message: "请选择性别", trigger: "change" }],
  des: [{ required: true, message: "请输入描述信息", trigger: "change" }],
});
const handleSelect = (selected: Exam[]) => {
  table.value.selected = [...selected];
};
const submitForm = async (formEl: FormInstance | undefined) => {
  console.log(444, form);
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const add = () => {
  visible.value = true;
};

const resetTable = () => {
  table.value.page = 1;
  table.value.pageSize = 10;
  table.value.total = 0;
  table.value.data = [];
  table.value.selected = [];
};

const saveInfo = () => {
  console.log(444444444, "ssssssssave");
};

const editColumn = (row: Exam, v: boolean) => {
  row.editing = v;
  // visible.value = true;
  // nextTick(() => {
  //   [...Object.entries(form)].forEach(([k, v]) => {
  //     form[k] = row?.[k] ?? undefined;
  //   });
  // });
  // instance?.refs?.addOrUpdateRef?.init(scope.row);
};

const batchDelete = (onlyOne: boolean, id: number) => {
  if (!onlyOne && !table.value.selected.length) {
    return ElMessage({
      type: "warning",
      message: "请先选择要删除的行",
    });
  }
  let mesg = onlyOne ? "确认删除该数据" : "确认删除已选择的数据";
  let data = onlyOne ? { id } : [...table.value.selected];
  ElMessageBox.confirm(mesg, "Warning", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
    autofocus: false,
  })
    .then(() => {
      deleteExam(data)
        .then((res) => {
          ElMessage({
            type: "success",
            message: "删除成功",
          });
          resetTable();
          initTableData();
        })
        .catch((err) => {
          ElMessage({
            type: "info",
            message: "删除失败,请重试",
          });
          resetTable();
          initTableData();
        });
    })
    .catch(() => {});
};

const handleSizeChange = (val: number) => {
  table.value.pageSize = val;
  initTableData({
    pageSize: val,
  });
};
const handleCur = (val: number) => {
  table.value.page = val;
  initTableData({
    page: val,
  });
};

const initTableData = (data?: Record<string, any>) => {
  table.value.selected = [];
  loading.value = true;
  getMockDataList({
    page: table.value.page,
    pageSize: table.value.pageSize,
    ...data,
  })
    .then((res) => {
      loading.value = false;
      table.value.data = (res?.data ?? []).map((v) => ({ ...v, age: 0, sex: v.sex & 1 }));
      table.value.total = res?.recordsTotal ?? 0;
    })
    .catch((err) => {
      loading.value = false;
      table.value.data = [];
      table.value.total = 0;
    });
};

onMounted(() => {
  initTableData();
});

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  visible.value = false;
  formEl.resetFields();
  initTableData();
};

const sexOptions = [
  { label: "男", value: 0 },
  { label: "女", value: 1 },
];
</script>
<style lang="scss" scoped>
.form {
  --el-component-size: 36px;
}
</style>
