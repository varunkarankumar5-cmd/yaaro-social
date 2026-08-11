const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const outputDir = path.join(projectRoot, 'static-build');

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: projectRoot,
      env: {
        ...process.env,
        NODE_ENV: 'production',
        EXPO_PUBLIC_DOMAIN:
          process.env.REPLIT_INTERNAL_APP_DOMAIN ||
          process.env.REPLIT_DEV_DOMAIN ||
          process.env.EXPO_PUBLIC_DOMAIN ||
          '',
      },
      stdio: 'inherit',
    });

    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Expo web export exited with code ${code}`));
    });
  });
}

async function main() {
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true });
  }

  await run('pnpm', [
    'exec',
    'expo',
    'export',
    '--platform',
    'web',
    '--output-dir',
    'static-build',
    '--clear',
  ]);

  if (!fs.existsSync(path.join(outputDir, 'index.html'))) {
    throw new Error('Expo web export did not produce static-build/index.html');
  }

  console.log(`Web export ready in ${outputDir}`);
}

main().catch((error) => {
  console.error('Web build failed:', error.message);
  process.exit(1);
});