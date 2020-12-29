import request from '_u/request'
//会员（管理后台）-接口 

//创建一个会员 
export function postMember(options) { 
  return request({ 
    url: `/member`, 
    method: 'post', 
    data:options.data, 
  })
}

//分页查询会员 
export function getMemberPage(options) { 
  return request({ 
    url: `/member/page`, 
    method: 'get', 
    params:options.params, 
  })
}

//会员解除绑定 
export function patchMemberUnbind(options) { 
  return request({ 
    url: `/member/unbind/${options.memberId}`, 
    method: 'patch', 
  })
}

//查询某个会员 
export function getMember(options) { 
  return request({ 
    url: `/member/${options.id}`, 
    method: 'get', 
  })
}

//删除某个会员 
export function deleteMember(options) { 
  return request({ 
    url: `/member/${options.id}`, 
    method: 'delete', 
  })
}

//更新某个会员 
export function patchMember(options) { 
  return request({ 
    url: `/member/${options.id}`, 
    method: 'patch', 
    data:options.data, 
  })
}
