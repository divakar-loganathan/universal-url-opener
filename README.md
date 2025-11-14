# Universal URL Opener 🚀

A sophisticated Chrome extension that revolutionizes URL navigation with intelligent pattern recognition and context-aware parsing. Transform any URL-based system into a productivity powerhouse for developers, IT professionals, and project managers.

## 🌟 Key Features

### Core Functionality
- **🎯 Universal Pattern Support**: Works with any URL system using base URL + identifier patterns
- **🧠 Smart URL Parsing**: Advanced extraction from complex URLs with priority-based pattern matching  
- **⚡ Context-Aware Processing**: Prevents namespace conflicts with intelligent project key generation
- **🎨 Real-Time Modal Editing**: Edit URLs with live preview and instant field updates
- **⌨️ Keyboard Shortcuts**: Quick access with `Alt+Shift+U` and `Alt+Shift+O`
- **🔒 Privacy-First Design**: No browsing history access, all data stored locally

### Advanced Capabilities
- **Multi-Priority Pattern Recognition**: Dash → Underscore → Dot → Alphanumeric → Numeric parsing
- **Complex Key Mapping**: Handles intricate project structures (e.g., `COMPANY_DEPT1_PROJ-1560`)
- **Original Prefix Storage**: Maintains URL construction accuracy for complex identifiers
- **Intelligent Auto-Selection**: Context-aware project switching based on input patterns
- **Real-Time Validation**: Live URL preview and extraction feedback

## 🎯 Supported Systems & Patterns

### Built-in System Support
| System | Example URL | Pattern | Input Format |
|--------|-------------|---------|--------------|
| **Jira** | `https://company.atlassian.net/browse/PROJ-123` | `PROJ-###` | `123` or `PROJ-123` |
| **GitHub** | `https://github.com/owner/repo/issues/456` | `####` | `456` or `#456` |
| **ServiceNow** | `https://instance.service-now.com/nav_to.do?uri=INC123456` | `INC######` | `123456` or `INC123456` |
| **Azure DevOps** | `https://dev.azure.com/org/project/_workitems/edit/789` | `###` | `789` |
| **Custom Systems** | `https://example.company.com/tickets/CUST-ABC-999` | `CUST-ABC-###` | `999` or `CUST-ABC-999` |

### Advanced Pattern Examples
- **Complex Keys**: `COMPANY_DEPT1_PROJ-1560` → Correctly maps to `PROJ-1560`
- **Namespace Resolution**: `ORG1_PROJECTS` vs `ORG1_FOCUS` → Context-aware differentiation
- **Multi-Level Structures**: `COMPANY_DEPT_PROJ-123` → Intelligent parsing

## 🛠️ Installation & Setup

### Option 1: Chrome Web Store (Coming Soon)
*The extension is ready for Chrome Web Store submission and will be available soon for one-click installation.*

