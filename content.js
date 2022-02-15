var loadFrame = () => {
    var Chatcard = `
        <div class="Anubispanel Panelreact__DivContainer-sc-1uztusg-0 ejFaWs Panel--alwaysOpen Panel--isOpen Panel--isFramed" data-testid="Panel">
        <div class="BasePanelreact__DivContainer-sc-1d6z6bk-0 hypfZU Panel--panel"><button class="UnstyledButtonreact__UnstyledButton-sc-ty1bh0-0 btgkrL BasePanel--header Panel--header" aria-controls="Body react-aria-2" aria-expanded="true" id="Header react-aria-1" type="button"><span>Anubis</span></button>
            <div class="BasePanel--body Panel--body" aria-labelledby="Header react-aria-1" id="Body react-aria-2" role="region">
                <div class="Panel--content-container" style="height: initial; max-height: 200px; overflow: invisble;">
                    <div class="Panel--isContentPadded item--description">
    

                        <div class="Blockreact__Block-sc-1xf18x6-0 dBFmez item--description-text"><div class="Anubischat"><span>Anubis.<ul class="AnubisText"></ul></span><</div></div>
    
    
                        <div class="Inputreact__StyledContainer-sc-3dr67n-0 fOXING MailingSignupForm--input" style="margin-bottom: 20px;"><input class="Anubisvalue" aria-invalid="false" style="cursor:text" placeholder="Enter" value=""></div>
    
    
    
    
                        <button width="100%" type="button" class="Anubisbutton Blockreact__Block-sc-1xf18x6-0 Buttonreact__StyledButton-sc-glfma3-0 kmCSYg gIDfxn"><div aria-hidden="true" class="Blockreact__Block-sc-1xf18x6-0 Flexreact__Flex-sc-1twd32i-0 cwzTQS jYqxGr"></div>Send</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;

    if (document.getElementsByClassName('Anubispanel').length <= 0) {
        document.getElementsByClassName('item--summary-frame')[0].insertAdjacentHTML('beforebegin', Chatcard);
    }
}

function rafAsync() {
    return new Promise(resolve => {
        requestAnimationFrame(resolve); //faster than set time out
    });
}

function checkElement(selector) {
    if (document.querySelector(selector) === null) {
        return rafAsync().then(() => checkElement(selector));
    } else {
        return Promise.resolve(true);
    }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === 'TabUpdated') {
        if (document.location.href.includes('https://opensea.io/assets/')) {
            checkElement('.item--summary-frame') //use whichever selector you want
                .then((element) => {
                    loadFrame();
                });
        }
    }
})