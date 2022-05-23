<template>
  <div>
    <em-table>
      <el-table-column label="序号" />
      <el-table-column label="用户名" />
      <el-table-column label="姓名" />
      <el-table-column label="手机号" />
      <el-table-column label="邮箱地址" />
      <template #toolbarLeft>
        <el-button icon="plus" type="primary">新增用户</el-button>
      </template>
      <template #toolbarRight>
        <el-button>导出</el-button>
      </template>
    </em-table>
  </div>
</template>
