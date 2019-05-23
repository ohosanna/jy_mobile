/**公用接口服务*/
import * as ax from '@/js/http.js'
import * as def from '@/store/def.js';
import store from '@/store/index.js'

// 判段是否登录，没登录直接跳转外层的登录页
export function login(data) {
    return new Promise((resolve, reject) => {
        ax.post('/sys/login',data)
            .then((res) => {
                resolve(res)
            })
            
            .catch((err) => {
                console.log('没有登录:'+err);
            })
    });
}
export function userInfo() {
    return new Promise((resolve, reject) => {
        ax.get('/sys/user/info')
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                console.log('获取用户信息失败:'+err);
                reject(err)
            })
    });
}




export function getMenu() {
    return new Promise((resolve, reject) => {
        ax.get('/sys/menu/nav')
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                console.log('获取菜单失败:'+err);
            })
    });
}



//以下是可能公用的头部查询条数据配置接口，也可以独立一个js文件变成公用接口

export function getCompany() {
    return new Promise((resolve, reject) => {
        ax.get('/base/company/treelist')
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                console.log('获取公司树失败:'+err);
            })
    });
}

export function getCommunity(data) {
    return new Promise((resolve, reject) => {
        ax.get('/base/community/treelist',data)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                console.log('获取项目树失败:'+err);
            })
    });
}
export function getCommunityAll(data) {
    return new Promise((resolve, reject) => {
        ax.get('/base/community/treelistall',data)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                console.log('获取数据权限树失败:'+err);
            })
    });
}

export function getRole() {
    return new Promise((resolve, reject) => {
        ax.get('/sys/role/select')
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                console.log('获取角色失败:'+err);
            })
    });
}

export function getHousehandoverInfo(data) {
    return new Promise((resolve, reject) => {
        ax.get('http://wyapp.rkph.com.cn/api/househandover/info', data)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                console.log('获取资源失败:'+err);
            })
    });
}




