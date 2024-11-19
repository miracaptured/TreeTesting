export class Node {
    children: Node[];
    value: string;
}
  
export class FlatNode {
    value: string;
    level: number;
    expandable: boolean;
}