/**
 * Universal URL Opener - Chrome Extension
 * 
 * A productivity extension that quickly opens URLs with base+identifier patterns.
 * Supports Jira, GitHub, ServiceNow, and any URL-based system.
 * 
 * @author Divakar Loganathan
 * @version 2.0
 * @license MIT
 * @created 2025
 */

document.addEventListener('DOMContentLoaded', function() {
  let projects = [];
  let selectedProject = null;
  
  // DOM Elements
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  const projectOptions = document.getElementById('projectOptions');
  const prefixElement = document.getElementById('prefix');
  const ticketNumber = document.getElementById('ticketNumber');
  const openTicketBtn = document.getElementById('openTicket');
  const newProjectKey = document.getElementById('newProjectKey');
  const newProjectUrl = document.getElementById('newProjectUrl');
  const newProjectName = document.getElementById('newProjectName');
  const addProjectBtn = document.getElementById('addProject');
  const projectsList = document.getElementById('projectsList');
  const exportBtn = document.getElementById('exportSettings');
  const importBtn = document.getElementById('importSettingsBtn');
  const importFile = document.getElementById('importSettings');
  const urlPreview = document.getElementById('urlPreview');
  const previewProject = document.getElementById('previewProject');
  const previewUrl = document.getElementById('previewUrl');
  const previewName = document.getElementById('previewName');
  
  // Initialize
  loadProjects();
  
  // Debug: Check if all elements are found
  console.log('DOM Elements Check:');
  console.log('addProjectBtn:', addProjectBtn);
  console.log('newProjectKey:', newProjectKey);
  console.log('newProjectUrl:', newProjectUrl);
  console.log('newProjectName:', newProjectName);
  console.log('projectsList:', projectsList);
  
  // Add real-time URL preview
  if (newProjectUrl) {
    newProjectUrl.addEventListener('input', updatePreview);
  }
  
  if (newProjectName) {
    newProjectName.addEventListener('input', updatePreview);
  }
  
  function updatePreview() {
    const urlInput = newProjectUrl.value.trim();
    const nameInput = newProjectName.value.trim();
    
    if (urlInput && isValidUrl(urlInput)) {
      const extractedInfo = extractProjectInfo(urlInput);
      if (extractedInfo) {
        // Show confirmation modal instead of auto-preview
        showConfirmationModal(extractedInfo, nameInput || generateDisplayName(extractedInfo.projectKey));
        // Clear inputs since modal will handle the process
        setTimeout(() => {
          newProjectUrl.value = '';
          newProjectKey.value = '';
          newProjectName.value = '';
          urlPreview.style.display = 'none';
          addProjectBtn.disabled = true;
          addProjectBtn.textContent = '+ Add Pattern';
        }, 100);
        return;
      }
    }
    
    // If no valid extraction, hide preview and disable button
    urlPreview.style.display = 'none';
    addProjectBtn.disabled = true;
    addProjectBtn.textContent = '+ Add Pattern';
  }
  
  // Function to disable add button
  function disableAddButton() {
    addProjectBtn.disabled = true;
    addProjectBtn.textContent = '+ Add Pattern';
  }
  
  // Function to reset add button appearance
  function resetAddButton() {
    addProjectBtn.disabled = true;
    addProjectBtn.textContent = '+ Add Pattern';
  }
  
  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const tabName = this.dataset.tab;
      console.log('Switching to tab:', tabName); // Debug log
      
      // Update tab appearance
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(tc => tc.classList.remove('active'));
      
      this.classList.add('active');
      const targetTab = document.getElementById(tabName + 'Tab');
      if (targetTab) {
        targetTab.classList.add('active');
        console.log('Activated tab:', tabName + 'Tab'); // Debug log
      } else {
        console.error('Tab not found:', tabName + 'Tab'); // Debug log
      }
      
      // Focus on ticket input when switching to opener tab
      if (tabName === 'opener' && selectedProject) {
        setTimeout(() => ticketNumber.focus(), 100);
      }
    });
  });
  
  // Add project functionality
  if (addProjectBtn) {
    addProjectBtn.addEventListener('click', function() {
      console.log('Add project button clicked'); // Debug log
      
      try {
        let key = newProjectKey.value.trim().toUpperCase();
        let urlInput = newProjectUrl.value.trim();
        let displayName = newProjectName.value.trim();
        
        console.log('Original input - Key:', key, 'URL:', urlInput, 'Name:', displayName); // Debug log
        
        if (!urlInput) {
          alert('Please enter a URL');
          return;
        }
        
        // Extract project key and base URL from full URL
        const extractedInfo = extractProjectInfo(urlInput);
        
        if (!extractedInfo) {
          alert('Invalid URL format. Please enter a valid URL with an identifier pattern.');
          return;
        }
        
        // Use extracted project key if none provided by user
        if (!key) {
          key = extractedInfo.projectKey;
        }
        
        // Use project key as display name if none provided
        if (!displayName) {
          displayName = key;
        }
        
        const baseUrl = extractedInfo.baseUrl;
        
        console.log('Processed - Key:', key, 'Base URL:', baseUrl, 'Display Name:', displayName); // Debug log
        
        if (!key) {
          alert('Could not extract pattern key from URL. Please enter it manually.');
          return;
        }
        
        if (!/^[A-Z0-9]+$/.test(key)) {
          alert('Pattern key should only contain letters and numbers');
          return;
        }
        
        // Check for duplicates
        if (projects.some(p => p.key === key)) {
          if (!confirm(`Pattern "${key}" already exists. Do you want to update it?`)) {
            return;
          }
          // Update existing project
          const existingProject = projects.find(p => p.key === key);
          existingProject.url = baseUrl;
          existingProject.displayName = displayName;
          selectedProject = existingProject; // Auto-select updated project
        } else {
          // Add new project
          const newProject = { key, url: baseUrl, displayName };
          projects.push(newProject);
          selectedProject = newProject; // Auto-select newly added project
        }
        
        console.log('Project processed:', { key, url: baseUrl, displayName }); // Debug log
        console.log('All projects:', projects); // Debug log
        
        // Clear inputs
        newProjectKey.value = '';
        newProjectUrl.value = '';
        newProjectName.value = '';
        
        // Hide preview and reset button
        urlPreview.style.display = 'none';
        resetAddButton();
        
        // Save and refresh
        saveProjects();
        renderProjects();
        renderProjectsList();
        console.log('Project saved and rendered successfully'); // Debug log
        
        // Show success message
        alert(`Pattern "${displayName}" (${key}) added/updated successfully!`);
        
      } catch (error) {
        console.error('Error in add project:', error);
        alert('Error adding pattern: ' + error.message);
      }
    });
  } else {
    console.error('Add project button not found!');
  }
  
  // Function to extract project information from full URL
  function extractProjectInfo(fullUrl) {
    console.log('Extracting info from URL:', fullUrl); // Debug log
    
    try {
      // Parse the URL
      const url = new URL(fullUrl);
      const pathname = url.pathname;
      const search = url.search;
      
      // Common URL patterns to extract identifier and base:
      let extractedInfo = null;
      
      // Pattern 1: /browse/PROJECT-123 (Jira)
      let match = pathname.match(/\/browse\/([A-Z0-9]+-\d+)/i);
      if (match) {
        const ticketId = match[1];
        const projectKey = ticketId.split('-')[0].toUpperCase();
        const baseUrl = `${url.protocol}//${url.host}/browse/`;
        extractedInfo = { projectKey, baseUrl, ticketId };
      }
      
      // Pattern 2: /issues/123 (GitHub)
      if (!extractedInfo) {
        match = pathname.match(/\/([^\/]+)\/([^\/]+)\/issues\/(\d+)/);
        if (match) {
          const [, owner, repo, issueNumber] = match;
          const projectKey = `${owner.toUpperCase()}-${repo.toUpperCase()}`;
          const baseUrl = `${url.protocol}//${url.host}/${owner}/${repo}/issues/`;
          extractedInfo = { projectKey, baseUrl, ticketId: issueNumber };
        }
      }
      
      // Pattern 3: ServiceNow-style nav_to.do?uri=INC123456
      if (!extractedInfo && search) {
        match = search.match(/uri=([A-Z]+)(\d+)/i);
        if (match) {
          const [, prefix, number] = match;
          const projectKey = prefix.toUpperCase();
          const baseUrl = `${url.protocol}//${url.host}${pathname}?uri=`;
          extractedInfo = { projectKey, baseUrl, ticketId: prefix + number };
        }
      }
      
      // Pattern 4: Context-aware extraction with domain + path segments
      if (!extractedInfo) {
        // Extract meaningful path context for unique project keys
        const pathSegments = pathname.split('/').filter(Boolean);
        const domain = url.hostname.replace('www.', '').split('.')[0]; // e.g., "test1" from "www.test1.com"
        
        // Priority 1: Dash delimited with context - /path/PREFIX-123
        match = pathname.match(/\/([A-Z0-9]+)-(\d+)(?:\/|$)/i);
        if (match) {
          const [fullMatch, prefix, number] = match;
          const contextPath = getContextFromPath(pathSegments, fullMatch);
          const projectKey = createContextualKey(domain, contextPath, prefix);
          const basePath = pathname.substring(0, pathname.indexOf(fullMatch) + 1);
          const baseUrl = `${url.protocol}//${url.host}${basePath}`;
          extractedInfo = { projectKey, baseUrl, ticketId: `${prefix}-${number}` };
        }
        
        // Priority 2: Underscore delimited with context - /path/PREFIX_123
        if (!extractedInfo) {
          match = pathname.match(/\/([A-Z0-9]+)_(\d+)(?:\/|$)/i);
          if (match) {
            const [fullMatch, prefix, number] = match;
            const contextPath = getContextFromPath(pathSegments, fullMatch);
            const projectKey = createContextualKey(domain, contextPath, prefix);
            const basePath = pathname.substring(0, pathname.indexOf(fullMatch) + 1);
            const baseUrl = `${url.protocol}//${url.host}${basePath}`;
            extractedInfo = { projectKey, baseUrl, ticketId: `${prefix}_${number}` };
          }
        }
        
        // Priority 3: Dot delimited with context - /path/PREFIX.123
        if (!extractedInfo) {
          match = pathname.match(/\/([A-Z0-9]+)\.(\d+)(?:\/|$)/i);
          if (match) {
            const [fullMatch, prefix, number] = match;
            const contextPath = getContextFromPath(pathSegments, fullMatch);
            const projectKey = createContextualKey(domain, contextPath, prefix);
            const basePath = pathname.substring(0, pathname.indexOf(fullMatch) + 1);
            const baseUrl = `${url.protocol}//${url.host}${basePath}`;
            extractedInfo = { projectKey, baseUrl, ticketId: `${prefix}.${number}` };
          }
        }
        
        // Priority 4: Alphanumeric with context - /path/PREFIX123
        if (!extractedInfo) {
          match = pathname.match(/\/([A-Z]+)(\d+)(?:\/|$)/i);
          if (match) {
            const [fullMatch, prefix, number] = match;
            const contextPath = getContextFromPath(pathSegments, fullMatch);
            const projectKey = createContextualKey(domain, contextPath, prefix);
            const basePath = pathname.substring(0, pathname.indexOf(fullMatch) + 1);
            const baseUrl = `${url.protocol}//${url.host}${basePath}`;
            extractedInfo = { projectKey, baseUrl, ticketId: `${prefix}${number}` };
          }
        }
        
        // Priority 5: Pure numeric with full context - /path/to/issues/1234
        if (!extractedInfo) {
          match = pathname.match(/\/(\d+)(?:\/|$)/);
          if (match) {
            const [fullMatch, number] = match;
            const pathBeforeNumber = pathname.substring(0, pathname.indexOf(fullMatch));
            const contextSegments = pathBeforeNumber.split('/').filter(Boolean);
            
            // Create unique key from domain + path context
            let contextParts = [domain];
            if (contextSegments.length > 0) {
              // Take last 2 path segments for context (e.g., "projects/ticket" or "focus/ticket")
              contextParts.push(...contextSegments.slice(-2));
            }
            
            const projectKey = contextParts.map(p => p.toUpperCase()).join('_');
            const baseUrl = `${url.protocol}//${url.host}${pathBeforeNumber}/`;
            extractedInfo = { projectKey, baseUrl, ticketId: number };
          }
        }
      }
      
      // Pattern 5: Last resort - try to find any alphanumeric pattern
      if (!extractedInfo) {
        match = fullUrl.match(/([A-Z0-9]{2,})-?(\d+)/i);
        if (match) {
          const [, prefix, number] = match;
          const projectKey = prefix.toUpperCase();
          // Create a generic base URL by removing the specific identifier
          const baseUrl = fullUrl.substring(0, fullUrl.lastIndexOf(match[0]));
          extractedInfo = { projectKey, baseUrl, ticketId: `${prefix}-${number}` };
        }
      }
      
      console.log('Extracted:', extractedInfo); // Debug log
      return extractedInfo;
      
    } catch (error) {
      console.error('Error parsing URL:', error);
      return null;
    }
  }
  
  // Helper function to extract context from path segments
  function getContextFromPath(pathSegments, fullMatch) {
    // Find the segment containing the ticket pattern
    for (let i = 0; i < pathSegments.length; i++) {
      if (fullMatch.includes(pathSegments[i])) {
        // Return the previous segment as context (e.g., "projects" or "focus")
        return i > 0 ? pathSegments[i - 1] : null;
      }
    }
    // If no direct match, take the last meaningful segment before the ticket
    return pathSegments.length > 1 ? pathSegments[pathSegments.length - 2] : null;
  }
  
  // Helper function to create contextual project key
  function createContextualKey(domain, contextPath, ticketPrefix) {
    const parts = [domain.toUpperCase()];
    
    if (contextPath) {
      parts.push(contextPath.toUpperCase());
    }
    
    if (ticketPrefix && ticketPrefix.toUpperCase() !== 'TICKET') {
      parts.push(ticketPrefix.toUpperCase());
    }
    
    // Join with underscore and limit length
    return parts.join('_').substring(0, 20); // Max 20 chars for readability
  }

  // Open ticket functionality
  openTicketBtn.addEventListener('click', openTicket);
  ticketNumber.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      openTicket();
    }
  });
  
  // Export/Import functionality
  exportBtn.addEventListener('click', function() {
    const settings = { projects, version: '1.0' };
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'jira-ticket-opener-settings.json';
    a.click();
    URL.revokeObjectURL(url);
  });
  
  importBtn.addEventListener('click', () => importFile.click());
  
  importFile.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const settings = JSON.parse(e.target.result);
        if (settings.projects && Array.isArray(settings.projects)) {
          projects = settings.projects;
          saveProjects();
          renderProjects();
          renderProjectsList();
          alert('Settings imported successfully!');
        } else {
          alert('Invalid settings file format');
        }
      } catch (error) {
        alert('Error reading settings file: ' + error.message);
      }
    };
    reader.readAsText(file);
    importFile.value = ''; // Reset file input
  });
  
  // Functions
  function loadProjects() {
    console.log('Loading projects from storage...'); // Debug log
    chrome.storage.sync.get(['jiraProjects', 'lastSelectedProject'], function(result) {
      if (chrome.runtime.lastError) {
        console.error('Storage load error:', chrome.runtime.lastError);
        alert('Error loading from storage: ' + chrome.runtime.lastError.message);
        return;
      }
      
      console.log('Loaded from storage:', result); // Debug log
      projects = result.jiraProjects || [];
      const lastSelected = result.lastSelectedProject;
      
      console.log('Projects loaded:', projects); // Debug log
      
      // Select last used project BEFORE rendering (if valid)
      if (lastSelected && projects.some(p => p.key === lastSelected)) {
        selectedProject = projects.find(p => p.key === lastSelected);
      }
      
      renderProjects();
      renderProjectsList();
    });
  }
  
  function saveProjects() {
    console.log('Saving projects:', projects); // Debug log
    try {
      chrome.storage.sync.set({ 
        jiraProjects: projects,
        lastSelectedProject: selectedProject?.key 
      }, function() {
        if (chrome.runtime.lastError) {
          console.error('Storage error:', chrome.runtime.lastError);
          alert('Error saving to storage: ' + chrome.runtime.lastError.message);
        } else {
          console.log('Projects saved successfully to storage');
        }
      });
    } catch (error) {
      console.error('Error in saveProjects:', error);
      alert('Error saving projects: ' + error.message);
    }
  }
  
  function renderProjects() {
    if (projects.length === 0) {
      projectOptions.innerHTML = '<div class="no-projects">No projects configured.<br>Go to Settings to add your Jira projects.</div>';
      ticketNumber.disabled = true;
      openTicketBtn.disabled = true;
      prefixElement.textContent = 'Select Project';
      selectedProject = null;
      return;
    }
    
    // Check if currently selected project still exists
    if (selectedProject && !projects.some(p => p.key === selectedProject.key)) {
      selectedProject = null; // Clear invalid selection
    }
    
    // Auto-select logic:
    // 1. If only one project exists, auto-select it
    // 2. If no project selected and multiple exist, don't auto-select
    if (projects.length === 1) {
      selectedProject = projects[0];
    }
    
    projectOptions.innerHTML = '';
    projects.forEach(project => {
      const option = document.createElement('div');
      option.className = 'project-option';
      option.dataset.project = project.key;
      
      // Format: "Display Name (PROJECT_KEY)" or just "PROJECT_KEY" if no display name
      const displayText = project.displayName && project.displayName !== project.key 
        ? `${project.displayName} (${project.key})`
        : project.key;
      
      option.innerHTML = `
        <input type="radio" name="project" class="project-radio" value="${project.key}">
        <div class="project-info">
          <div class="project-name">${displayText}</div>
          <div class="project-url">${project.url}</div>
        </div>
      `;
      
      option.addEventListener('click', function() {
        selectProject(project.key);
      });
      
      projectOptions.appendChild(option);
    });
    
    // Update UI based on selection state
    if (selectedProject) {
      // Update visual selection
      document.querySelectorAll('.project-option').forEach(option => {
        option.classList.remove('selected');
        const radio = option.querySelector('input[type="radio"]');
        radio.checked = false;
      });
      
      const selectedOption = document.querySelector(`[data-project="${selectedProject.key}"]`);
      if (selectedOption) {
        selectedOption.classList.add('selected');
        selectedOption.querySelector('input[type="radio"]').checked = true;
      }
      
      prefixElement.textContent = selectedProject.key + '-';
      ticketNumber.disabled = false;
      openTicketBtn.disabled = false;
      ticketNumber.focus();
    } else {
      // No project selected - but if we have projects, allow user to select
      if (projects.length > 1) {
        // Multiple projects available - user needs to select one
        prefixElement.textContent = 'Select Project';
        ticketNumber.disabled = false;
        openTicketBtn.disabled = false;
        ticketNumber.placeholder = 'Select a project first or type PROJ-123';
      } else {
        // No projects at all
        prefixElement.textContent = 'Select Project';
        ticketNumber.disabled = true;
        openTicketBtn.disabled = true;
        ticketNumber.placeholder = '123 or PROJ-123';
      }
    }
  }
  
  function renderProjectsList() {
    console.log('Rendering projects list, count:', projects.length); // Debug log
    
    if (projects.length === 0) {
      projectsList.innerHTML = '<div class="no-projects">No projects configured yet.</div>';
      return;
    }
    
    projectsList.innerHTML = '';
    projects.forEach((project, index) => {
      console.log('Rendering project:', project); // Debug log
      const item = document.createElement('div');
      item.className = 'project-item';
      item.innerHTML = `
        <div class="project-details">
          <div class="project-display-name" id="displayName-${index}">
            ${project.displayName || project.key}
            <span class="project-key-small">(${project.key})</span>
          </div>
          <input type="text" class="edit-name-input" id="editName-${index}" value="${project.displayName || project.key}" style="display: none;">
          <div class="project-base-url">${project.url}</div>
        </div>
        <div class="project-actions">
          <button class="edit-btn" id="editBtn-${index}">Edit</button>
          <button class="save-btn" id="saveBtn-${index}" style="display: none;">Save</button>
          <button class="cancel-btn" id="cancelBtn-${index}" style="display: none;">Cancel</button>
          <button class="delete-btn" id="deleteBtn-${index}">Delete</button>
        </div>
      `;
      
      // Add event listeners for edit functionality
      const editBtn = item.querySelector(`#editBtn-${index}`);
      const saveBtn = item.querySelector(`#saveBtn-${index}`);
      const cancelBtn = item.querySelector(`#cancelBtn-${index}`);
      const deleteBtn = item.querySelector(`#deleteBtn-${index}`);
      const displayNameDiv = item.querySelector(`#displayName-${index}`);
      const editInput = item.querySelector(`#editName-${index}`);
      
      editBtn.addEventListener('click', function() {
        displayNameDiv.style.display = 'none';
        editInput.style.display = 'block';
        editBtn.style.display = 'none';
        saveBtn.style.display = 'inline-block';
        cancelBtn.style.display = 'inline-block';
        editInput.focus();
        editInput.select();
      });
      
      saveBtn.addEventListener('click', function() {
        const newDisplayName = editInput.value.trim();
        if (newDisplayName) {
          projects[index].displayName = newDisplayName;
          saveProjects();
          renderProjects();
          renderProjectsList();
        }
      });
      
      cancelBtn.addEventListener('click', function() {
        editInput.value = project.displayName || project.key;
        displayNameDiv.style.display = 'block';
        editInput.style.display = 'none';
        editBtn.style.display = 'inline-block';
        saveBtn.style.display = 'none';
        cancelBtn.style.display = 'none';
      });
      
      deleteBtn.addEventListener('click', function() {
        const displayName = project.displayName || project.key;
        if (confirm(`Delete pattern "${displayName}" (${project.key})?`)) {
          // Check if we're deleting the currently selected project
          const wasSelected = selectedProject && selectedProject.key === project.key;
          
          projects.splice(index, 1);
          
          // Clear selection if we deleted the selected project
          if (wasSelected) {
            selectedProject = null;
          }
          
          saveProjects();
          renderProjects();
          renderProjectsList();
        }
      });
      
      // Handle Enter key in edit input
      editInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          saveBtn.click();
        } else if (e.key === 'Escape') {
          cancelBtn.click();
        }
      });
      
      projectsList.appendChild(item);
    });
  }
  
  function selectProject(projectKey) {
    const project = projects.find(p => p.key === projectKey);
    if (!project) return;
    
    selectedProject = project;
    
    // Update UI
    document.querySelectorAll('.project-option').forEach(option => {
      option.classList.remove('selected');
      const radio = option.querySelector('input[type="radio"]');
      radio.checked = false;
    });
    
    const selectedOption = document.querySelector(`[data-project="${projectKey}"]`);
    if (selectedOption) {
      selectedOption.classList.add('selected');
      selectedOption.querySelector('input[type="radio"]').checked = true;
    }
    
    prefixElement.textContent = projectKey + '-';
    saveProjects();
    ticketNumber.focus();
  }
  
  function openTicket() {
    let ticketInput = ticketNumber.value.trim();
    if (!ticketInput) {
      alert('Please enter a ticket number');
      ticketNumber.focus();
      return;
    }

    // Smart parsing logic
    let finalTicketId;
    let projectToUse = selectedProject;
    const allProjectKeys = projects.map(p => p.key);
    
    // Check if input already contains a project key
    let hasProjectKey = false;
    let detectedProject = null;
    
    // Method 1: Check for dash format first (PROJ-123)
    allProjectKeys.forEach(projectKey => {
      const dashPattern = new RegExp(`^${projectKey}-(\\d+)$`, 'i');
      const dashMatch = ticketInput.match(dashPattern);
      if (dashMatch && !hasProjectKey) {
        const ticketNumber = dashMatch[1];
        finalTicketId = `${projectKey}-${ticketNumber}`;
        detectedProject = projects.find(p => p.key === projectKey);
        hasProjectKey = true;
      }
    });
    
    // Method 2: Check for non-dash format (PROJ123) only if dash format not found
    if (!hasProjectKey) {
      // Sort by length (longest first) to avoid partial matches
      const sortedProjectKeys = [...allProjectKeys].sort((a, b) => b.length - a.length);
      
      sortedProjectKeys.forEach(projectKey => {
        const noDashPattern = new RegExp(`^${projectKey}(\\d+)$`, 'i');
        const noDashMatch = ticketInput.match(noDashPattern);
        if (noDashMatch && !hasProjectKey) {
          const ticketNumber = noDashMatch[1];
          // Convert to standard dash format for URL
          finalTicketId = `${projectKey}-${ticketNumber}`;
          detectedProject = projects.find(p => p.key === projectKey);
          hasProjectKey = true;
        }
      });
    }
    
    // If we detected a project, select it
    if (hasProjectKey && detectedProject) {
      projectToUse = detectedProject;
      // Update the selection in UI
      selectProject(detectedProject.key);
    }
    
    // If no project key detected and no project selected, ask user to select
    if (!hasProjectKey && !hasNonDashKey && !selectedProject) {
      alert('Please select a project first or enter a full ticket ID (e.g., PROJ-123 or PROJ123)');
      return;
    }
    
    // If no project key detected, use the selected project with the number
    if (!hasProjectKey && !hasNonDashKey && selectedProject) {
      // Remove any project prefix that might be incorrectly included
      let cleanNumber = ticketInput;
      allProjectKeys.forEach(projectKey => {
        const prefixPattern = new RegExp(`^${projectKey}-?`, 'i');
        cleanNumber = cleanNumber.replace(prefixPattern, '');
      });
      
      // Ensure we only have numbers
      cleanNumber = cleanNumber.replace(/[^0-9]/g, '');
      
      if (cleanNumber) {
        finalTicketId = `${selectedProject.key}-${cleanNumber}`;
        projectToUse = selectedProject;
      } else {
        // Invalid input
        ticketNumber.style.borderColor = 'red';
        setTimeout(() => {
          ticketNumber.style.borderColor = '#ccc';
        }, 2000);
        return;
      }
    }
    
    if (!projectToUse || !finalTicketId) {
      alert('Unable to determine project and ticket ID');
      return;
    }
    
    const url = `${projectToUse.url}${finalTicketId}`;
    chrome.tabs.create({ url: url });
    window.close();
  }
  
  // Helper function to validate URL
  function isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
  
  // Helper function to generate display name from project key
  function generateDisplayName(projectKey) {
    // Convert common patterns to readable names
    const commonNames = {
      'PROJ': 'Project',
      'INC': 'Incident',
      'TASK': 'Task',
      'BUG': 'Bug Report',
      'ISSUE': 'Issue',
      'ISSUES': 'Issues',
      'TICKET': 'Ticket',
      'REQ': 'Request'
    };
    
    return commonNames[projectKey.toUpperCase()] || projectKey;
  }
  
  // Helper function to add a project
  function addProject(key, displayName, baseUrl) {
    key = key.trim().toUpperCase();
    displayName = displayName.trim();
    baseUrl = baseUrl.trim();
    
    if (!key || !displayName || !baseUrl) {
      alert('All fields are required');
      return;
    }
    
    if (!/^[A-Z0-9]+$/.test(key)) {
      alert('Pattern key should only contain letters and numbers');
      return;
    }
    
    // Check for duplicates
    if (projects.some(p => p.key === key)) {
      if (!confirm(`Pattern "${key}" already exists. Do you want to update it?`)) {
        return;
      }
      // Update existing project
      const existingProject = projects.find(p => p.key === key);
      existingProject.url = baseUrl;
      existingProject.displayName = displayName;
      selectedProject = existingProject; // Auto-select updated project
    } else {
      // Add new project
      const newProject = { key, url: baseUrl, displayName };
      projects.push(newProject);
      selectedProject = newProject; // Auto-select newly added project
    }
    
    // Save and refresh
    saveProjects();
    renderProjects();
    renderProjectsList();
    
    // Show success message
    alert(`Pattern "${displayName}" (${key}) added/updated successfully!`);
  }
  
  // Confirmation Modal Functions
  function showConfirmationModal(extractedInfo, suggestedName) {
    const modal = document.getElementById('confirmModal');
    const projectKeyInput = document.getElementById('modalProjectKey');
    const projectNameInput = document.getElementById('modalProjectName');
    const baseUrlInput = document.getElementById('modalBaseUrl');
    const sampleUrl = document.getElementById('sampleUrl');
    
    // Pre-fill the modal with extracted data
    projectKeyInput.value = extractedInfo.projectKey;
    projectNameInput.value = suggestedName;
    baseUrlInput.value = extractedInfo.baseUrl;
    
    // Update sample URL
    updateSampleUrl();
    
    modal.style.display = 'flex';
    
    // Focus on project key for easy editing
    projectKeyInput.focus();
    projectKeyInput.select();
  }
  
  function updateSampleUrl() {
    const projectKey = document.getElementById('modalProjectKey').value;
    const baseUrl = document.getElementById('modalBaseUrl').value;
    const sampleUrl = document.getElementById('sampleUrl');
    
    if (projectKey && baseUrl) {
      const sampleTicket = projectKey.includes('-') ? `${projectKey}-123` : `${projectKey}123`;
      sampleUrl.textContent = baseUrl + sampleTicket;
    } else {
      sampleUrl.textContent = 'Sample will appear here...';
    }
  }
  
  function hideConfirmationModal() {
    const modal = document.getElementById('confirmModal');
    modal.style.display = 'none';
  }
  
  // Modal Event Listeners
  const confirmBtn = document.getElementById('confirmAdd');
  const cancelBtn = document.getElementById('cancelAdd');
  const modalProjectKey = document.getElementById('modalProjectKey');
  const modalBaseUrl = document.getElementById('modalBaseUrl');
  
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      const projectKey = document.getElementById('modalProjectKey').value.trim();
      const projectName = document.getElementById('modalProjectName').value.trim();
      const baseUrl = document.getElementById('modalBaseUrl').value.trim();
      
      if (projectKey && projectName && baseUrl) {
        // Add the project with confirmed data
        addProject(projectKey, projectName, baseUrl);
        hideConfirmationModal();
      }
    });
  }
  
  if (cancelBtn) {
    cancelBtn.addEventListener('click', hideConfirmationModal);
  }
  
  // Update sample URL when inputs change
  if (modalProjectKey) {
    modalProjectKey.addEventListener('input', updateSampleUrl);
  }
  if (modalBaseUrl) {
    modalBaseUrl.addEventListener('input', updateSampleUrl);
  }
  
  // Close modal when clicking outside
  const modal = document.getElementById('confirmModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        hideConfirmationModal();
      }
    });
  }
});