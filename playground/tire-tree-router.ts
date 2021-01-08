class WordNode {
  path: string;
  isWild: boolean;
  part: string; // 路由中由'/'分隔的部分
  children: Record<string, WordNode> = {}; // 子节点
}

type RouteHandle = (params?: Record<string, string>) => void;

class Router {
  root = new WordNode(); // 路由树根节点
  route: Record<string, RouteHandle> = {};

  static splitPath = (str: string) => {
    if (!str) {
      return [];
    }
    return str.split('/').filter(Boolean);
  };

  notFound = (str?: string) => {
    console.log(`404 ${str}未找到`);
  };

  add(method: 'GET' | 'POST', str: string, handler: RouteHandle) {
    if (!this.root.children[method]) {
      this.root.children[method] = new WordNode();
    }
    const parts = Router.splitPath(str);
    let _root = this.root.children[method];

    parts.forEach((part) => {
      // 已存在
      if (_root.children[part]) {
        _root = _root.children[part];
        return;
      }
      // 插入新节点
      _root.children[part] = new WordNode();
      _root = _root.children[part];
      _root.part = part;
      _root.isWild = part[0] === ':' || part[0] === '*';
    });
    _root.path = str;
    this.route[`${method}-${str}`] = handler;
  }

  get(str: string) {
    if (!this.root || str.length == 0 || !this.root.children['GET']) {
      return;
    }
    const parts = Router.splitPath(str);

    let _root = this.root.children['GET'];
    const params: Record<string, string> = {};

    let flag = parts.every((part) => {
      let nextRoot;
      for (const key in _root.children) {
        const node = _root.children[key];
        // 完全匹配
        if (node.part === part) {
          nextRoot = node;
          break;
        }
        // 参数匹配
        if (node.isWild) {
          nextRoot = node;
          const key = node.part.split(':')[1];
          params[key] = part;
        }
        // 通配符 - 前端路由不存在通配符
      }
      _root = nextRoot;

      if (!_root) {
        return false;
      }

      return true;
    });

    if (!flag) {
      this.notFound(str);
      return;
    }
    return this.route[`GET-${_root.path}`](params);
  }

  //   post(str: string) {
  //     if (!this.root || str.length == 0 || !this.root['POST']) {
  //       return;
  //     }
  //     const parts = Router.splitPath(str);
  //   }
}

const router = new Router();

router.add('GET', '/user', () => {
  console.log('/user 用户主页');
});
router.add('GET', '/user/list', () => {
  console.log('/user/list 用户列表');
});
router.add('GET', '/user/:id', (param) => {
  console.log(`/user/:id 用户${param.id}`);
});
router.add('GET', '/user/:id/edit', (param) => {
  console.log(`/user/:id/edit 编辑用户${param.id}`);
});

router.get('/user');
router.get('/user/list');
router.get('/use/list');
router.get('/user/sds');
router.get('/user/sds/edit');
