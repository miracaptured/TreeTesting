import { BehaviorSubject } from "rxjs";
import { Node } from './node';

export class Tree {
    dataChange = new BehaviorSubject<Node[]>([]);

    get data(): Node[] { return this.dataChange.value; }
  
    constructor(TREE_DATA) {
      this.initialize(TREE_DATA);
    }
  
    initialize(TREE_DATA = {'Новый узел': null}) {
      const data = this.buildTree(TREE_DATA, 0);

      this.dataChange.next(data);
    }

    buildTree(obj: object, level: number): Node[] {
      return Object.keys(obj).reduce<Node[]>((accumulator, key) => {
        const value = obj[key];
        const node = new Node();
        node.value = key;
  
        if (value != null) {
          if (typeof value === 'object') {
            node.children = this.buildTree(value, level + 1);
          } else {
            node.value = value;
          }
        }
  
        return accumulator.concat(node);
      }, []);
    }

    insert(parent: Node, name: string): Node {
      if (!parent.children) {
        parent.children = [];
      }
      const newItem = { value: name } as Node;
      parent.children.push(newItem);
      this.dataChange.next(this.data);
      return newItem;
    }
  
    insertAbove(node: Node, name: string): Node {
      const parentNode = this.getParentFromNodes(node);
      const newItem = { value: name } as Node;
      if (parentNode != null) {
        parentNode.children.splice(parentNode.children.indexOf(node), 0, newItem);
      } else {
        this.data.splice(this.data.indexOf(node), 0, newItem);
      }
      this.dataChange.next(this.data);
      return newItem;
    }
  
    insertBelow(node: Node, name: string): Node {
      const parentNode = this.getParentFromNodes(node);
      const newItem = { value: name } as Node;
      if (parentNode != null) {
        parentNode.children.splice(parentNode.children.indexOf(node) + 1, 0, newItem);
      } else {
        this.data.splice(this.data.indexOf(node) + 1, 0, newItem);
      }
      this.dataChange.next(this.data);
      return newItem;
    }
  
    getParentFromNodes(node: Node): Node {
      for (let i = 0; i < this.data.length; ++i) {
        const currentRoot = this.data[i];
        const parent = this.getParent(currentRoot, node);
        if (parent != null) {
          return parent;
        }
      }
      return null;
    }
  
    getParent(currentRoot: Node, node: Node): Node {
      if (currentRoot.children && currentRoot.children.length > 0) {
        for (let i = 0; i < currentRoot.children.length; ++i) {
          const child = currentRoot.children[i];
          if (child === node) {
            return currentRoot;
          } else if (child.children && child.children.length > 0) {
            const parent = this.getParent(child, node);
            if (parent != null) {
              return parent;
            }
          }
        }
      }
      return null;
    }
  
    update(node: Node, name: string) {
      node.value = name;
      this.dataChange.next(this.data);
    }
  
    delete(node: Node) {
      this.deleteNode(this.data, node);
      this.dataChange.next(this.data);
    }
  
    copy(from: Node, to: Node): Node {
      const newItem = this.insert(to, from.value);
      if (from.children) {
        from.children.forEach(child => {
          this.copy(child, newItem);
        });
      }
      return newItem;
    }
  
    copyAbove(from: Node, to: Node): Node {
      const newItem = this.insertAbove(to, from.value);
      if (from.children) {
        from.children.forEach(child => {
          this.copy(child, newItem);
        });
      }
      return newItem;
    }
  
    copyBelow(from: Node, to: Node): Node {
      const newItem = this.insertBelow(to, from.value);
      if (from.children) {
        from.children.forEach(child => {
          this.copy(child, newItem);
        });
      }
      return newItem;
    }
  
    deleteNode(nodes: Node[], nodeToDelete: Node) {
      const index = nodes.indexOf(nodeToDelete, 0);
      if (index > -1) {
        nodes.splice(index, 1);
      } else {
        nodes.forEach(node => {
          if (node.children && node.children.length > 0) {
            this.deleteNode(node.children, nodeToDelete);
          }
        });
      }
    }

    addToJson(nodes) {
        let result = {};
        if (!!nodes) nodes.forEach(node => result[node.value] = this.addToJson(node.children));
        else result = null;
        return result;
    }

    toJson() {
        return this.addToJson(this.data);
    }
}