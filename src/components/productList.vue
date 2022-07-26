<template>
  <div class="list_main">
    <!-- 搜索框/增加按钮 -->
    <el-row class="search_top">
      <el-col :span="6">
        <div class="grid-content ep-bg-purple">
          <el-input
            v-model="search_input"
            class="w-50 m-2"
            placeholder="输入搜索的id"
            :prefix-icon="Search"
            clearable
            @blur="search"
            @keyup.enter.native="enterBlur($event)"
          />
          <!-- 
            按enter回车使el-input失去焦点:
            https://blog.csdn.net/Zorephp/article/details/94659488 
          -->
        </div>
      </el-col>
      <el-col :span="15" />
      <el-col :span="3" justify="end">
        <div class="grid-content ep-bg-purple-light">
          <el-button type="primary" @click="AddDialog"> 增加 </el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 表单部分 -->
    <el-table
      :data="
        $store.state.productlistdata.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize
        )
      "
      style="width: 100%"
    >
      <el-table-column prop="id" label="Id" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="location" label="Location" />
      <el-table-column prop="alert" label="Alert" />
      <!-- 编辑删除按钮 -->
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button
            type="primary"
            size="small"
            @click="handleEdit(scope.$index, scope.row)"
            >Edit
          </el-button>
          <!-- 注意触发函数是@confirm -->
          <el-popconfirm
            @confirm="handleDelete(scope.$index, scope.row)"
            title="确定要删除此条数据吗"
          >
            <template #reference>
              <el-button size="small" type="danger">Delete</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 增加数据弹出框 -->
    <Ap />
    <Ep />

    <!-- 分页区域 -->
    <el-pagination
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="$store.state.productlistdata.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="tsx" setup>
import { ref, onMounted, reactive } from "vue";
import { ElButton, ElTag, TableV2FixedDir } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import api from "../api/api.js";
import link from "../api/link.js";
// 弹窗
import Ap from "../views/home/component/AddProduct";
import Ep from "../views/home/component/EditProduct";
import { useStore } from "vuex";
let store = useStore();
// 搜索框
const search_input = ref("");
const search = () => {
  if (search_input.value) {
    link(`${api.productlist}?id=${search_input.value}`).then((ok) => {
      //console.log(ok.data)
      store.commit("GetProductList", ok.data);
    });
  } else {
    store.dispatch("GetProductList");
  }
};
const enterBlur = (event) => {
  event.target.blur();
};
// 增加数据
const AddDialog = () => {
  store.commit("AddOpen");
};

//修改界面的按钮
interface Product {
  id: number;
  name: string;
  alert: boolean;
  location: string;
}
const handleEdit = (index: number, row: Product) => {
  //console.log(index, row);
  store.commit("EditOpen", row);
};
const handleDelete = (index: number, row: Product) => {
  console.log(index, row);
  //需要异步操作 传递删除内容
  store.dispatch("DEL_DATA", row);
};

//获取数据
// reactive里面不用数组[] 在vue3里面要用对象{}里面再镶嵌一个数组  才是响应式的
//let 是块级响应 在使用之前声明
let data = reactive({
  list: [],
});
onMounted(() => {
  store.dispatch("GetProductList");
});

//分页按钮
const currentPage = ref(1);
const pageSize = ref(10);
const handleSizeChange = (val: number) => {
  pageSize.value = val;
};
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
};
</script>

<style lang="scss">
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
.list_main {
  height: 100%;
  margin: 0;
  padding: 0;
}
// 修改表头过高的问题
// https://blog.csdn.net/Mr_woniu/article/details/106916658
.el-main {
  /* text-align: center; */
  line-height: 20px !important;
}
.search_top {
  height: 50px;
  // 尝试让搜索框居中
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>
