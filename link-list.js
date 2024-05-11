import hasOwnProp from './util/helpers.js';


class LinkList {
  constructor(head = null) {
    this.#verifyNode(head);
    this.head = head;
  }

  #verifyNode(node) {
    if (
        node != null 
        && ( !hasOwnProp(node, 'next')
        || !hasOwnProp(node, 'value') )
      ) {
      throw Error('Invalid node input inside LinkList constructor');
    }
  }

  append(value) {
    if (this.head === null) {
      this.head = new Node(value);
      return;
    }

    let currentNode = this.head;
    while (currentNode.next != null) {
      currentNode = currentNode.next;
      this.#verifyNode(currentNode);
    }

    currentNode.next = new Node(value);
  }

  prepend(value) {
    let nextNode = this.head;
    this.head = new Node(value, nextNode);
  }
};


class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
};


const printLinkList = function printLinkList(linkList) {
  let currentNode = linkList.head;
  while (currentNode != null) {
    console.log(currentNode.value);
    currentNode = currentNode.next;
  }
}


const test = function test() {
  let linkList = new LinkList();
  linkList.append("apple");
  linkList.append("grape");
  linkList.append("banana");
  linkList.append("lemon");
  printLinkList(linkList);
  console.log('');
  linkList.prepend("strawberry");
  linkList.prepend("blueberry");
  linkList.prepend("cranberry");
  printLinkList(linkList);
}


test();