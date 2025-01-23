const config = {
    printWidth: 120,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: false,
    trailingComma: "none",
    bracketSpacing: true,
    bracketSameLine: true,
    arrowParens: "always",
    embeddedLanguageFormatting: "off",
    overrides: [
        {
            files: "*.html",
            options: {
                tabWidth: 2
            }
        }
    ]
};

export default config;
