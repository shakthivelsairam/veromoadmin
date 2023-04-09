/*eslint-disable */
/* ---------------------------------------- /*
    VA ASIC WIDGET FOR ONCE FORM
/* ---------------------------------------- */
function runVaAsicWidget() {

    var isDebug                         = false;
    var isPageLoad                      = true;
    var allowAutocompleteForCategory    = true;

    ctlIsMainPartyBusinessActivity_YES  = jQuery('#ctl00_sitecontent_ctlPartyEntityLocationBusinessActivity_ctlIsMainPartyBusinessActivity_rblYesNo_0');
    ctlIsMainPartyBusinessActivity_NO   = jQuery('#ctl00_sitecontent_ctlPartyEntityLocationBusinessActivity_ctlIsMainPartyBusinessActivity_rblYesNo_1');

    txtDescribeMainBusinessAcitivty     = jQuery('#ctl00_sitecontent_ctlPartyEntityLocationBusinessActivity_txtDescribeMainBusinessAcitivty');
    txtPredominantActivitySelection     = jQuery('#ctl00_sitecontent_ctlPartyEntityLocationBusinessActivity_txtPredominantActivitySelection');

    lblMainIndustryCode                 = jQuery('#ctl00_sitecontent_ctlPartyEntityLocationBusinessActivity_lblMainIndustryCode');
    BICCodeHidden                       = jQuery('#ctl00_sitecontent_ctlPartyEntityLocationBusinessActivity_BICCodeHidden');
    BICDescriptionHidden                = jQuery('#ctl00_sitecontent_ctlPartyEntityLocationBusinessActivity_BICDescriptionHidden');
    ANZSICDescriptionHidden             = jQuery('#ctl00_sitecontent_ctlPartyEntityLocationBusinessActivity_ANZSICDescriptionHidden');
    ANZSICCodeHidden                    = jQuery('#ctl00_sitecontent_ctlPartyEntityLocationBusinessActivity_ANZSICCodeHidden');
    ANZSICDescriptionHidden             = jQuery('#ctl00_sitecontent_ctlPartyEntityLocationBusinessActivity_ANZSICDescriptionHidden');
    MainActivtityDescriptionHidden      = jQuery('#ctl00_sitecontent_ctlPartyEntityLocationBusinessActivity_MainActivtityDescriptionHidden');

    BICCodeControl                      = jQuery('#ctl00_sitecontent_ctlPartyEntityLocationBusinessActivity_txtBICCode');

    if( !BICCodeControl.length )
    {
        BICCodeControl = jQuery('<input>');
        BICCodeControl.val( BICCodeHidden.val() );
    }

    BICDescriptionControl               = jQuery('#ctl00_sitecontent_ctlPartyEntityLocationBusinessActivity_lblBICDescription');
    ANZSICCodeControl                   = jQuery('#ctl00_sitecontent_ctlPartyEntityLocationBusinessActivity_lblANZSICCode');
    ANZSICDescriptionControl            = jQuery('#ctl00_sitecontent_ctlPartyEntityLocationBusinessActivity_lblANZSICDescription');

    SearchHistory                       = jQuery('#ctl00_sitecontent_ctlPartyEntityLocationBusinessActivity_SearchHistory');
    RecentIndexHidden                   = jQuery('#ctl00_sitecontent_ctlPartyEntityLocationBusinessActivity_RecentIndex');

    if( allowAutocompleteForCategory )
    {
        var anzsiclookupobj = txtPredominantActivitySelection.anzsiclookup({

            width:              null,
            recentItems:        [],
            debugMode:          isDebug,
            debugElement:       jQuery('#debug'),
            onCodeChanged:      function( code, activityIndex, activityDescription )
            {
                var paddedCode = addLeadingZeros( String( code || '' ), 5 );

                if( activityIndex != undefined )
                {
                    RecentIndexHidden.val( activityIndex );
                }

                if( code != undefined )
                {
                    if( !isPageLoad || BICCodeControl.val() == '' || ctlIsMainPartyBusinessActivity_YES.attr('checked') == 'checked' )
                    {
                        BICCodeControl.val( paddedCode );
                        MainActivtityDescriptionHidden.val( activityDescription );
                    }
                }
                else
                {
                    BICCodeControl.val('');
                    MainActivtityDescriptionHidden.val('');
                }

                OnBicChanged();
                isPageLoad = false;
            },
            historyElement:     SearchHistory,
            showRecentElement:  ctlIsMainPartyBusinessActivity_YES,
            selectMessage:      "Select the category",
            blankSearchInstructionText: "You must describe the main business activity above",
            noResultsInstructionText:   "No categories found, please enter a different description above.",
            selectedIndexElement:       jQuery('#ctl00_sitecontent_ctlPartyEntityLocationBusinessActivity_SelectedIndex'),
            searchTextElement:  txtDescribeMainBusinessAcitivty

        });

        ctlIsMainPartyBusinessActivity_YES.on( 'change', function( event ){

            txtDescribeMainBusinessAcitivty.val('Same as previously described activity');
            txtDescribeMainBusinessAcitivty.prop( 'disabled', true );

        } );

        ctlIsMainPartyBusinessActivity_NO.on( 'change', function(){

            txtDescribeMainBusinessAcitivty.val('');
            txtDescribeMainBusinessAcitivty.prop( 'disabled', false );
            txtPredominantActivitySelection.val('Select the category');
            anzsiclookupobj.anzsiclookup('SetSelectedIndex');

        } );
    }

    BICCodeControl.bind( 'textchange', OnBicChanged );
    BICCodeControl.bind( 'keyup', OnBicChanged );
    BICCodeControl.bind( 'change', OnBicChanged );

    if( isDebug )
    {
        jQuery('#debug').show();
    }

    if( BICCodeHidden.val() != '' )
    {
        OnBicChanged();
    }

    yes_radioLocation = jQuery('input[id$="LocationMoreThanOneBusinessLocation_rblYesNo_0"]');
    yes_radioLocation.on( 'change', function( event ){ jQuery('#BussinessActivityUserControl').hide(); } );

    no_radioLocation = jQuery('input[id$="LocationMoreThanOneBusinessLocation_rblYesNo_1"]');
    no_radioLocation.on( 'change', function( event ){ jQuery('#BussinessActivityUserControl').hide(); } );

    if( yes_radioLocation.attr('checked') )
    {
        yes_radioLocation.trigger('change');
    }
    else
    {
        no_radioLocation.trigger('change');
    }

    jQuery('.PredominentActivityMultiline').maxLength && jQuery('.PredominentActivityMultiline').maxLength(200);
};

