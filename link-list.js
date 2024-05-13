import { hasOwnProp, noop } from './util/helpers.js';


class LinkList {
  #head;
  #tail;

  constructor(head = null) {
    this.#verifyNode(head);
    this.#head = head;
    this.#initTail();
  }

  get size() {
    let itemCount = 0;
    let currentNode = this.#head;
    while(currentNode !== null) {
      this.#verifyNode(currentNode);
      itemCount += 1;
      currentNode = currentNode.next;
    }
    return itemCount;
  }

  get head() {
    return this.#head;
  }

  set head(value) {
    noop();
  }

  get tail() {
    return this.#tail;
  }

  set tail(value) {
    noop();
  }

  #initTail() {
    if (this.#head === null) {
      this.#tail = null;
      return;
    }

    let currentNode = this.#head;
    while (currentNode.next !== null) {
      currentNode = currentNode.next;
      this.#verifyNode(currentNode);
    }
    this.#tail = currentNode;
  }

  #updateTail(node) {
    this.#verifyNode(node);
    this.#tail = node;
  }

  #verifyNode(node) {
    if (
        node !== null 
        && ( !hasOwnProp(node, 'next')
        || !hasOwnProp(node, 'value') )
      ) {
      throw Error('Invalid node input inside LinkList constructor');
    }
  }

  at(index) {
    if (index < 0) {
      return null;
    }

    let currentIndex = 0;
    let currentNode = this.#head;

    while (currentNode !== null) {
      this.#verifyNode(currentNode);
      if (currentIndex === index) {
        return currentNode;
      }
      currentNode = currentNode.next;
      currentIndex += 1;
    }

    return null;
  }

  contains(value) {
    let currentNode = this.#head;
    while (currentNode !== null) {
      this.#verifyNode(currentNode);
      if (currentNode.value === value) {
        return true;
      }
      currentNode = currentNode.next; 
    }

    return false;
  }

  find(value) {
    let currentIndex = 0;
    let currentNode = this.#head;
    while (currentNode != null) {
      this.#verifyNode(currentNode);
      if (currentNode.value === value) {
        return currentIndex;
      }
      currentNode = currentNode.next;
      currentIndex += 1;
    }

    return null;
  }

  toString() {
    if (this.#head === null) {
      return '[ Empty Link List ]';
    }

    let strRepr = '';
    let currentNode = this.#head;
    while (currentNode !== null) {
      strRepr += `( ${currentNode.value} ) -> `;
      currentNode = currentNode.next;
    }
    return strRepr + 'null';
  }

  append(value) {
    if (this.#head === null) {
      this.#head = new Node(value);
      return;
    }

    let currentNode = this.#head;
    while (currentNode.next !== null) {
      currentNode = currentNode.next;
      this.#verifyNode(currentNode);
    }

    currentNode.next = new Node(value);
    this.#updateTail(currentNode.next);
  }

  prepend(value) {
    let nextNode = this.#head;
    this.#head = new Node(value, nextNode);
  }

  pop() {
    let currentNode = this.#head;
    while (currentNode !== null) {
      this.#verifyNode(currentNode);
      if (currentNode.next === this.#tail) {
        currentNode.next = null;
        this.#tail = currentNode;
        break;
      } else if (currentNode === this.#tail) {
        /* first node being the only node and first node isn't null */
        this.#head = null;
      }
      currentNode = currentNode.next;
    }
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
  while (currentNode !== null) {
    console.log(currentNode.value);
    currentNode = currentNode.next;
  }
  console.log('');
}


const test = function test() {
  let linkList = new LinkList();
  linkList.append("apple");
  linkList.append("grape");
  linkList.append("banana");
  linkList.append("lemon");
  printLinkList(linkList);
  linkList.prepend("strawberry");
  linkList.prepend("blueberry");
  linkList.prepend("cranberry");
  linkList.append("chocolate");
  printLinkList(linkList);
}


test();