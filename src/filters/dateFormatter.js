let dateFormatter = (val) => {
    let date = new Date(Date.parse(val));
    let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minute =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let second =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    // let formatDate = date.getYear() + '年' + date.getMonth()+1 + '月' + date.getDay() + '日'
    let formatDate = `${date.getFullYear()}年${date.getMonth() +
      1}月${date.getDate()}日 ${hour}:${minute}:${second}`;
    return formatDate;
}

module.exports = dateFormatter