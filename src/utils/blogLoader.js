// Cargador de artículos Markdown sin dependencias pesadas de Node.js
const postFiles = import.meta.glob('../data/posts/*.md', { as: 'raw', eager: true });

export const getAllPosts = () => {
    const posts = Object.keys(postFiles).map((path) => {
        const rawContent = postFiles[path];

        // Simple frontmatter parser
        const fmMatch = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
        let data = {};
        let content = rawContent;

        if (fmMatch) {
            const fmText = fmMatch[1];
            content = rawContent.slice(fmMatch[0].length).trim();

            // Parse key-value pairs from frontmatter
            fmText.split('\n').forEach(line => {
                const [key, ...valueParts] = line.split(':');
                if (key && valueParts.length > 0) {
                    const value = valueParts.join(':').trim().replace(/^"(.*)"$/, '$1');
                    data[key.trim()] = value;
                }
            });
        }

        const filename = path.split('/').pop().replace('.md', '');

        return {
            ...data,
            content,
            id: data.id || filename,
            slug: data.id || filename
        };
    });

    // Ordenar por fecha descendente
    return posts.sort((a, b) => {
        const dateA = new Date(a.date || 0);
        const dateB = new Date(b.date || 0);
        return dateB - dateA;
    });
};

export const getPostById = (id) => {
    const posts = getAllPosts();
    return posts.find((post) => post.slug === id || post.id === id);
};
