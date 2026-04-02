<template>
  <div class="container">
    <div class="header-container">
      <img src="~/assets/Logo.png" alt="Logo" />
      <LogoutButton />
    </div>
    <GradientDivisor />
    <div class="table-container">
      <AllEnterprises />
    </div>
  </div>
</template>

<style>
.container {
  min-height: 100vh;
  background-color: #fafafa;
  min-width: 100%;
  overflow-x: hidden;
}
img {
  width: 150px;
}
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 40px;
  box-sizing: border-box;
  background-color: #ffffff;
}
.table-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 40px auto;
  box-sizing: border-box;
}
</style>
