// Cargador de artículos Markdown sin dependencias pesadas de Node.js
const postFiles = import.meta.glob('../data/posts/*.md', { as: 'raw', eager: true });

const MONTHS = { jan: 0, ene: 0, feb: 1, mar: 2, apr: 3, abr: 3, may: 4, jun: 5, jul: 6, aug: 7, ago: 7, sep: 8, set: 8, oct: 9, nov: 10, dec: 11, dic: 11 };

// Interpreta "DD-Mon-AAAA" (p. ej. 14-Sep-2026) y "AAAA-MM-DD" sin depender del navegador
const parseDate = (value) => {
    if (!value) return 0;
    const text = String(value).trim();
    let m = text.match(/^(\d{1,2})[-\s/]([A-Za-zÁÉÍÓÚáéíóú]{3})[A-Za-z.]*[-\s/](\d{4})$/);
    if (m) {
        const month = MONTHS[m[2].toLowerCase().slice(0, 3)];
        if (month !== undefined) return Date.UTC(Number(m[3]), month, Number(m[1]));
    }
    m = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (m) return Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    const parsed = Date.parse(text);
    return Number.isNaN(parsed) ? 0 : parsed;
};

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
            filename,
            id: data.id || filename,
            slug: data.id || filename
        };
    });

    // Ordenar por fecha descendente; a igual fecha, primero el post con mayor numeración de archivo
    return posts.sort((a, b) => {
        const diff = parseDate(b.date) - parseDate(a.date);
        return diff !== 0 ? diff : b.filename.localeCompare(a.filename);
    });
};

export const getPostById = (id) => {
    const posts = getAllPosts();
    return posts.find((post) => post.slug === id || post.id === id);
};
