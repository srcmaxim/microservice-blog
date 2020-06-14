import React from 'react';
import {from8601toPublishDate} from '../../../functions/Utils';

function PostMeta({ className, publishDate, readMinutes, tags }) {
    publishDate = from8601toPublishDate(publishDate);
    readMinutes = readMinutes + " min";
    const tagsJsx = tags && tags.length > 0 ? (<><span aria-label="tags" role="img">🏷️</span> { tags.join(" ") }</>) : null;
    return (
        <p className={className}><span role="img"
            aria-label="publish date">⏱️</span> { publishDate } <span role="img"
            aria-label="read minutes">⌛</span> { readMinutes } {tagsJsx}</p>
    );
}

export default PostMeta;
                