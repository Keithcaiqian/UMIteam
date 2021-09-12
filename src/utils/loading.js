// 做loading的监听
class Loading {
    constructor () {
        this.loadingTag = 0;
        this.subscriptions = [];
    }
    // ajax请求数量加
    add () {
        this.loadingTag++;
        this.subscriptions.forEach(f => f(this.loadingTag));
    }
    // ajax请求数量减
    sub () {
        this.loadingTag--;
        this.subscriptions.forEach(f => f(this.loadingTag));
    }
    // 获取ajax请求数量
    get () {
        return this.loadingTag;
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

export default Loading;
