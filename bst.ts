class TreeNode {
  data = 0;
  left = null;
  right = null;
  constructor(data: number, left?: TreeNode, right?: TreeNode) {
    this.data = data;
    this.left = left || null;
    this.right = right || null;
  }
}

class BST {
  root: TreeNode = null;

  insert(data: number) {
    if (!this.root) {
      this.root = new TreeNode(data);
      return;
    }

    let current = this.root;
    let parent;

    while (true) {
      parent = current;

      if (data < parent.data) {
        if (!current.left) {
          current.left = new TreeNode(data);
          break;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = new TreeNode(data);
          break;
        }
        current = current.right;
      }
    }
  }

  static inOrder(node: TreeNode) {
    if (node !== null) {
      BST.inOrder(node.left);
      console.log(node.data);
      BST.inOrder(node.right);
    }
  }
  static preOrder(node: TreeNode) {
    if (node !== null) {
      console.log(node.data);
      BST.preOrder(node.left);
      BST.preOrder(node.right);
    }
  }
  static postOrder(node: TreeNode) {
    if (node !== null) {
      BST.postOrder(node.left);
      BST.postOrder(node.right);
      console.log(node.data);
    }
  }
}

// const bst = new BST();
// bst.insert(23);
// bst.insert(45);
// bst.insert(16);
// bst.insert(37);
// bst.insert(3);
// bst.insert(99);
// bst.insert(22);

// console.log('中序遍历');
// bst.inOrder(bst.root);

// console.log('先序遍历');
// bst.preOrder(bst.root);

// console.log('后序遍历');
// bst.postOrder(bst.root);

const inOrderResult = [3, 16, 22, 23, 37, 45, 99];
const preOrderResult = [23, 16, 3, 22, 45, 37, 99];
const postOrderResult = [3, 22, 16, 37, 99, 45, 23];

// 已知先序、中序，求后序

// 1. 还原树结构
const bst = new BST();

function reStore(_preOrderResult: number[], _inOrderResult: number[]) {
  const [currentData, ...rest1] = _preOrderResult;

  let inOrderResultIndex = _inOrderResult.indexOf(currentData);

  let left, right;

  const hasLeft = inOrderResultIndex > 0;
  const hasRight = inOrderResultIndex < _inOrderResult.length - 1;

  // console.log('根节点', currentData, inOrderResultIndex);

  if (hasLeft) {
    const leftInOrderResult = _inOrderResult.slice(0, inOrderResultIndex);
    const leftPreOrderResult = _preOrderResult.slice(1, leftInOrderResult.length + 1);
    // console.log('左子树', leftInOrderResult, leftPreOrderResult);
    left = reStore(leftPreOrderResult, leftInOrderResult);
  }
  if (hasRight) {
    const rightInOrderResult = _inOrderResult.slice(inOrderResultIndex + 1);
    const rightPreOrderResult = _preOrderResult.slice(
      _preOrderResult.length - rightInOrderResult.length
    );
    // console.log('右子树', rightInOrderResult, rightPreOrderResult);
    right = reStore(rightPreOrderResult, rightInOrderResult);
  }

  return new TreeNode(currentData, left, right);
}

bst.root = reStore(preOrderResult, inOrderResult);
BST.postOrder(bst.root);
