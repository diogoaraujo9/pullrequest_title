var itens = document.getElementsByClassName("vss-PickListDropdown--title-text");

if (itens && itens.length == 2)
{
    var source = itens[0].textContent;
    var target = itens[1].textContent;
    
    if (source && target)
    {
        var inputContainer = Array.from(document.getElementsByClassName("vc-pullRequestCreate-title-container"));

        if (inputContainer && inputContainer.length)
        {
            try
            {
                var input = inputContainer[0].children[0].children[0].children[1].children[0];
            
                if (input)
                {
                    var mergeTitle = formatTitle(source, target);
                    copyToClipboard(mergeTitle);

                    input.value = mergeTitle;
                    input.setAttribute("value", mergeTitle);
    
                    var inputEvent = new Event('input', { bubbles: true }); 
                    input.dispatchEvent(inputEvent);
                }
            }
            catch(err)
            {
                console.error(err);
            }
        }
    }
}
else
{
    itens = document.getElementsByClassName("bolt-dropdown-expandable-button-label");
    
    if (itens && itens.length >= 2)
    {
        var source = itens[itens.length - 2].textContent;
        var target = itens[itens.length - 1].textContent;
        
        if (source && target)
        {
            copyToClipboard(formatTitle(source, target));
            // var card = document.getElementsByClassName("bolt-card-content");
    
            // if (card && card.length)
            // {
            //     var input = card[0].querySelector("input[placeholder]")
            // }
        }
    }

}

function formatTitle(_source, _target)
{
    var source = _source == "beta" || _source == "master" || _source == "stable" || _source == "main" ? _source.toUpperCase() : _source;
    var target = _target == "beta" || _target == "master" || _target == "stable" || _target == "main" ? _target.toUpperCase() : _target; 

    var mergeTitle = `Merge ${source} into ${target}`;
    return mergeTitle;
}

function copyToClipboard(_text)
{
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = _text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}
