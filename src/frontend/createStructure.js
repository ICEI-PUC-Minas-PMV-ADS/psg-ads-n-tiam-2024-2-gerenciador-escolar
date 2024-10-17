const fs = require('fs');
const path = require('path');

const directories = [
  'assets/images',
  'assets/fonts',
  'components/Button',
  'components/Input',
  'context',
  'navigation',
  'screens/Auth',
  'screens/Class',
  'screens/Profile',
  'services',
  'styles',
  'utils'
];

const files = [
  'App.js',
  'index.js',
  'context/AuthContext.js',
  'context/ClassContext.js',
  'services/AuthService.js',
  'services/StudentService.js',
  'services/ClassService.js',
  'styles/colors.js',
  'styles/fonts.js',
  'styles/globalStyles.js'
];

// Create directories
directories.forEach(dir => {
  fs.mkdirSync(path.join(__dirname, dir), { recursive: true });
});

// Create files
files.forEach(file => {
  fs.writeFileSync(path.join(__dirname, file), '', { flag: 'w' });
});

console.log('Estrutura de pastas criada com sucesso!');
