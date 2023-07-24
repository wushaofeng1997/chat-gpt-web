export function useCheckRulesForLogin(loginInfo: any): [boolean, string] {
  if (!loginInfo.user || !loginInfo.password) {
    return [false, "账号或密码不能为空!"];
  }
  if (loginInfo.user.length < 11) {
    return [false, "账号必须为11位数!"];
  }
  if (loginInfo.password.length < 6) {
    return [false, "密码必须大于6位!"];
  }
  return [true, "验证通过"];
}

export function useCheckRulesForRegister(loginInfo: any): [boolean, string] {
    if (!loginInfo.Telephone || !loginInfo.Password) {
      return [false, "手机号或密码不能为空!"];
    }
    if (loginInfo.Telephone.length < 11) {
      return [false, "账号必须为11位数!"];
    }
    if (loginInfo.Password.length < 6) {
      return [false, "密码必须大于6位!"];
    }
    return [true, "验证通过"];
  }
