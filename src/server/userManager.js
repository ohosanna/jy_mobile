import * as ax from '@/js/http.js'

//以下是用户管理私用的接口，可以脱出一个js文件来放接口，不用抛向全局，只在用户管理页面局部引用

export function getUserList(data) {
    return new Promise((resolve, reject) => {
        ax.get('/sys/user/list',data)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                console.log('获取用户列表失败:'+err);
            })
    });
}


//新增用户
export function saveUser(data) {
    return new Promise((resolve, reject) => {
        ax.postJson('/sys/user/save',data)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                console.log('添加用户失败:'+err);
            })
    });
}

//更新用户
export function updateUser(data) {
    return new Promise((resolve, reject) => {
        ax.postJson('/sys/user/update',data)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                console.log('更新用户失败:'+err);
            })
    });
}

export function deleteUser(data) {
    return new Promise((resolve, reject) => {
        ax.postJson('/sys/user/delete',data)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                console.log('删除用户失败:'+err);
            })
    });
}

export function resetpsdUser(data) {
    return new Promise((resolve, reject) => {
        ax.post('/sys/user/resetpsd',data)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                console.log('重置密码失败:'+err);
            })
    });
}



export function getUserIdInfo(id) {
    return new Promise((resolve, reject) => {
        ax.get('/sys/user/info/'+id)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                console.log('通过id获取用户信息失败:'+err);
            })
    });
}


