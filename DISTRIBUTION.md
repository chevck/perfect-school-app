# Schools App - Distribution Files

## Available Builds

### 📱 macOS (DMG)
- **File**: `dist/schools-app-0.0.0-arm64.dmg` (237 MB)
- **Architecture**: Apple Silicon (M1/M2/M3)
- **Installation**: See `INSTALL_INSTRUCTIONS.md` for Gatekeeper bypass steps

### 🖥️ Windows (Portable EXE)
- **File**: `dist/schools-app-windows-x64.zip` (1.4 GB)
- **Architecture**: x64 (64-bit)
- **Installation**: Extract ZIP, run `schools-app.exe`

## Build Commands

### For Developers

```bash
# Build for macOS (fixed for Gatekeeper issues)
npm run build:dmg

# Build for Windows (portable executable)
npm run build:win

# Build for both platforms
npm run build:all

# Development server
npm run dev
```

### Manual Commands

```bash
# macOS DMG
ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/ npm run build

# Windows Portable
ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/ CSC_IDENTITY_AUTO_DISCOVERY=false npx electron-builder --win --x64
```

## Distribution Notes

### macOS
- **Unsigned**: Uses development signing, requires Gatekeeper bypass
- **Size**: ~237 MB
- **Target**: DMG installer for Apple Silicon Macs

### Windows  
- **Unsigned**: No code signing certificate
- **Size**: ~1.4 GB (includes all dependencies)
- **Target**: Portable executable (no installation required)
- **Windows Defender**: May show warnings for unsigned executables

## Production Considerations

For production distribution:

### macOS
- Purchase Apple Developer account ($99/year)
- Code sign with Apple Developer certificate
- Notarize the app through Apple

### Windows
- Purchase code signing certificate
- Sign executable to avoid Windows Defender warnings
- Consider creating NSIS installer instead of portable

## File Structure

```
dist/
├── schools-app-0.0.0-arm64.dmg          # macOS installer
├── schools-app-0.0.0-arm64.dmg.blockmap # macOS update metadata
├── schools-app-windows-x64.zip          # Windows portable app
├── win-unpacked/                         # Windows app folder
│   ├── schools-app.exe                   # Windows executable
│   └── ... (supporting files)
└── mac-arm64/                           # macOS app bundle
    └── Schools App.app                   # macOS application
```

## Troubleshooting

### macOS "Damaged" Error
- Follow instructions in `INSTALL_INSTRUCTIONS.md`
- Use right-click → "Open" method

### Windows Security Warnings
- Click "More info" → "Run anyway" if Windows Defender blocks
- This is normal for unsigned executables

### Build Failures
- Network issues: The builds use mirror servers for better reliability
- Missing dependencies: Run `npm install` first
- Platform issues: Cross-platform builds work from macOS to Windows
