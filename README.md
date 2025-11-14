# Universal URL Opener

A Chrome extension that quickly opens URLs with base+identifier patterns. Works with Jira, GitHub, ServiceNow, and any URL-based system for improved productivity.

## 🚀 Features

- **Universal Pattern Support**: Works with any URL system that uses base URL + identifier pattern
- **Smart URL Parsing**: Automatically extracts patterns from full URLs - just paste and go
- **User-Friendly Display Names**: Add custom names to your URL patterns for easy identification
- **Intelligent Auto-Selection**: Automatically selects projects when appropriate
- **Multiple System Support**: Built-in support for Jira, GitHub, ServiceNow, and custom systems
- **Clean Permissions**: No browsing history access - privacy-focused design
- **Import/Export Settings**: Backup and share your configuration

## 📋 Supported URL Patterns

### Built-in Support:
- **Jira**: `https://company.atlassian.net/browse/PROJ-123`
- **GitHub Issues**: `https://github.com/owner/repo/issues/456`
- **ServiceNow**: `https://instance.service-now.com/nav_to.do?uri=INC123456`
- **Custom Systems**: Any URL with alphanumeric identifier patterns

### Pattern Examples:
- `PROJECT-123` format (Jira-style)
- `#123` format (GitHub-style)
- `INC123456` format (ServiceNow-style)
- `CUSTOM-789` format (Generic)

## 🛠️ Installation

### From Chrome Web Store (Recommended)
1. Visit the [Universal URL Opener on Chrome Web Store](chrome-web-store-link)
2. Click "Add to Chrome"
3. Confirm installation
4. The extension icon appears in your toolbar - ready to use!

*One-click installation, automatic updates, and full Chrome integration.*

### Manual Installation (For Developers/Testing)
1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The Universal URL Opener icon will appear in your toolbar

*Note: Manual installation is primarily for developers and testing. Regular users should install from the Chrome Web Store for the best experience.*

## 📖 Usage Guide

### Adding URL Patterns

1. **Click the extension icon** in your Chrome toolbar
2. **Go to Settings tab**
3. **Paste a full URL** with an identifier (e.g., `https://company.atlassian.net/browse/PROJ-123`)
4. **Add a display name** (optional, e.g., "Work Projects")
5. **Click "Add Pattern"**

The extension will automatically:
- Extract the base URL pattern
- Identify the project key/identifier format
- Create a reusable URL pattern

### Opening URLs

1. **Click the extension icon**
2. **Select your URL pattern** from the list
3. **Enter just the identifier** (e.g., `123` or `PROJ-123`)
4. **Click "Open URL"** or press Enter

### Smart Input Features

- **Just numbers**: Enter `123` → Opens as `PROJ-123`
- **Full identifier**: Enter `PROJ-456` → Opens correctly even if different project
- **Auto-detection**: Switches to correct project if identifier contains project key

## ⚙️ Configuration

### Display Names
- Add user-friendly names to your URL patterns
- Edit names in-place from the Settings tab
- Format in dropdown: `Display Name (PROJECT_KEY)`

### Import/Export
- **Export**: Backup your URL patterns to a JSON file
- **Import**: Restore settings from a backup file
- Perfect for sharing configurations across devices

## 🔧 Technical Details

### Permissions
- **Storage**: Save your URL patterns locally
- **No browsing history access**: Privacy-focused design
- **No additional site access**: Minimal permissions for security

### Browser Compatibility
- **Chrome** (88+) - Full support ✓
- **Microsoft Edge** (88+) - Full support ✓
- **Opera** (74+) - Full support ✓
- **Brave Browser** - Full support ✓
- **Other Chromium-based browsers** - Full support ✓
- **Firefox** - Not compatible (requires separate Firefox version)*
- **Safari** - Not compatible (different extension system)*

*Firefox and Safari versions would require separate development due to different extension APIs and manifest formats.

## 🎯 Use Cases

### Development Teams
- Quick access to Jira tickets: `PROJ-123`
- GitHub issue navigation: `#456`
- Pull request links: `PR-789`

### IT/Support Teams
- ServiceNow incidents: `INC123456`
- Service requests: `REQ789012`
- Change requests: `CHG345678`

### Project Management
- Task tracking systems
- Bug reporting tools
- Custom workflow systems

## 🚀 Getting Started

### Quick Setup (2 minutes)
1. **Install** the extension
2. **Paste a sample URL** (e.g., copy a Jira ticket URL from your browser)
3. **Add a display name** (e.g., "Work Tickets")
4. **Test it**: Enter just the ticket number and click Open

### Pro Tips
- **Use descriptive display names**: "Customer Support Tickets" instead of just "SUP"
- **Add multiple patterns**: Different Jira instances, GitHub repos, etc.
- **Export your settings**: Backup configurations before major changes

## 🔒 Privacy & Security

- **No data collection**: All settings stored locally in your browser
- **No external requests**: Extension works entirely offline
- **Minimal permissions**: Only storage access required
- **No tracking**: No analytics or usage monitoring

## 🆘 Troubleshooting

### Common Issues

**URL pattern not detected?**
- Ensure the URL contains a clear identifier pattern
- Try entering the pattern key manually
- Check the "Example URL Patterns" section for supported formats

**Extension not working?**
- Reload the extension from `chrome://extensions/`
- Check that the extension is enabled
- Verify URL patterns are correctly configured

**Settings not saving?**
- Check Chrome storage permissions
- Try export/import to backup settings
- Reload the extension if issues persist

### Getting Help
- Check the "Example URL Patterns" in the Settings tab
- Ensure URLs follow base+identifier pattern
- Test with simple examples first (Jira, GitHub)

## 📈 Version History

### Version 2.0 (Current)
- Universal URL pattern support
- Smart auto-selection logic
- User-friendly display names
- Clean permissions (no browsing history)
- Import/export functionality
- Enhanced UI with tabbed interface

### Version 1.0 (Legacy)
- Basic Jira ticket opening
- Simple project management

## 🤝 Contributing & Credits

**Created by:** Divakar Loganathan  
**Version:** 2.0  
**Year:** 2025  

This extension was developed to solve real productivity challenges in development and IT workflows. Feedback and suggestions are welcome!

### Future Enhancements
- Additional built-in system support
- Custom URL templates
- Keyboard shortcuts
- Team sharing features

## 📄 License

MIT License - Created by Divakar Loganathan (2025)

This extension is provided as-is for productivity enhancement. Feel free to modify for personal use.

**Attribution:** Please maintain credit to the original creator when sharing or modifying this extension.

## 🏷️ Keywords

Chrome Extension, URL Opener, Jira, GitHub, ServiceNow, Productivity, Development Tools, Project Management, Ticket System, Issue Tracking, Workflow Automation

---

*Universal URL Opener - Making URL navigation simple and fast for developers, IT professionals, and project managers.*