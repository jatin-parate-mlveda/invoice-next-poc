module.exports = {
  content: [
    './.next/**/*.{js,ts,jsx,tsx,html}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
};
