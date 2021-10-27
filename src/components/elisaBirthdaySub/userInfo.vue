<template>
    <div>
        <div class='title'>
            <p>客户信息</p>
        </div>
        <div class="userBtnPage" v-if="!showUserInfo">
            <p>郭阿圆</p>
            <el-button size="mini" @click="openUserDetail">查看详细资料</el-button>
        </div>
        <div v-if="showUserInfo">
            <div class='infoPic'></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            showUserInfo: false,
        }
    },
    methods: {
        openUserDetail() {
            this.showUserInfo = true
        }
    }

}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}
.title {
    width: 100%;
    height: 30px;
    font-size: 18px;
    font-weight: bold;
    color: black;   
    line-height: 30px;
    display: flex;
    justify-content: center;
    border-bottom: 1px dotted lightgray;
}
.title > p {
    display: block;
    border-bottom: 3px solid #409EFF;
}
.userBtnPage {
    width: 100%;
    height: 560px;
    font-size: 30px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.infoPic {
    width: 100%;
    height: 560px;
    background-image: url(../../assets/userinfo.png);
    background-size: 100%;
    background-position: 0 -20px;
    border-radius: 0 0 10px 10px;
}

</style>