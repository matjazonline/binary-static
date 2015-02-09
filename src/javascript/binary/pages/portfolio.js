function currencyConvertorCalculator()
{
    var currencyto = document.getElementById('currencyto');
    if (currencyto.options.length > 0)
    {
        currencyto.options.length = 0;
    }

    var i=0;
    $('#currencyfrom').find('option').each(function(){
        if (this.selected !== true)
        {
            currencyto.options[i] = new Option(this.value, this.text);
            i++;
        }
    });

    return true;
}

function checkCurrencyAmountFormat(input_value)
{
    var amount = $(input_value).val();
    var amountEXP = '^\\d+(\\.)?(\\d)?(\\d)?$';
    var amountRex = new RegExp(amountEXP);
    var displayerror = $('#currencyconverterror');
    var currencysubmit = $('#currencysubmit');

    if (amount === '')
    {
        displayerror.addClass('invisible button-disabled');
        currencysubmit.attr('disabled', 'disabled').addClass('button-disabled').parents('.button').addClass('button-disabled');
        return 1;
    }

    if (!amountRex.test(amount) && displayerror)
    {
        displayerror.removeClass('invisible');
        currencysubmit.attr('disabled', 'disabled').addClass('button-disabled').parents('.button').addClass('button-disabled');
    }
    else
    {
        displayerror.addClass('invisible');
        currencysubmit.removeAttr('disabled').removeClass('button-disabled').parents('.button').removeClass('button-disabled');
    }

    return false;
}

function activate_copy_granters() {
    $('#portfolio-table').on('click', '.paste_all_granters', function () {
            $(this).prev('textarea.granter_loginids_input').val(document.getElementById('all_approved_granter_loginids').innerHTML);
            $(this).siblings('span.button').children('.open_contract_details').attr('granter_loginids', document.getElementById('all_approved_granter_loginids').innerHTML);
    });
    $('#portfolio-table').on('change', '.granter_loginids_input', function () {
            $(this).siblings('span.button').children('.open_contract_details').attr('granter_loginids', $(this).val());
    });
}

pjax_config_page('portfolio', function() {
    return {
        onLoad: function() {
            $('#portfolio-table .hourglass').hide();
            activate_copy_granters();
            $('#currencyfrom').change(function(event) { currencyConvertorCalculator(event.target); });
            $('#currencyfrom').keyup(function(event) { currencyConvertorCalculator(event.target); });
            $('#currencyfromvalue').change(function(event) { checkCurrencyAmountFormat(event.target); });
            $('#currencyfromvalue').keyup(function(event) { checkCurrencyAmountFormat(event.target); });
        }
    };
});
