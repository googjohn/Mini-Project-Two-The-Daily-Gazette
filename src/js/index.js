const sections = document.getElementsByTagName('section');

for (let ii = 0; ii < sections.length; ii++) ii % 2 === 0 ? sections[ii].style.backgroundColor = '#ffffff' : sections[ii].style.backgroundColor = '#eaeaea';
