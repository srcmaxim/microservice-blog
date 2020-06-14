export const from8601toPublishDate = date => new Date(date).toLocaleString("en-US", {year: 'numeric',  month: 'long', day: 'numeric'});
export const dateTo8601 = () => new Date().toISOString().substring(0, 10);
export const countReadMinutes = text => Math.ceil(text.split(/\s+/).length / 280);
