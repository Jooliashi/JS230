function sliceTree(start, inner) {
  let startNode = document.getElementById(start);
  let innerNode = document.getElementById(inner);
  if (!startNode || !innerNode) return undefined;
  let result = [];
  do {
    result.push(innerNode.tagName);
    innerNode = innerNode.parentNode;
    // console.log(innerNode.tagName)
  } while (innerNode !== startNode && innerNode.tagName !== 'BODY')
  
  if (innerNode === startNode) {
    result.push(innerNode.tagName);
    return result.reverse();
  } else {
    return undefined;
  }
}

function nodeSwap(one, two) {
  let nodeOne = document.getElementById(one);
  let nodeTwo = document.getElementById(two);

  if (!nodeOne || !nodeTwo) {
    return undefined;
  } else if (sliceTree(one, two) || sliceTree(two, one)) {
    return undefined;
  }

  let cloneOne = nodeOne.cloneNode(true);
  let cloneTwo = nodeTwo.cloneNode(true);
  nodeOne.parentNode.replaceChild(cloneTwo, nodeOne);
  nodeTwo.parentNode.replaceChild(cloneOne, nodeTwo);
  return true;
}