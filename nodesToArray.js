function nodeToArr() {
  let parents = [document.body];
  return findChildren(parents);
}

function findChildren(parents) {
  return parents.map(parent => {
    if (parent.children.length === 0) {
      return [parent.nodeName, Array.from(parent.children)];
    } else {
      return [parent.nodeName, findChildren(Array.from(parent.children))];
    }
  });
}


