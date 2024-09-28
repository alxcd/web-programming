document.addEventListener('DOMContentLoaded', () => {
  loadContent('components/head.html', 'head-placeholder');
  loadContent('components/menu.html', 'side-header', addMenuEventListeners);
  loadContent('components/main.html', 'main-content');
});

function addMenuEventListeners() {
  document.getElementById('main-link').addEventListener('click', () => loadContent('components/main.html', 'main-content'));
  document.getElementById('examples-link').addEventListener('click', () => loadContent('components/examples.html', 'main-content'));
  document.getElementById('exercises-link').addEventListener('click', () => loadContent('components/exercises.html', 'main-content'));
}

let loadedScripts = [];

function loadContent(url, id, callback) {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      const container = document.getElementById(id);
      container.innerHTML = data;
      unloadScripts();
      executeScripts(container);
      if (callback) callback();
    })
    .catch(error => console.error('Error loading content:', error));
}


// down the rabbit hole I went with it...

function executeScripts(container) {
  const scripts = container.getElementsByTagName('script');
  for (let script of scripts) {
    const newScript = document.createElement('script');
    if (script.src) {
      if (!document.querySelector(`script[src="${script.src}"]`)) {
        newScript.src = script.src;
        console.log(`Loading script: ${script.src}`);
        loadedScripts.push(newScript);
        document.head.appendChild(newScript);
      } else {
        console.log(`Script already loaded: ${script.src}`);
      }
    } else {
      newScript.text = script.innerHTML;
      document.head.appendChild(newScript);
    }
  }
}

function unloadScripts() {
  for (let script of loadedScripts) {
    document.head.removeChild(script);
    console.log(`Unloading script: ${script.src}`);
  }
  loadedScripts = [];
  resetGlobalVariables();
}

function resetGlobalVariables() { // it doesn't clear Rd - just let it be then...
  const globalVariables = ['Rd'];
  delete window['Rd'];

  globalVariables.forEach(variable => {
    if (window[variable] !== undefined) {
      console.log(`Resetting global variable: ${variable}`);
      delete window[variable];
    }
  });
}