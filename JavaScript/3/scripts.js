const myButton = document.getElementsByTagName("Button")[0];
const anchorTag = document.getElementsByTagName("a")[0];

myButton.addEventListener("click", showValuesOfAttributes);

function showValuesOfAttributes() {
    const p = document.createElement("p");

    const hreF = anchorTag.href;
    const hreflaG = anchorTag.hreflang;
    const reL = anchorTag.rel;
    const targeT = anchorTag.target;
    const typE = anchorTag.type;

    p.innerHTML = `href --> ${hreF}, hreflag --> ${hreflaG}, rel --> ${reL}, target --> ${targeT}, type --> ${typE}`;

    document.body.appendChild(p);
}