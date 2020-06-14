import React from 'react';

import MarkdownGithub from 'react-markdown-github';

function Projects() {
    const content = `
## 🦌 Animals & Nature
Elementum facilisis leo vel fringilla est ullamcorper eget nulla. Faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget. Enim tortor at auctor urna nunc id cursus metus. Auctor eu augue ut lectus. Tristique magna sit amet purus gravida quis blandit turpis cursus.

## 🦐 Bicycle
Faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget. Consequat nisl vel pretium lectus quam id leo. Nullam eget felis eget nunc

## 🦠 Pills
Tristique magna sit amet purus gravida quis blandit turpis cursus. Consequat nisl vel pretium lectus quam id leo. Nullam eget felis eget nunc lobortis mattis aliquam faucibus purus. Faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget. Enim tortor at auctor urna nunc id cursus metus. Auctor eu augue ut lectus. Dictum at tempor commodo ullamcorper a lacus. Porta lorem mollis aliquam ut porttitor leo a.
`
    return <MarkdownGithub source={ content }  />;
}

export default Projects;
