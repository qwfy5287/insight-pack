import copy from "fast-copy";

/**
 * 列表 to 树
 * @param {[]} listData 列表数据
 * @param {string} pId 父节点Id
 * @param {string} id  节点Id
 * @param {string} label 节点名称
 * @param {*} isStrId 是否字符串Id
 */
export function listToTree(
  listData,
  pId = "pId",
  id = "id",
  label = "label",
  isStrId = false
) {
  let map = {};
  let node;
  let roots = [];
  let i;
  // 深度拷贝
  const list = copy(listData);
  for (i = 0; i < list.length; i += 1) {
    map[list[i][id]] = i; // initialize the map
    // 初始化 children
    // list[i].children = [] // initialize the children
  }
  for (i = 0; i < list.length; i += 1) {
    node = list[i];
    node.pId = list[i][pId];
    node.id = list[i][id];
    node.label = list[i][label];
    if (
      Number(node[pId]) ||
      Number(node[pId]) !== 0 ||
      (node[pId] === "0" && isStrId)
    ) {
      // if you have dangling branches check that map[node.parentId] exists
      if (map[node[pId]] === undefined) {
        console.error(`没有找到id节点${node.id}对应pId节点${node.pId}`);
      } else {
        if (
          list[map[node[pId]]].children === undefined ||
          list[map[node[pId]]] === null
        ) {
          // 有子节点才 初始化 children
          list[map[node[pId]]].children = [];
        }

        list[map[node[pId]]].children.push(node);
      }
    } else {
      // 没有父节点的直接添加
      roots.push(node);
    }
  }
  return roots;
}

/**
 * 树 to 列表
 * @param {*} tree tree
 */
export function treeToList(tree) {
  let queen = [];
  let out = [];
  let cloneTree = copy(tree);
  queen = queen.concat(cloneTree);
  while (queen.length) {
    let first = queen.shift();
    if (first.children) {
      queen = queen.concat(first.children);
      delete first["children"];
    }

    out.push(first);
  }
  return out;
}

/**
 * 树 to 列表 for router
 * @param {[]} tree tree
 * @param {*} id 对应数据里面的id 'id','path','url',...
 * @param {*} label label
 */
export function treeToListForRouter(tree, id = "id", label = "label") {
  let queen = [];
  let out = [];
  // 深度拷贝
  let cloneTree = copy(tree);
  queen = queen.concat(cloneTree);
  while (queen.length) {
    let first = queen.shift();

    // 设置完整路径
    if (!first.fullPath) {
      first.fullPath = first[id];
      first.pId = null;
    }

    // 设置 id
    first.id = first["fullPath"];

    if (first.children) {
      first.children.forEach((d) => {
        d.fullPath = `${first.fullPath}/${d[id]}`;

        // 设置 父子级 属性
        // d.id = d[id]
        // d.pId = first[id]
        // d.label = d[label]

        // path 重名
        d.id = d["fullPath"];
        d.pId = first["fullPath"];
        d.label = d[label];
      });

      queen = queen.concat(first.children);
      delete first["children"];
    }
    out.push(first);
  }
  return out;
}

/**
 * 获取 parentIds 根据 id
 * @param {*} id id
 * @param {*} list 列表
 * @param {*} result
 * @returns ["0101", "01"]
 */
export const getParentIdsById = (id, list, result = []) => {
  let pId = list.find((d) => d.id === id)?.pId;
  if (pId) {
    result.push(pId);
    return getParentIdsById(pId, list, result);
  } else {
    return result;
  }
};
