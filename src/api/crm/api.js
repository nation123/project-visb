import request from '_u/request'
//市场资源(app)-接口 

//分页查询市场资源 
export function getApiMarket_resourcePage(options) { 
  return request({ 
    url: `/api/market_resource/page`, 
    method: 'get', 
    params:options.params, 
  })
}

//会员登录 
export function postApiMemberLogin(options) { 
  return request({ 
    url: `/api/member/login`, 
    method: 'post', 
    data:options.data, 
  })
}
