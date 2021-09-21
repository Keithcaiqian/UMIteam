/**
 * 时间格式化--几月几日 几时几分
 * @param {time} date 时间戳
 */
export const dateFormat = (date,fmt,errWord) => {
    if(!date){
        return errWord || '';
    }
    if(!fmt){
        fmt = "YYYY-mm-dd";
    }
    var date = new Date(date);
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;

    // 用法
    // let date = new Date()
    // dateFormat(date,"YYYY-mm-dd HH:MM")
    // dateFormat(date,"YYYY-mm-dd HH")
    // dateFormat(date,"YYYY年mm月dd日")
}