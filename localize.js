const DEFAULT_LANGUAGE = "en";
// this should match available languages in src/assets
const SUPPORTED_LANGUAGES = ["de"];

const defaultLanguageStrings = require(`./lib/assets/strings/${DEFAULT_LANGUAGE}`).default

function checkLanguages() {
  console.log(`***\nBeginning localization-checking script for ${SUPPORTED_LANGUAGES}.\n***`);

  SUPPORTED_LANGUAGES.forEach((languageCode) => {
    console.log(`   ${languageCode.toUpperCase()} starting...\n`);
    const currentLang = require(`./lib/assets/strings/${languageCode}`).default;
    let keys = Object.keys(currentLang);
    keys.forEach((key) => {
      if(currentLang[key] === defaultLanguageStrings[key]) {
        // english and this language have the same value for the same key, this is suspect
        console.log(`***\SUSPECT KEY: "${key}" in ${languageCode}.\n`);
      }
    })
    console.log(`   ${languageCode.toUpperCase()} complete\n`);
  });

  console.log(`***\Completed localization-checking script.\n`);
}

try {
  checkLanguages();
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
}
