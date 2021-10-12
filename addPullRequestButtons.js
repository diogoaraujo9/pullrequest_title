(() => {
    let prButton = document.getElementById("__bolt-create-pr");
    let buttonsContainer = prButton && prButton.parentNode;

    let alreadyAdded = document.getElementById("__bolt-create-pr-beta");

    if (!alreadyAdded && prButton && buttonsContainer) {
        createPrButtons(prButton, buttonsContainer);
        createHotfixInput(prButton.href, buttonsContainer);
        listenEventsToCreateMessageButtons();
    }    
})();

function listenEventsToCreateMessageButtons() {
    try {
        let messageCard = document.getElementsByClassName("bolt-messagecard");

        if (messageCard && messageCard.length) {
            createMessageButtons();
        }
        else {
            let pageContent = document.getElementsByClassName("page-content")[0];
            MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    
            var observer = new MutationObserver(function(mutations, observer) {
                createMessageButtons();
            });
    
            observer.observe(pageContent, {
                subtree: true,
                attributes: true,
                childList: true
            });
        }    
    }
    catch(err) {
        console.error(err);
    }      
};

function createMessageButtons() {
    let messageCard = document.getElementsByClassName("bolt-messagecard");
    let alreadyAddedButton = document.getElementById("hotfixButton");

    if (!alreadyAddedButton && messageCard && messageCard.length) {
        let buttons = document.getElementsByClassName("bolt-link-button");
        let buttonsContainer = document.getElementsByClassName("bolt-messagebar-buttons");

        if (buttons && buttons.length && buttonsContainer && buttonsContainer.length) {
            let hotfixButton = document.createElement("button");
            hotfixButton.id = "hotfixButton";
            hotfixButton.className = "bolt-header-command-item-button bolt-button enabled bolt-focus-treatment";
            hotfixButton.innerHTML = "Create Hotfix";

            let cardButton = buttons[buttons.length - 1];
            let originalHref = cardButton.href.split("targetRef=master")[0];

            hotfixButton.addEventListener('click', function (e) {
                openInNewTab(originalHref + "&targetRef=stable");
                openInNewTab(originalHref + "&targetRef=beta");
                openInNewTab(originalHref + "&targetRef=master");
                e.stopPropagation();
            });

            buttonsContainer[0].prepend(hotfixButton);
        }
    }
};

function createPrButtons(originalPrButton, container) {
    try {
        let betaPrButton = originalPrButton.cloneNode(true);

        betaPrButton.href = betaPrButton.href + "?sourceRef=beta&targetRef=stable";
        betaPrButton.id = "__bolt-create-pr-beta";
        betaPrButton.children[0].innerText = "Beta > Stable";        
        
        container.prepend(betaPrButton);
    
        let masterPrButton = originalPrButton.cloneNode(true);
        masterPrButton.href = masterPrButton.href + "?sourceRef=master&targetRef=beta";
        masterPrButton.id = "__bolt-create-pr-master";
        masterPrButton.children[0].innerText = "Master > Beta";
        
        container.prepend(masterPrButton);

        let mainPrButton = originalPrButton.cloneNode(true);
        mainPrButton.href = mainPrButton.href + "?sourceRef=main&targetRef=beta";
        mainPrButton.id = "__bolt-create-pr-main";
        mainPrButton.children[0].innerText = "Main > Beta";
        
        container.prepend(mainPrButton);
    }
    catch(err) {
        console.error(err);
    }    
};

function createHotfixInput(originalHref, container) {
    try {
        let searchInput = document.getElementById("l1-search-input");

        if (searchInput) {
            let hotfixInput = searchInput.cloneNode(true);
            hotfixInput.setAttribute("style", `align-self: stretch;
                                                background: transparent;
                                                overflow: hidden;
                                                border-color: #A19F9D;
                                                border: 1px solid;
                                                width: 250px;
                                                color: var(--nav-header-text-primary-color,rgba(0, 0, 0, .9));
                                                border-radius: 2px;
                                                padding-left: 10px;`);

            hotfixInput.setAttribute("placeholder", "Nome da branch e aperte enter");

            container.prepend(hotfixInput);

            hotfixInput.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') {
                    openInNewTab(originalHref + "?sourceRef=" + hotfixInput.value + "&targetRef=stable");
                    openInNewTab(originalHref + "?sourceRef=" + hotfixInput.value + "&targetRef=beta");
                    openInNewTab(originalHref + "?sourceRef=" + hotfixInput.value + "&targetRef=master");
                }
            });

            let hotfixLabel = document.createElement("span");
            hotfixLabel.innerHTML = "Hotfix: ";
            hotfixLabel.className = "bolt-breadcrumb-item-text";

            container.prepend(hotfixLabel);
        }
    }
    catch(err) {
        console.error(err);
    }    
};

function openInNewTab(href) {
    Object.assign(document.createElement('a'), {
        target: '_blank',
        href: href,
    }).click();
};
