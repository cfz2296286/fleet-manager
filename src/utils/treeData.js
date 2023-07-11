/** 获取某一数据的路径 */
export const getNodePath = (key, treeData, pathArr, keyProp = "id") => {
  let _pathArr = pathArr ? Array.from(pathArr) : [];
  for (let item of treeData) {
    _pathArr.push(item);
    if (item[keyProp] === key) {
      return _pathArr;
    }
    if (item.children && item.children.length) {
      let _result = getNodePath(key, item.children, _pathArr, keyProp);
      if (_result) {
        return _result;
      }
    }
    _pathArr.pop();
  }
  return false;
};

/* 构建数据筛选条件 */
export const generateCondition = (condition) => {
  let filterFunc
  if (condition && typeof condition === 'object') {
    filterFunc = (node) => {
      for (let key in condition) {
        if (node[key] !== condition[key]) {
          return false
        }
      }
      return true
    }
  } else if (condition && typeof condition === 'function') {
    filterFunc = condition
  } else {
    filterFunc = res => res
  }
  return filterFunc
}

export const getKeys = (treeData, condtion, primaryKey = "id") => {
  const filterFunc = generateCondition(condtion)
  const pushKeys = (arr = [], result = []) => {
    for (let item of arr) {
      if (filterFunc(item)) {
        result.push(item[primaryKey]);
      }
      if (item.children && item.children.length) {
        pushKeys(item.children, result);
      }
    }
  }
  let result = []
  pushKeys(treeData, result);
  return result
}

export const getDirKeys = (treeData, primaryKey = "id") => {
  return getKeys(treeData, el => el.children && el.children.length, primaryKey)
}

export const getAllKeys = (treeData, primaryKey = "id") => {
  return getKeys(treeData, null, primaryKey)
}

export const getChildIds = (treeData, id, keyProp = "id") => {
  function pushChilds(children, result) {
    children.forEach(el => {
      result.push(el[keyProp])
      if (el.children && el.children.length) {
        pushChilds(el.children, result)
      }
    })
  }
  function pushKeys(arr = [], result = []) {
    for (let item of arr) {
      if (item[keyProp] === id) {
        result.push(item[keyProp]);
        if (item.children && item.children.length) {
          pushChilds(item.children, result)
        }
      }
      if (item.children && item.children.length) {
        pushKeys(item.children, result);
      }
    }
  }
  let result = []
  pushKeys(treeData, result);
  return result
}