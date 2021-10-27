<template>
  <div class='main'>
        <div class='background'></div>
        <div class='box userInfo'>

            <UserInfo></UserInfo>    
        </div>
        <div class='box content'>
            <ElisaBirthdayContent></ElisaBirthdayContent>
        </div>
        <div class="song">
            <!-- audio控件的自动播放被chrome禁用了 -->
            <!-- <audio autoplay="autoplay" controls="controls" ref="audio" src="https://music.163.com/#/song?id=5270588">
                <source src="https://music.163.com/#/song?id=5270588" />
                不支持
            </audio> -->

            <!-- 非生日时段不播放生日歌 -->
            <!-- <iframe :src="songUrl" allow="autoplay" frameborder="0"></iframe> -->
        </div>
  </div>
</template>

<script>
import UserInfo from './elisaBirthdaySub/userInfo'
import ElisaBirthdayContent from './elisaBirthdaySub/elisaBirthdayContent'

export default {
    name: 'app',
    data() {
        return {
            songUrl: "https://www.kugou.com/song/#hash=05A7B5ABA4F46102E1AFA4DD4E704ABC&album_id=1011161",
        }
    },
    methods: {
        autoplay() {

        }
    },
    components: {
        UserInfo, ElisaBirthdayContent
    },
    created() {
        // setTimeout(() => {
        // // this.$refs.audio.play()
        //     this.$refs.audio.style.display = "none"
        //     this.$refs.audio.play()
        // }, 2000);
    }

}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}
.main {
    position: relative;
}
.background {
    height: 636px;
    overflow: hidden;
    background-image: url(../assets/bg4.jpeg);
    background-size: 100%;
    background-position-y: 80px;
    filter: blur(3px);
}
.box {
    position: absolute;
    top: 20px;
    float: left;
    height: 590px;
    border-radius: 10px;
    background-color: white;
    box-shadow: 1px 1px 20px lightgrey;
}
.userInfo {
    left: 170px;
    width: 270px;
}
.userBtnPage>.el-button {
    margin: 20px 0 0 0;
}
.content {
    left: 450px;
    width: 870px;
}
.song {
    display: none;
    position: absolute;
    width: 100px;
    height: 30px;
    bottom: 0;
}

</style>