### Option 2: GitHub Installation (Current)
1. Visit [Universal URL Opener on GitHub](https://github.com/divakar-loganathan/universal-url-opener)
2. Download or clone the repository
3. Follow the developer installation steps below
4. Use `Alt+Shift+U` to open instantly!

### Developer Installation
```bash
1. Download/clone this repository
2. Open Chrome → chrome://extensions/
3. Enable "Developer mode"
4. Click "Load unpacked" → Select folder
5. Ready to use!
```

## 📖 Usage Guide

### Quick Start (60 seconds)
1. **Open Extension**: Click icon or press `Alt+Shift+U`
2. **Add Pattern**: Switch to Settings → Paste any ticket URL
3. **Automatic Extraction**: Extension analyzes and creates pattern
4. **Start Using**: Switch to "Open URL" → Enter ticket number → Go!

### Adding URL Patterns
1. **Navigate to Settings tab**
2. **Paste full URL** (e.g., `https://company.atlassian.net/browse/PROJ-123`)
3. **Automatic Extraction**: System analyzes URL structure and patterns
4. **Confirmation Modal**: Review extracted info, edit if needed
5. **Add Display Name**: Optional user-friendly name
6. **Save Pattern**: Ready for instant use!

### Opening URLs
1. **Quick Open**: `Alt+Shift+O` → Focuses ticket input immediately
2. **Select Project**: Choose from dropdown or let auto-selection work
3. **Enter Identifier**: 
   - Simple: `123` → Expands to `PROJ-123`
   - Full: `PROJ-456` → Auto-switches to correct project
   - Complex: `PROJ-789` → Uses original prefix mapping
4. **Open**: Click button or press Enter

## ⌨️ Keyboard Shortcuts

| Shortcut | Action | Description |
|----------|--------|-------------|
| `Alt+Shift+U` | Open Extension | Quick access to main interface |
| `Alt+Shift+O` | Quick Ticket Entry | Opens with focus on ticket input |

> **Note**: Shortcuts are customizable via `chrome://extensions/shortcuts`

## 🧠 Advanced Features

### Context-Aware Project Resolution
- **Namespace Conflict Prevention**: Distinguishes between similar project keys
- **Domain + Path Analysis**: Uses full URL context for accurate identification
- **Priority-Based Parsing**: 5-tier pattern recognition for maximum accuracy

### Real-Time Modal Editing
- **Editable Original URLs**: Fix typos directly in confirmation modal
- **Live Field Updates**: Changes automatically reflect in all fields
- **Instant Preview**: See final URL before saving

### Smart Input Processing
```
Input: "123" → Output: "PROJ-123" (auto-expansion)
Input: "PROJ-456" → Switches to PROJ project, opens 456
Input: "PROJ-789" → Uses original prefix mapping for accurate URL
```

## 🔧 Configuration & Management

### Project Management
- **In-Place Editing**: Click project names to edit directly
- **Display Names**: Add user-friendly names for easy identification
- **Original Prefix Storage**: Maintains complex URL construction accuracy
- **Auto-Selection Logic**: Smart project switching based on input patterns

### Data Management
- **Export Settings**: Backup configurations to JSON
- **Import Settings**: Restore from backup files
- **Local Storage**: All data stored securely in browser
- **No External Dependencies**: Works completely offline

## 🎯 Real-World Use Cases

### Development Teams
```
Before: https://company.atlassian.net/browse/FRONTEND-1245
After:  Type "1245" → Instant open
```

### IT Support
```
Before: https://company.service-now.com/nav_to.do?uri=INC0012345
After:  Type "12345" → Direct navigation
```

### Project Management
```
Before: https://github.com/company/project/issues/789
After:  Type "#789" → Quick access
```

## 🔒 Privacy & Security

### Privacy Guarantees
- ✅ **Zero Data Collection**: No analytics, tracking, or external requests
- ✅ **Local Storage Only**: All settings stored in browser
- ✅ **Minimal Permissions**: Only storage access required
- ✅ **No Network Access**: Works completely offline
- ✅ **No Browsing History**: Cannot access or monitor browsing

### Security Features
- **Input Validation**: Prevents malicious URL injection
- **Pattern Sanitization**: Cleanses extracted patterns
- **Safe URL Construction**: Validates all generated URLs

## 🆘 Troubleshooting

### Common Solutions

**Pattern Not Detected?**
- Ensure URL contains clear identifier (numbers/letters)
- Check the 5-tier pattern priority system
- Try manual project key entry

**Extension Not Responding?**
- Reload extension: `chrome://extensions/` → Reload
- Check keyboard shortcuts: `chrome://extensions/shortcuts`
- Verify permissions are granted

**URL Opening Incorrectly?**
- Check original prefix mapping in settings
- Verify base URL is correctly extracted
- Use real-time modal editing to fix patterns

**Complex Keys Not Working?**
- Ensure original prefix is stored correctly
- Check namespace conflict resolution
- Review context-aware parsing logs

## 📊 Technical Architecture

### Pattern Recognition Engine
```javascript
Priority 1: Dash patterns (PROJ-123)
Priority 2: Underscore (PROJ_123)
Priority 3: Dot notation (PROJ.123)
Priority 4: Alphanumeric (PROJ123)
Priority 5: Numeric only (123)
```

### Context-Aware Processing
- **Domain Analysis**: Extracts base domain for context
- **Path Parsing**: Analyzes URL structure for accurate identification
- **Namespace Resolution**: Prevents conflicts between similar keys

### Smart Storage System
- **Original Prefix Mapping**: Preserves complex key structures
- **Context Preservation**: Maintains URL construction accuracy
- **Conflict Prevention**: Intelligent namespace management

## 📈 Version History

### Version 2.1 (Current)
- ✨ **Keyboard Shortcuts**: `Alt+Shift+U` and `Alt+Shift+O`
- ✨ **Real-Time Modal Editing**: Live URL editing with instant updates
- ✨ **Original URL Pre-filling**: Modal shows actual pasted URL
- 🔧 **Background Service Worker**: Enhanced shortcut handling
- 🧹 **Code Quality**: Removed debug logs, production-ready codebase

### Version 2.0 (Major Release)
- 🚀 **Context-Aware Parsing**: Namespace conflict resolution
- 🚀 **Complex Key Mapping**: Original prefix storage system
- 🚀 **Privacy Improvements**: Removed hardcoded project names
- 🚀 **Universal Pattern Support**: 5-tier recognition system
- 🚀 **Smart Auto-Selection**: Intelligent project switching

### Version 1.0 (Legacy)
- Basic Jira ticket opening
- Simple project management

## 🤝 Contributing & Development

**Author**: Divakar Loganathan  
**Version**: 2.1  
**License**: MIT  
**Repository**: [GitHub - Universal URL Opener](https://github.com/divakar-loganathan/universal-url-opener)

### Development Setup
```bash
git clone https://github.com/divakar-loganathan/universal-url-opener.git
cd universal-url-opener
# Load as unpacked extension in Chrome
```

### Future Possibilities

*This is a passion project developed in spare time. The following are potential enhancements that may be considered if time permits and community interest exists. No timeline or commitment is implied.*

**Potential Future Enhancements:**
- Team configuration sharing and collaborative workflows
- Advanced pattern templates for complex enterprise systems  
- Multi-browser sync capabilities
- Additional customizable keyboard shortcuts
- Bulk URL operations and batch processing

**Community Contributions Welcome!** If you're interested in implementing any of these features, pull requests are appreciated.

## ⚖️ Disclaimer

This extension is an independent project and is **not affiliated with, endorsed by, or sponsored by** any of the mentioned companies or services. All product and company names are trademarks™ or registered® trademarks of their respective holders.

**Mentioned services and their respective owners:**
- **Jira** - Trademark of Atlassian Pty Ltd.
- **GitHub** - Trademark of GitHub, Inc. (Microsoft Corporation)
- **ServiceNow** - Trademark of ServiceNow, Inc.
- **Azure DevOps** - Trademark of Microsoft Corporation
- **Chrome** - Trademark of Google LLC

This extension simply provides URL navigation functionality and does not modify, access, or interfere with the operation of these services. Use of their names is solely for descriptive purposes to indicate compatibility.

## 📄 License

MIT License - Copyright (c) 2025 Divakar Loganathan

Permission granted for personal and commercial use with attribution.

## 🏷️ Tags

`Chrome Extension` `URL Management` `Productivity` `Jira` `GitHub` `ServiceNow` `Development Tools` `IT Tools` `Project Management` `Ticket System` `Issue Tracking` `Workflow Automation` `Context-Aware` `Pattern Recognition`

---

**Universal URL Opener** - Transforming URL navigation with intelligent pattern recognition and context-aware processing for modern development workflows.

*⭐ Star this project on GitHub if it improves your productivity!*