function OnBicChanged()
{
    // VEROMO ->
    txtPredominantActivitySelection.trigger('change');
    // <- VEROMO

    var text = BICCodeControl.val();

    var BICCodeStr = '';
    var BusinessIndustryCodeDescription = '';
    var AnzsicCode = '';
    var AnzsicCodeDescription = '';
    var MainIndustryDescription = '';

    var isValidBic = false;

    if( text.length == 5 )
    {
        BICCodeStr = addLeadingZeros( text, 5 );

        var BicAsNumber = Number( BICCodeStr );

        for( var i = classificationCodes.length - 1; i >= 0; i-- )
        {
            if( classificationCodes[i] === BicAsNumber )
            {
                BusinessIndustryCodeDescription = classificationDescriptions[i];
                isValidBic = true;
                break;
            }
        }
    }

    if( isValidBic )
    {
        AnzsicCode = BICCodeStr.substring( 0, 4 );

        var anzsicCodeAsNumber = Number( AnzsicCode );

        for( var i = anzsicDescriptions.length - 1; i >= 0; i-- )
        {
            if( anzsicCodes[i] === anzsicCodeAsNumber )
            {
                AnzsicCodeDescription = anzsicDescriptions[i];
                break;
            }
        }

        var mainCode = BICCodeStr.substring( 0, 2 );
        var selectedIndex = -1;
        var selectedRange = 99;

        for( idx in MainIndustryCodes )
        {
            if( MainIndustryCodes[idx][2] <= mainCode && MainIndustryCodes[idx][3] >= mainCode )
            {
                if( selectedRange > MainIndustryCodes[idx][3] - MainIndustryCodes[idx][2] )
                {
                    selectedRange = MainIndustryCodes[idx][3] - MainIndustryCodes[idx][2];
                    selectedIndex = idx;
                }
            }
        }
        if( selectedIndex >= 0 )
        {
            MainIndustryDescription = MainIndustryCodes[selectedIndex][1];
        }
    }

    BICCodeHidden.val( BICCodeStr );

    ANZSICDescriptionHidden.val( AnzsicCodeDescription );
    ANZSICDescriptionControl.text( AnzsicCodeDescription );

    ANZSICCodeHidden.val( AnzsicCode );
    ANZSICCodeControl.text( AnzsicCode );

    BICDescriptionHidden.val( BusinessIndustryCodeDescription );
    BICDescriptionControl.text( BusinessIndustryCodeDescription );

    lblMainIndustryCode.text( MainIndustryDescription );

    isPageLoad = false;
}
