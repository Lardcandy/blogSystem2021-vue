<template>
    <div>
        <div class="openPage" v-if="flowNum === 0">
            <p>热烈庆祝Elisa小朋友3岁生日！</p>
            <!-- <p>以下是你的忠实拥趸David写给你的一封信</p> -->
            <p>以下是肥集人字[1707]003号 关于Elisa Kwok 3岁生日应援项目的通知</p>
            <el-tooltip class="item" effect="light" content="等我入去睇下你搞乜鬼先" placement="bottom">
                <el-button id="open-btn" type="primary" size="small" @click="openPage">请查阅并审批</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="落左班啦！唔得闲审啊！掉你落垃圾桶~" placement="left">
                <el-button id="drop-btn" type="info" icon="el-icon-delete" size="mini" @click="dropLetter" plain circle></el-button>
            </el-tooltip>
        </div>
        <div class="letterPage" v-else-if="flowNum === 1">
            <div class="text">
                <img id="doc" src="../../assets/document.png" alt="">
            </div>
            <div class="btn">
                <el-tooltip class="item" effect="light" content="行埋一二边啦，我去稳Jackson，哼！" placement="top">
                    <el-button id="cancel-btn" type="info" size="mini" @click="cancel" plain round>驳回</el-button>
                </el-tooltip>
                <el-tooltip class="item" effect="light" content="David咁靓仔，实通过啦!" placement="top">
                    <el-button id="submit-btn" type='success' size="mini" @click="submit" round>通过</el-button>
                </el-tooltip>
            </div>
        </div>
        <div v-else-if="flowNum === 2">
            <iframe src="https://bruno-simon.com/" frameborder="0" width="870px" height="500px"></iframe>
            <div class="easterEgg">
                <p class="tipsText">揸BuBu车  发现小彩蛋</p>
                <p class="expressCode" v-show="showExpressCode">2-3-3019</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            flowNum: 0,
            cancelNum: 0,
            showExpressCode: false,
        }
    },
    methods: {
        // 0 打开信件
        openPage() {
            this.flowNum++
        },
        // 扔掉信件
        dropLetter() {
            this.$message({
                showClose: true,
                message: 'G-CRM系统异常，请稍后再试！',
                type: 'error'
            });
        },
        // 不接受 取消
        cancel() {
            if (this.cancelNum == 0) {
                this.$message({
                    showClose: true,
                    message: 'CSS系统异常，请稍后再试！',
                    type: 'error'
                })
                this.cancelNum = 1
            }else {
                this.$message({
                    showClose: true,
                    message: 'Jackson Chan系广夏10栋909房B，欢迎拨打热线15521004119',
                    type: 'info'
                })
                this.cancelNum = 0
            }
        },
        // 1 接受信件
        submit() {
            this.$message({
                message: '公文流程审批通过！',
                type: 'success'
            })
            setTimeout(()=>{
                this.flowNum++
                setTimeout(()=>{
                    this.showExpressCode = true
                },120000)
            },2000)
        }
    }

}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}
.openPage {
    float: left;
    width: 100%;
    height: 590px;
    /* background-color: lightgrey; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.openPage>p {
    font-size: 20px;
}
#drop-btn {
    position: absolute;
    bottom: 5px;
    right: 5px;
}
#open-btn {
    margin: 10px 0 0 0;
}
.text {
    width: 100%;
    height: 540px;
    border-bottom: 1px dotted lightgray;
    /* background-image: url(../../assets/document.png); */
    /* background-size: 100%; */
    overflow: scroll;
}
#doc {
    width: 100%;
    max-width: 870px;
    
}
.btn {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
}
.btn>.el-button {
    margin: 10px 0;
}
#cancel-btn {
}
.easterEgg {
    width: 100%;
    height: 90px;
    font-size: 25px;
    line-height: 90px;
    display: flex;
    justify-content: center;
}
.expressCode {
    font-size: 8px;
    color: darkorange;
    position: absolute;
    top: 150px;
    left: 60px;
}

</style>