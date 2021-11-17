function nodeSwap(one, two) {
  let firstEle = document.getElementById(String(one));
  let secondEle = document.getElementById(String(two));
  if ( !firstEle || !secondEle) {
    return undefined;
  }
  if (firstEle.contains(secondEle) || secondEle.contains(firstEle)) {
    return undefined;
  }
  let firstReplace = document.createElement(firstEle.tagName);
  let secondReplace = document.createElement(secondEle.tagName);
  firstEle.insertAdjacentElement('afterend', firstReplace);
  secondEle.insertAdjacentElement('afterend', secondReplace);
  let firstParent = firstEle.parentNode;
  let secondParent = secondEle.parentNode;
  firstParent.replaceChild(secondEle, firstReplace);
  secondParent.replaceChild(firstEle, secondReplace);
}