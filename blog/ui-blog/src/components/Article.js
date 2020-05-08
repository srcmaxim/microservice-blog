import React from 'react';
import {
    Switch,
    Route,
  } from "react-router-dom";
import './Article.css';

import ReactMarkdown from 'react-markdown';

function Article() {
    
    let blogsId = "blogs";
    let blogId = "lorem_ipsum_dolor_sit_amet";
    let projectId = "projects";
    let aboutId = "about";
    let content = [
        {
            id: "blogs",
            blogs: [
                {
                    id: "lorem_ipsum_dolor_sit_amet",
                    header: "Lorem ipsum dolor sit amet",
                    minToRead: "3 min",
                    tags: "GraalVM, Quarkus",
                    description: "Mauris enim quam, convallis finibus venenatis sed, finibus a lorem. Duis in pharetra ante. Maecenas ut velit vitae lorem lobortis fermentum id in sapien."
                },
                {
                    id: "convallis_finibus_venenatis",
                    header: "Convallis finibus venenatis",
                    minToRead: "3 min",
                    tags: "GraalVM, Quarkus",
                    description: "Mauris enim quam, convallis finibus venenatis sed, finibus a lorem. Duis in pharetra ante. Maecenas ut velit vitae lorem lobortis fermentum id in sapien."
                }
            ]
        },
        {
            id: "lorem_ipsum_dolor_sit_amet",
            header: "Lorem ipsum dolor sit amet",
            minToRead: "3 min",
            tags: "GraalVM, Quarkus",
            description: "Mauris enim quam, convallis finibus venenatis sed, finibus a lorem. Duis in pharetra ante. Maecenas ut velit vitae lorem lobortis fermentum id in sapien. Nulla consequat, tortor ac ultrices imperdiet, nisl erat condimentum eros, id aliquam tellus purus id tortor. Morbi quis sollicitudin sem. Sed id lacus nec ante venenatis condimentum. Sed aliquam mi in sapien auctor facilisis. Morbi ac justo efficitur nunc porta mattis. Quisque et sollicitudin arcu. Praesent sit amet mi sed elit aliquet posuere a ut leo. Nam vulputate, magna ut mattis fringilla, urna felis consectetur mi, id lacinia metus urna in arcu. Sed lorem quam, imperdiet vel odio sit amet, mollis condimentum dolor. Sed vel nunc fermentum, rhoncus justo eget, dictum ante. Cras imperdiet massa risus, vitae pulvinar arcu aliquet vel. Maecenas eget vehicula risus.",
            content: `
# 1 Subfolder
Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse euismod, erat ac pulvinar luctus, orci lacus eleifend erat, id congue lorem erat sit amet purus. Nullam et mi quam. Vivamus hendrerit ornare dictum. Aliquam sagittis dictum magna ut elementum. Morbi scelerisque viverra justo sit amet tincidunt. Integer a elit commodo dui porta vehicula. Vestibulum tempus diam in nisl tincidunt, rutrum consequat ante mattis. Donec orci quam, congue in dui vel, pellentesque facilisis arcu. Vivamus faucibus magna ut molestie suscipit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean in velit et nisl semper pretium non et justo. Duis mollis diam sit amet metus scelerisque rutrum. Ut dignissim, felis at pulvinar aliquam, libero felis imperdiet lacus, eu efficitur sem sapien non justo. Proin venenatis pulvinar arcu eget maximus. Fusce elementum mollis ante, a congue leo vestibulum in.

# 1.2 Subfolder
Mauris enim quam, convallis finibus venenatis sed, finibus a lorem. Duis in pharetra ante. Maecenas ut velit vitae lorem lobortis fermentum id in sapien. Nulla consequat, tortor ac ultrices imperdiet, nisl erat condimentum eros, id aliquam tellus purus id tortor. Morbi quis sollicitudin sem. Sed id lacus nec ante venenatis condimentum. Sed aliquam mi in sapien auctor facilisis. Morbi ac justo efficitur nunc porta mattis. Quisque et sollicitudin arcu. Praesent sit amet mi sed elit aliquet posuere a ut leo. Nam vulputate, magna ut mattis fringilla, urna felis consectetur mi, id lacinia metus urna in arcu. Sed lorem quam, imperdiet vel odio sit amet, mollis condimentum dolor. Sed vel nunc fermentum, rhoncus justo eget, dictum ante. Cras imperdiet massa risus, vitae pulvinar arcu aliquet vel. Maecenas eget vehicula risus.

# 1.2.1 Subfolder
Mauris enim quam, convallis finibus venenatis sed, finibus a lorem. Duis in pharetra ante. Maecenas ut velit vitae lorem lobortis fermentum id in sapien. Nulla consequat, tortor ac ultrices imperdiet, nisl erat condimentum eros, id aliquam tellus purus id tortor. Morbi quis sollicitudin sem. Sed id lacus nec ante venenatis condimentum. Sed aliquam mi in sapien auctor facilisis. Morbi ac justo efficitur nunc porta mattis. Quisque et sollicitudin arcu. Praesent sit amet mi sed elit aliquet posuere a ut leo. Nam vulputate, magna ut mattis fringilla, urna felis consectetur mi, id lacinia metus urna in arcu. Sed lorem quam, imperdiet vel odio sit amet, mollis condimentum dolor. Sed vel nunc fermentum, rhoncus justo eget, dictum ante. Cras imperdiet massa risus, vitae pulvinar arcu aliquet vel. Maecenas eget vehicula risus.

# 2 Subfolder
Mauris enim quam, convallis finibus venenatis sed, finibus a lorem. Duis in pharetra ante. Maecenas ut velit vitae lorem lobortis fermentum id in sapien. Nulla consequat, tortor ac ultrices imperdiet, nisl erat condimentum eros, id aliquam tellus purus id tortor. Morbi quis sollicitudin sem. Sed id lacus nec ante venenatis condimentum. Sed aliquam mi in sapien auctor facilisis. Morbi ac justo efficitur nunc porta mattis. Quisque et sollicitudin arcu. Praesent sit amet mi sed elit aliquet posuere a ut leo. Nam vulputate, magna ut mattis fringilla, urna felis consectetur mi, id lacinia metus urna in arcu. Sed lorem quam, imperdiet vel odio sit amet, mollis condimentum dolor. Sed vel nunc fermentum, rhoncus justo eget, dictum ante. Cras imperdiet massa risus, vitae pulvinar arcu aliquet vel. Maecenas eget vehicula risus.

# 2.1 Subfolder
Mauris enim quam, convallis finibus venenatis sed, finibus a lorem. Duis in pharetra ante. Maecenas ut velit vitae lorem lobortis fermentum id in sapien. Nulla consequat, tortor ac ultrices imperdiet, nisl erat condimentum eros, id aliquam tellus purus id tortor. Morbi quis sollicitudin sem. Sed id lacus nec ante venenatis condimentum. Sed aliquam mi in sapien auctor facilisis. Morbi ac justo efficitur nunc porta mattis. Quisque et sollicitudin arcu. Praesent sit amet mi sed elit aliquet posuere a ut leo. Nam vulputate, magna ut mattis fringilla, urna felis consectetur mi, id lacinia metus urna in arcu. Sed lorem quam, imperdiet vel odio sit amet, mollis condimentum dolor. Sed vel nunc fermentum, rhoncus justo eget, dictum ante. Cras imperdiet massa risus, vitae pulvinar arcu aliquet vel. Maecenas eget vehicula risus.
`
        },
        {
            id: "projects",
            header: "Projects",
            content: `
# 🔥 Snapstreak
Mauris enim quam, convallis finibus venenatis sed, finibus a lorem. Duis in pharetra ante. Maecenas ut velit vitae lorem lobortis fermentum id in sapien. Mauris enim quam, convallis finibus venenatis sed, finibus a lorem. Duis in pharetra ante. Maecenas ut velit vitae lorem lobortis fermentum id in sapien. Mauris enim quam, convallis finibus venenatis sed, finibus a lorem. Duis in pharetra ante. Maecenas ut velit vitae lorem lobortis fermentum id in sapien.

# 👍 Thumbs Up
Mauris enim quam, convallis finibus venenatis sed, finibus a lorem. Duis in pharetra ante. Maecenas ut velit vitae lorem lobortis fermentum id in sapien. Duis in pharetra ante. Maecenas ut velit vitae lorem lobortis fermentum id in sapien. Mauris enim quam, convallis finibus venenatis sed, finibus a lorem. Duis in pharetra ante. Maecenas ut velit vitae lorem lobortis fermentum id in sapien. Mauris enim quam, convallis finibus venenatis sed, finibus a lorem. Duis in pharetra ante. Maecenas ut velit vitae lorem lobortis fermentum id in sapien.

# ✔ Check Mark
Mauris enim quam, convallis finibus venenatis sed, finibus a lorem. Duis in pharetra ante. Maecenas ut velit vitae lorem lobortis fermentum id in sapien. Mauris enim quam, convallis finibus venenatis sed, finibus a lorem. Duis in pharetra ante. Maecenas ut velit vitae lorem lobortis fermentum id in sapien. Mauris enim quam, convallis finibus venenatis sed, finibus a lorem. Duis in pharetra ante. Maecenas ut velit vitae lorem lobortis fermentum id in sapien.
`        
        },
        {
            id: "about",
            header: "About",
            content: `
Mauris enim quam, convallis finibus venenatis sed, finibus a lorem. Duis in pharetra ante. Maecenas ut velit vitae lorem lobortis fermentum id in sapien.

# 🎥 Emoji Movie
Mauris enim quam, convallis finibus venenatis sed, finibus a lorem. Duis in pharetra ante. Maecenas ut velit vitae lorem lobortis fermentum id in sapien. Mauris enim quam, convallis finibus venenatis sed, finibus a lorem. Duis in pharetra ante. Maecenas ut velit vitae lorem lobortis fermentum id in sapien. Mauris enim quam, convallis finibus venenatis sed, finibus a lorem. Duis in pharetra ante. Maecenas ut velit vitae lorem lobortis fermentum id in sapien.

# 🍂 Fall / Autumn
Mauris enim quam, convallis finibus venenatis sed, finibus a lorem. Duis in pharetra ante. Maecenas ut velit vitae lorem lobortis fermentum id in sapien. Duis in pharetra ante. Maecenas ut velit vitae lorem lobortis fermentum id in sapien. Mauris enim quam, convallis finibus venenatis sed, finibus a lorem. Duis in pharetra ante. Maecenas ut velit vitae lorem lobortis fermentum id in sapien. Mauris enim quam, convallis finibus venenatis sed, finibus a lorem. Duis in pharetra ante. Maecenas ut velit vitae lorem lobortis fermentum id in sapien.

# 🌿 Four Twenty
Mauris enim quam, convallis finibus venenatis sed, finibus a lorem. Duis in pharetra ante. Maecenas ut velit vitae lorem lobortis fermentum id in sapien. Mauris enim quam, convallis finibus venenatis sed, finibus a lorem. Duis in pharetra ante. Maecenas ut velit vitae lorem lobortis fermentum id in sapien. Mauris enim quam, convallis finibus venenatis sed, finibus a lorem. Duis in pharetra ante. Maecenas ut velit vitae lorem lobortis fermentum id in sapien.
`        
        }
    ]
    return (
        <Switch>
                <Route path="/blog">
                <article className="Article">
                    <h1>{ content.find(i => i.id == blogsId).blogs.find(i => i.id == blogId).header }</h1>
                    <p>{ content.find(i => i.id == blogsId).blogs.find(i => i.id == blogId).description }</p>
                    <p>⏱️ { content.find(i => i.id == blogsId).blogs.find(i => i.id == blogId).minToRead } 🏷️ { content.find(i => i.id == blogsId).blogs.find(i => i.id == blogId).tags }</p>
                    
                    <h1>{ content.find(i => i.id == blogsId).blogs.find(i => i.id == blogId).header }</h1>
                    <p>{ content.find(i => i.id == blogsId).blogs.find(i => i.id == blogId).description }</p>
                    <p>⏱️ { content.find(i => i.id == blogsId).blogs.find(i => i.id == blogId).minToRead } 🏷️ { content.find(i => i.id == blogsId).blogs.find(i => i.id == blogId).tags }</p>
                </article>
                </Route>
                <Route path="/blog/lorem_ipsum_dolor_sit_amet">
                <article className="Article">
                    <h1 className="Article-header">{ content.find(i => i.id == blogId).header }</h1>
                    <p>⏱️ { content.find(i => i.id == blogId).minToRead } 🏷️ { content.find(i => i.id == blogId).tags }</p>
                    <ReactMarkdown source={ content.find(i => i.id == blogId).content }/>
                </article>
                </Route>
                <Route path="/projects">
                    <article className="Article">
                        <ReactMarkdown source={ content.find(i => i.id == projectId).content }/>
                    </article>
                </Route>
                <Route path="/about">
                    <article className="Article">
                        <ReactMarkdown source={ content.find(i => i.id == aboutId).content }/>
                    </article>
                </Route>
            </Switch>
    );
}

export default Article;