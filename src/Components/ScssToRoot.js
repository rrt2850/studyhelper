const fs = require('fs');
const sass = require('sass');

// Read the SCSS file
const scss = fs.readFileSync('../App.scss', 'utf-8');

// Compile the SCSS and extract the values of the base and dark themes
const result = sass.renderSync({ data: scss });
const { $baseTheme, $darkTheme } = result.stats.includedFiles.reduce((themes, file) => {
    const result = sass.renderSync({ file });
    const theme = result.css.toString().match(/\$([a-z-]+):\s*([^;]+);/g)
        .reduce((obj, match) => {
            const [key, value] = match.split(':');
            obj[key.slice(1)] = value.trim();
            return obj;
        }, {});
    if (file.includes('base')) themes.$baseTheme = theme;
    if (file.includes('dark')) themes.$darkTheme = theme;
    return themes;
}, {});

// Convert the theme values into rootStyles format
const convertTheme = (theme) => ({
    '--sidebar-bg-color': theme['background-color'],
    '--sidebar-text-color': theme['text-color'],
    '--sidebar-selected-bg-color': theme['primary-color'],
    '--sidebar-selected-text-color': theme['text-color'],
    '--sidebar-icon-color': theme['text-color'],
});
const rootStyles = {
    ':root': {
        ...convertTheme($baseTheme),
        ...convertTheme($darkTheme),
    },
};

module.exports = rootStyles;