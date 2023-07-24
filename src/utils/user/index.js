// 校验登录情况
export function verifyLogin() {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (localStorage.getItem('token')) {
        resolve(true)
      } else {
        resolve(false)
      }
    }, 3000)
  })
}

// 登录
export function login() {
  localStorage.setItem('token', 'xxxxx')
}

// 退出登录
export function logout() {
  localStorage.removeItem('token')
}
