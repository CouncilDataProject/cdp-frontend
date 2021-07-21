const DEFAULT_LANGUAGE = "en";
const SUPPORTED_LANGUAGES = require(`./lib/constants/ProjectConstants`).SUPPORTED_LANGUAGES.filter((language) => { return language !== DEFAULT_LANGUAGE });

const defaultLanguageStrings = require(`./lib/assets/strings/${DEFAULT_LANGUAGE}`).default

function checkLanguages() {
  console.log(`***\n\nBeginning localization-checking script for languages: ${SUPPORTED_LANGUAGES}. \n\nTake a look at any SUSPECT KEYS and make sure they are actually translated.\n\n***`);

  SUPPORTED_LANGUAGES.forEach((languageCode) => {
    console.log(`   ${languageCode.toUpperCase()} starting...\n`);
    const currentLang = require(`./lib/assets/strings/${languageCode}`).default;
    let keys = Object.keys(currentLang);
    keys.forEach((key) => {
      if(currentLang[key] === defaultLanguageStrings[key]) {
        // english and this language have the same value for the same key, this is suspect
        console.log(`      SUSPECT KEY: "${key}"\n`);
      }
    })
    console.log(`   ${languageCode.toUpperCase()} complete\n`);
  });

  console.log(`***\n\nCompleted localization-checking script.\n\n***`);
}

try {
  checkLanguages();
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
