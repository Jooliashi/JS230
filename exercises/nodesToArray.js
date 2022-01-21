function getChildren(parent) {
  return Array.from(parent.children).map(child => [child.tagName, getChildren(child)])
}

function nodeToArray() {
  return ['BODY', getChildren(document.body)];
}