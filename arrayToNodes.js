function arrayToNodes(nodes) {
  let parent = document.createElement(nodes[0]);
  if (nodes[1].length === 0) {
    return parent;
  } else {
    nodes[1].forEach(child => {
      parent.appendChild(arrayToNodes(child));
    });
  }
  return parent;
}