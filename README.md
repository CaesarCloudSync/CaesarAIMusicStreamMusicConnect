# CaesarAIElectron

Full electron, tailwindcss, vite ,typescript and react template

using electron-forge and customization 

Run with npm start

Compile into .deb or .rpm with:
npm run make

Using v18.19.0

# Deploying Images

Makes sure Image is 1000x1000 and square shaped. If logo is cirular. Use square background and make it transparent.

Add to main.ts:
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + '/images/CaesarAIMusicStream.svg',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    },
  });

Make sure that forge.config.ts looks like this:


const config: ForgeConfig = {
  packagerConfig: {
    icon: __dirname + '/images/CaesarAIMusicStream.svg' // no file extension required
  },
  rebuildConfig: {},
  makers: [new MakerSquirrel({}), new MakerZIP({}, ['darwin']), new MakerRpm({}), new MakerDeb({}),
  {
    name: '@electron-forge/maker-deb',
      config: {
        
        options: {
          icon:  __dirname + '/images/CaesarAIMusicStream.svg'
        }
    }
  }],
  plugins: [
    new VitePlugin({
      // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
      // If you are familiar with Vite configuration, it will look really familiar.
      build: [
        {
          // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
          entry: 'src/main.ts',
          config: 'vite.main.config.ts',
        },
        {
          entry: 'src/preload.ts',
          config: 'vite.preload.config.ts',
        },
      ],
      renderer: [
        {
          name: 'main_window',
          config: 'vite.renderer.config.ts',
        },
      ],
    }),
  ],
};

export default config;
