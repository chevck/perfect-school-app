# Schools App - Installation Instructions

## For macOS Users

Since this is a development build that isn't code-signed with an Apple Developer certificate, macOS Gatekeeper will show a warning. Here's how to install it:

### Method 1: Right-Click Installation (Recommended)
1. Download and open the DMG file
2. Instead of double-clicking the app, **right-click** on it
3. Select "Open" from the context menu
4. Click "Open" when prompted about the unsigned developer
5. The app will open and be added to your allowed applications

### Method 2: System Preferences
1. Try to open the app normally (it will be blocked)
2. Go to **System Preferences** → **Security & Privacy** → **General**
3. You'll see a message about the blocked app
4. Click **"Open Anyway"**
5. Confirm by clicking **"Open"** in the dialog

### Method 3: Terminal Command (Advanced)
If you're comfortable with Terminal:
```bash
# Remove quarantine attribute
xattr -d com.apple.quarantine /Applications/Schools\ App.app

# Or for the DMG file before installation
xattr -d com.apple.quarantine schools-app-0.0.0-arm64.dmg
```

## Why This Happens
This warning appears because the app isn't signed with an Apple Developer certificate ($99/year). For production distribution, the app would need to be properly code-signed and notarized by Apple.

## The App is Safe
This is a legitimate application built from trusted source code. The warning is purely due to the lack of Apple's code signing certificate.
