import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Node, FlatNode } from '../../../models/node';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Tree } from '../../../models/tree';
import { TranslocoService } from '@ngneat/transloco';


@Component({
  selector: 'app-tree-edit',
  templateUrl: './tree-edit.component.html',
  styleUrls: ['./tree-edit.component.scss']
})
export class TreeEditComponent implements OnInit {

  ngOnInit(): void {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);
    this.treeControl = new FlatTreeControl<FlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    this.tree.dataChange.subscribe(data => {
      this.dataSource.data = [];
      this.dataSource.data = data;
      this.isCreatorMode ? '' : this.treeControl.collapseAll();
    });
  }

  @Input()
  tree: Tree;
  @Input()
  isCreatorMode: boolean;
  @Input()
  editOnly: boolean;
  @Input()
  clickTrace = [];
  @Input()
  trueRoute: string[] = [];

  @Output() treeChange = new EventEmitter<Tree>();

  changeTree(node) {
    this.saveNode(node, node.value);
    this.treeChange.emit(this.tree);
  }

  flatNodeMap = new Map<FlatNode, Node>();
  nestedNodeMap = new Map<Node, FlatNode>();
  selectedParent: FlatNode | null = null;  
  treeControl: FlatTreeControl<FlatNode>;
  treeFlattener: MatTreeFlattener<Node, FlatNode>;
  dataSource: MatTreeFlatDataSource<Node, FlatNode>;

  currentNode: FlatNode | null = null;
  destination: FlatNode | null = null;
  localClickTrace = [];
  
  isDestination = (node: FlatNode) => this.destination === node;
  isCurrentNode = (node: FlatNode) => this.currentNode === node;

  isParentOfCurrentNode(node: FlatNode) {
    let nestedNode = this.flatNodeMap.get(this.currentNode);
    let parent = this.tree.getParentFromNodes(nestedNode);
    while ((parent = this.tree.getParentFromNodes(nestedNode)) !== null) {
      if (parent.value === node.value) return true;
      nestedNode = parent;
    }

    return false;
  }

  isChildOfCurrentNode(node: FlatNode) {
    let nestedNode = this.flatNodeMap.get(this.currentNode);
    if (nestedNode?.children?.find(n => n.value === node.value) !== undefined) return true;

    return false;
  }

  isCurrentNodeOrItsParentOrHasChildren(node: FlatNode) {
    if (this.currentNode == null ||
      this.isCurrentNode(node) ||
      this.isParentOfCurrentNode(node) ||
      this.isChildOfCurrentNode(node)) return true;
    
    return false;
  }

  setCurrentNode(node: FlatNode) {
    if(this.isCreatorMode) {
      if (this.treeControl.isExpanded(node)) this.treeControl.collapse(node);
      else this.treeControl.expand(node);
      return;
    }

    if (node.level === 0 && this.currentNode === node) {
      this.currentNode = null;
      this.treeControl.collapseAll();
      return;
    }

    this.currentNode = node;
    if (node.expandable) this.treeControl.expand(node);
  }

  constructor(private translocoService: TranslocoService) {
  }

  addToTrace(node) {
    if (this.isCreatorMode) return;
    if (node.value === this.localClickTrace[this.localClickTrace.length - 1]) { return; }
    this.localClickTrace.push(node.value);
  }

  getLevel = (node: FlatNode) => node.level;

  isExpandable = (node: FlatNode) => node.expandable;

  getChildren = (node: Node): Node[] => node.children;

  hasChild = (_: number, _nodeData: FlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: FlatNode) => _nodeData.value === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: Node, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && existingNode.value === node.value
      ? existingNode
      : new FlatNode();
    flatNode.value = node.value;
    flatNode.level = level;
    flatNode.expandable = (!!node.children && node.children.length > 0);
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  /** Select the category so we can insert the new value. */
  addNewValue(node: FlatNode) {
    const parentNode = this.flatNodeMap.get(node);
    this.tree.insert(parentNode, this.translocoService.translate('tasks.tree.nodeValue') + this.treeControl.dataNodes.length);
    this.treeControl.expand(node);
  }

  deleteNode(node: FlatNode) {
    this.tree.delete(this.flatNodeMap.get(node));
  }

  /** Save the node to database */
  saveNode(node: FlatNode, value: string) {
    const nestedNode = this.flatNodeMap.get(node);
    this.tree.update(nestedNode, value);
  }

  setTrueRoute(node: FlatNode) {
    let nestedNode = this.flatNodeMap.get(node);
    let parent;
    let route = [nestedNode];
    while ((parent = this.tree.getParentFromNodes(nestedNode)) !== null) {
      route.push(parent);
      nestedNode = parent;
    }
    while (this.trueRoute.length > 0) {
      this.trueRoute.pop();
    }
    this.trueRoute.push(...route.reverse().map(node => node.value));
  }

  setDestination(node: FlatNode) {
    if (this.destination != null) {
      this.destination = null;
      this.clickTrace.length = 0;
    } else {
      this.destination = node;
      this.clickTrace.push(...this.localClickTrace);
    }
  }
}
