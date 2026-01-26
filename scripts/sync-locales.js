const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '../src/messages');
const EN_PATH = path.join(MESSAGES_DIR, 'en.json');

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Deep merges source into target, only adding missing keys.
 */
function deepMerge(target, source, stats) {
  const output = { ...target };
  if (isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target) || !isObject(target[key])) {
          output[key] = source[key];
          stats.added++;
        } else {
          const subStats = { added: 0 };
          output[key] = deepMerge(target[key], source[key], subStats);
          stats.added += subStats.added;
        }
      } else {
        if (!(key in target)) {
          output[key] = source[key];
          stats.added++;
        }
      }
    });
  }
  return output;
}

try {
  const en = JSON.parse(fs.readFileSync(EN_PATH, 'utf8'));
  const files = fs.readdirSync(MESSAGES_DIR).filter(f => f.endsWith('.json') && f !== 'en.json');

  console.log('🌍 Synchronizing i18n locales from en.json...');

  files.forEach(file => {
    const filePath = path.join(MESSAGES_DIR, file);
    const localeData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const stats = { added: 0 };

    // Merge EN keys into the target locale
    const syncedData = deepMerge(localeData, en, stats);

    fs.writeFileSync(filePath, JSON.stringify(syncedData, null, 2) + '\n');
    if (stats.added > 0) {
      console.log(`✅ ${file}: Added ${stats.added} missing keys.`);
    } else {
      console.log(`✅ ${file}: Already in sync.`);
    }
  });

  console.log('✨ All locales synced successfully.');
} catch (error) {
  console.error('❌ Sync failed:', error.message);
  process.exit(1);
}
