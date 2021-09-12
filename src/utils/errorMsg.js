// 做errMag的监听
class ErrMsg {
    constructor () {
        this.subscriptions = [];
    }
    // 报错
    errShow (msg) {
        this.subscriptions.forEach(f => f(msg));
    }
    // 添加订阅者
    subscribe (f) {
        this.subscriptions.push(f);
    }
    // 移除订阅者
    unsubscribe(f){
        this.subscriptions = this.subscriptions.filter(item => item !== f);
    }
}

export default ErrMsg;
